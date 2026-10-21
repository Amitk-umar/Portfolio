import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap, withMotion, useGSAP } from '../utils/animations';
import { site } from '../data/siteConfig';
import MagneticButton from './MagneticButton';

const links = [['Work', 'work'], ['About', 'about'], ['Skills', 'skills'], ['Contact', 'contact']];
const talk = site.email ? `mailto:${site.email}` : '#contact';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const btn = useRef(null); const menu = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); addEventListener('scroll', on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(([, id]) => { const s = document.getElementById(id); s && io.observe(s); });
    return () => { removeEventListener('scroll', on); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const key = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    addEventListener('keydown', key); document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [open]);

  useGSAP(() => {
    if (!open) return;
    return withMotion(() => { gsap.from('.m-item', { y: 60, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out' }); });
  }, { scope: menu, dependencies: [open] });

  const go = () => setOpen(false);
  return (
    <header id="nav" className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'border-line bg-ink/85 backdrop-blur-sm' : 'border-transparent'}`}>
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-acid focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
      <nav aria-label="Primary" className="pad mx-auto flex h-16 max-w-[1600px] items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight" aria-label="Back to top">{site.monogram}</a>
        <ul className="hidden items-center gap-10 text-sm md:flex">
          {links.map(([l, id]) => (
            <li key={id}><a href={`#${id}`} aria-current={active === id ? 'true' : undefined}
              className={`ulink py-2 ${active === id ? 'text-acid' : ''}`}>{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-5">
          {site.available && <span className="hidden items-center gap-2 text-xs text-mute lg:flex"><span className="h-2 w-2 rounded-full bg-acid" />Available</span>}
          <MagneticButton href={talk} className="ulink hidden py-2 text-xs tracking-[.12em] md:inline-block">LET'S TALK ↗</MagneticButton>
          <button ref={btn} className="grid h-12 w-12 place-items-center md:hidden" aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" ref={menu} data-lenis-prevent className="pad fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between bg-ink pb-10 pt-12 md:hidden">
          <ul className="space-y-2">
            {links.map(([l, id]) => (
              <li key={id} className="m-item"><a href={`#${id}`} onClick={go} className="block py-2 text-[clamp(2.5rem,12vw,4rem)] font-bold leading-none tracking-tight">{l}</a></li>
            ))}
          </ul>
          <a href={talk} onClick={go} className="m-item btn self-start">LET'S TALK ↗</a>
        </div>
      )}
    </header>
  );
}
