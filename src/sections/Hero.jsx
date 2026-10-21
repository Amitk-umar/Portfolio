import { useRef } from 'react';
import { gsap, withMotion, useGSAP } from '../utils/animations';
import { site } from '../data/siteConfig';
import MagneticButton from '../components/MagneticButton';

export default function Hero() {
  const ref = useRef(null);
  useGSAP(() => withMotion(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(document.getElementById('nav'), { y: -24, opacity: 0, duration: 0.6 })
      .from('.h-eyebrow', { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
      .from('.h-line > span', { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.12 }, '-=0.4')
      .from('.h-fade', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')
      .from('.h-mark', { scale: 0.85, opacity: 0, duration: 1.1, ease: 'expo.out' }, '-=0.7')
      .from('.h-foot', { opacity: 0, y: 12, duration: 0.6 }, '-=0.5');
    gsap.to('.h-ring', { rotation: 360, duration: 30, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
  }), { scope: ref });
  return (
    <section id="top" ref={ref} className="pad relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-8 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs tracking-[.14em]">
        <p className="h-eyebrow text-mute">{site.role} / {site.location}</p>
        {site.available && <p className="h-eyebrow flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-acid" />OPEN TO OPPORTUNITIES</p>}
      </div>
      <div className="relative">
        <h1 className="text-[clamp(2.6rem,10.5vw,11rem)] font-bold leading-[.92] tracking-[-.04em]">
          {['I BUILD', 'DIGITAL', 'EXPERIENCES.'].map((t, i) => (
            <span key={t} className="h-line block overflow-hidden pb-[.06em]"><span className={`block ${i === 1 ? 'font-serif font-normal italic text-acid' : ''}`}>{t}</span></span>
          ))}
        </h1>
        <svg className="h-mark absolute -top-8 right-0 hidden h-40 w-40 md:block lg:h-56 lg:w-56" viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="circ" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" /></defs>
          <g className="h-ring"><text fill="#92928D" fontSize="13" letterSpacing="5"><textPath href="#circ">DESIGN • BUILD • ANIMATE • SHIP • </textPath></text></g>
          <circle cx="100" cy="100" r="5" fill="#C8FF45" />
        </svg>
      </div>
      <div className="grid items-end gap-8 md:grid-cols-2">
        <div>
          <p className="h-fade max-w-md text-lg text-mute">I build thoughtful digital experiences with clean code, considered design, and interactions that make the web feel alive.</p>
          <div className="h-fade mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#work" className="btn bg-acid text-ink !border-acid hover:!bg-paper hover:!border-paper">EXPLORE SELECTED WORK ↓</MagneticButton>
            <MagneticButton href="#contact">LET'S CONNECT ↗</MagneticButton>
          </div>
        </div>
        <div className="h-foot flex items-end justify-between text-xs tracking-[.14em] text-mute md:justify-end md:gap-16">
          <span>BASED IN {site.location}</span>
          <span className="flex items-center gap-3">SCROLL<span className="block h-10 w-px bg-mute" aria-hidden="true" /></span>
        </div>
      </div>
    </section>
  );
}
