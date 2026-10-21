import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { withMotion, useGSAP, fadeUp, clipReveal, parallax } from '../utils/animations';
import ProjectImage from './ProjectImage';

const Link = ({ href, children }) => href ? (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-sm">
    <span className="ulink">{children}</span><ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>) : null;

export default function ProjectCard({ p, flip }) {
  const ref = useRef(null);
  useGSAP(() => withMotion((c) => {
    clipReveal('.p-img', ref.current);
    fadeUp('.p-txt > *', '.p-txt');
    if (c.desktop) parallax('.p-inner', ref.current);
  }), { scope: ref });
  return (
    <article ref={ref} className="grid items-center gap-8 border-t border-line py-16 lg:grid-cols-12 lg:gap-16 lg:py-28">
      <div className={`p-img group overflow-hidden lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <div className="p-inner h-[112%] w-full transition-transform duration-700 group-hover:scale-[1.03]"><ProjectImage project={p} /></div>
        </div>
      </div>
      <div className={`p-txt lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <p className="label">{p.id} / {p.category} / {p.year}</p>
        <h3 className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[.95] tracking-tight">{p.name}</h3>
        <p className="mt-6 max-w-md text-mute">{p.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {p.tech.map((t) => <li key={t} className="border border-line px-3 py-1 text-xs text-paper/80">{t}</li>)}
        </ul>
        <div className="mt-8 flex gap-6"><Link href={p.demo}>Live Demo</Link><Link href={p.source}>Source Code</Link></div>
      </div>
    </article>
  );
}
