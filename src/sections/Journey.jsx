import { useRef } from 'react';
import { gsap, withMotion, useGSAP, fadeUp } from '../utils/animations';
import { journey } from '../data/journey';
export default function Journey() {
  const ref = useRef(null);
  useGSAP(() => withMotion(() => {
    gsap.fromTo('.j-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.j-list', start: 'top 70%', end: 'bottom 70%', scrub: true } });
    gsap.utils.toArray('.j-item').forEach((el) => fadeUp(el, el, { stagger: 0 }));
  }), { scope: ref });
  return (
    <section id="journey" ref={ref} className="pad mx-auto max-w-[1600px] border-t border-line py-24 lg:py-40" aria-labelledby="j-h">
      <h2 id="j-h" className="text-[clamp(2rem,6vw,5.5rem)] font-bold leading-[.95] tracking-tight">THE JOURNEY SO FAR</h2>
      <ol className="j-list relative mt-16 space-y-14 pl-8 lg:ml-[25%]">
        <span className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true" />
        <span className="j-line absolute bottom-0 left-0 top-0 w-px bg-acid" aria-hidden="true" />
        {journey.map((j) => (
          <li key={j.title} className="j-item relative">
            <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-acid" aria-hidden="true" />
            <p className="label">{j.period}{j.category ? ` / ${j.category}` : ''}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight md:text-4xl">{j.title}</h3>
            <p className="mt-3 max-w-lg text-mute">{j.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
