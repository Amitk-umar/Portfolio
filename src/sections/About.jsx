import { useRef } from 'react';
import { withMotion, useGSAP, fadeUp, clipReveal, parallax } from '../utils/animations';
import { site } from '../data/siteConfig';
const details = [['Focus', 'Frontend and full-stack development'], ['Currently exploring', 'Creative development and animation'], ['Approach', 'Performance, usability, and visual clarity']];
export default function About() {
  const ref = useRef(null);
  useGSAP(() => withMotion((c) => {
    clipReveal('.a-photo', '.a-photo');
    fadeUp('.a-txt > *', '.a-txt');
    if (c.desktop) parallax('.a-inner', '.a-photo', 6);
  }), { scope: ref });
  return (
    <section id="about" ref={ref} className="pad mx-auto grid max-w-[1600px] gap-12 border-t border-line py-24 lg:grid-cols-12 lg:gap-20 lg:py-40" aria-labelledby="about-h">
      <div className="a-photo overflow-hidden lg:col-span-4">
        <div className="aspect-[4/5] overflow-hidden bg-[#111110]">
          <div className="a-inner grid h-[110%] w-full place-items-center">
            {site.photo ? <img src={site.photo} alt={`Portrait of ${site.name}`} loading="lazy" width="800" height="1000" className="h-full w-full object-cover" />
              : <span className="text-[8rem] font-bold text-line" aria-label="Profile photo placeholder">{site.monogram}</span>}
          </div>
        </div>
      </div>
      <div className="a-txt lg:col-span-7 lg:col-start-6">
        <p className="label">A LITTLE ABOUT ME</p>
        <h2 id="about-h" className="mt-4 text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[.98] tracking-tight">CODE WITH PURPOSE. DESIGN WITH INTENT.</h2>
        <p className="mt-8 max-w-xl text-lg text-mute">I'm a developer interested in building useful, intuitive, and visually distinctive digital products. I enjoy turning ideas into functional interfaces and exploring how thoughtful interactions can improve the user experience.</p>
        <dl className="mt-10 max-w-xl divide-y divide-line border-y border-line">
          {details.map(([k, v]) => <div key={k} className="grid gap-1 py-4 sm:grid-cols-3"><dt className="label">{k}</dt><dd className="sm:col-span-2">{v}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
