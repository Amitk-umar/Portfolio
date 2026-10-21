import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
export default function SelectedWork() {
  return (
    <section id="work" className="pad mx-auto max-w-[1600px] py-24 lg:py-40" aria-labelledby="work-h">
      <h2 id="work-h" className="text-[clamp(2rem,6vw,5.5rem)] font-bold leading-[.95] tracking-tight">SELECTED WORK / 2024—2026</h2>
      <p className="mt-6 max-w-md text-mute">A selection of things I've designed, developed, and brought to life.</p>
      <div className="mt-16">{projects.map((p, i) => <ProjectCard key={p.id} p={p} flip={i % 2 === 1} />)}</div>
    </section>
  );
}
