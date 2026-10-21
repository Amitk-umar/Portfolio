import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { withMotion, useGSAP, fadeUp, gsap } from '../utils/animations';
import { site } from '../data/siteConfig';
import MagneticButton from '../components/MagneticButton';

export default function Contact() {
  const ref = useRef(null); const [copied, setCopied] = useState(false);
  useGSAP(() => withMotion(() => {
    gsap.from('.c-line > span', { yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 70%' } });
    fadeUp('.c-fade', '.c-fade');
  }), { scope: ref });
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { window.prompt('Copy this email:', site.email); }
  };
  const social = [['Email', site.email && `mailto:${site.email}`], ['LinkedIn', site.links.linkedin], ['GitHub', site.links.github]].filter(([, h]) => h);
  const cta = site.email ? `mailto:${site.email}` : site.links.linkedin;
  return (
    <section id="contact" ref={ref} className="pad mx-auto max-w-[1600px] border-t border-line py-24 lg:py-40" aria-labelledby="contact-h">
      <h2 id="contact-h" className="text-[clamp(2.4rem,9vw,9rem)] font-bold leading-[.92] tracking-[-.04em]">
        <span className="c-line block overflow-hidden pb-[.06em]"><span className="block">HAVE A GOOD IDEA?</span></span>
        <span className="c-line block overflow-hidden pb-[.06em]"><span className="block font-serif font-normal italic text-acid">LET'S BUILD IT.</span></span>
      </h2>
      <div className="c-fade mt-12 grid gap-10 md:grid-cols-2">
        <p className="max-w-md text-lg text-mute">Interested in working together, discussing a project, or exchanging ideas? I'd love to hear from you.</p>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {cta && <MagneticButton href={cta} className="btn bg-acid text-ink !border-acid hover:!bg-paper hover:!border-paper">GET IN TOUCH ↗</MagneticButton>}
            {site.email && <button onClick={copy} className="btn">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'COPIED' : 'COPY EMAIL'}</button>}
            <span role="status" aria-live="polite" className="sr-only">{copied ? 'Email copied to clipboard' : ''}</span>
          </div>
          {!site.email && <p className="mt-4 text-xs text-mute">Email not configured yet. Add it in src/data/siteConfig.js.</p>}
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {social.map(([l, h]) => <li key={l}><a href={h} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="ulink flex min-h-12 items-center justify-between py-4 text-xl"><span>{l}</span><span aria-hidden="true">↗</span></a></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
