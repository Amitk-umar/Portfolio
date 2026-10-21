import { useRef } from 'react';
import { gsap, withMotion, useGSAP } from '../utils/animations';
export default function CustomCursor() {
  const dot = useRef(null);
  useGSAP(() => withMotion((c) => {
    if (!c.desktop || !matchMedia('(pointer: fine)').matches) return;
    const el = dot.current;
    document.documentElement.classList.add('has-cursor');
    gsap.set(el, { opacity: 1, xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' });
    const move = (e) => { x(e.clientX); y(e.clientY); };
    const over = (e) => gsap.to(el, { scale: e.target.closest('a,button') ? 3 : 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    addEventListener('pointermove', move); addEventListener('pointerover', over);
    return () => { removeEventListener('pointermove', move); removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor'); gsap.set(el, { opacity: 0 }); };
  }), { scope: dot });
  return <div ref={dot} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full bg-acid opacity-0 mix-blend-difference" />;
}
