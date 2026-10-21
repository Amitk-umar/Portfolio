import { useRef } from 'react';
import { gsap, withMotion, useGSAP } from '../utils/animations';
export default function MagneticButton({ as: Tag = 'a', className = 'btn', children, strength = 0.25, ...rest }) {
  const ref = useRef(null);
  useGSAP(() => withMotion((c) => {
    if (!c.desktop) return;
    const el = ref.current;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const clamp = gsap.utils.clamp(-12, 12);
    const move = (e) => { const r = el.getBoundingClientRect();
      xTo(clamp((e.clientX - r.left - r.width / 2) * strength)); yTo(clamp((e.clientY - r.top - r.height / 2) * strength)); };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); gsap.set(el, { x: 0, y: 0 }); };
  }), { scope: ref });
  return <Tag ref={ref} className={className} {...rest}>{children}</Tag>;
}
