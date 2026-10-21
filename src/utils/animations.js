import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, useGSAP);
export { gsap, ScrollTrigger, useGSAP };

export const MQ = { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px) and (hover: hover)' };

// Runs fn only when motion is allowed; reverts automatically when conditions change or on unmount.
export const withMotion = (fn) => {
  const mm = gsap.matchMedia();
  mm.add(MQ, (ctx) => { if (ctx.conditions.motion) return fn(ctx.conditions); });
  return () => mm.revert();
};
export const fadeUp = (targets, trigger, vars = {}) =>
  gsap.from(targets, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger, start: 'top 85%', toggleActions: 'play none none none' }, ...vars });
export const clipReveal = (el, trigger = el) =>
  gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger, start: 'top 85%' } });
export const parallax = (el, trigger, amount = 8) =>
  gsap.to(el, { yPercent: -amount, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } });
