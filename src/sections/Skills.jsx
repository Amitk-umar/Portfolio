import { useRef } from 'react';
import { gsap, withMotion, useGSAP, fadeUp } from '../utils/animations';
import { skillGroups, marquee } from '../data/skills';
export default function Skills() {
  const ref = useRef(null); const tween = useRef(null);
  useGSAP(() => withMotion(() => {
    fadeUp('.s-row', '.s-rows');
    tween.current = gsap.to('.s-track', { xPercent: -50, ease: 'none', duration: 35, repeat: -1 });
    return () => { tween.current = null; };
  }), { scope: ref });
  const pause = () => tween.current?.pause(); const play = () => tween.current?.play();
  return (
    <section id="skills" ref={ref} className="border-t border-line py-24 lg:py-40" aria-labelledby="skills-h">
      <div className="pad mx-auto max-w-[1600px]">
        <h2 id="skills-h" className="text-[clamp(2rem,6vw,5.5rem)] font-bold leading-[.95] tracking-tight">TOOLS OF THE TRADE</h2>
        <div className="s-rows mt-14 divide-y divide-line border-y border-line">
          {skillGroups.map((g) => (
            <div key={g.name} className="s-row grid gap-3 py-8 lg:grid-cols-12">
              <h3 className="label lg:col-span-3 lg:pt-3">{g.name}</h3>
              <p className="text-[clamp(1.4rem,3vw,2.6rem)] font-medium leading-tight tracking-tight lg:col-span-9">{g.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 overflow-hidden border-y border-line py-6" onMouseEnter={pause} onMouseLeave={play} onFocus={pause} onBlur={play} onTouchStart={pause} onTouchEnd={play} aria-hidden="true">
        <div className="s-track flex w-max flex-nowrap">
          {[0, 1].map((n) => <ul key={n} className="flex shrink-0 items-center">
            {marquee.map((m) => <li key={m + n} className="flex items-center whitespace-nowrap text-[clamp(1.5rem,4vw,3.5rem)] font-bold tracking-tight">{m}<span className="mx-6 text-acid">•</span></li>)}
          </ul>)}
        </div>
      </div>
    </section>
  );
}
