import { useState } from 'react';
const stroke = { fill: 'none', stroke: '#C8FF45', strokeWidth: 1.5 };
const grid = { stroke: '#2B2B29' };
const arts = [
  () => <><g {...grid}>{[...Array(9)].map((_, i) => <line key={'v' + i} x1={i * 50} y1="0" x2={i * 50} y2="300" />)}{[...Array(7)].map((_, i) => <line key={'h' + i} x1="0" y1={i * 50} x2="400" y2={i * 50} />)}</g>
    <rect x="100" y="100" width="200" height="100" {...stroke} /><rect x="100" y="100" width="70" height="100" fill="#C8FF45" opacity=".9" /></>,
  () => <><g {...stroke} stroke="#F2F0E9" opacity=".5">{[40, 80, 120, 160, 200].map((r) => <circle key={r} cx="270" cy="150" r={r} />)}</g><circle cx="270" cy="150" r="22" fill="#C8FF45" /></>,
  () => <><g>{[...Array(14)].flatMap((_, i) => [...Array(10)].map((_, j) => ((i * 7 + j * 13 + i * j) % 3 === 0 ? <rect key={i + '-' + j} x={60 + i * 20} y={20 + j * 26} width="14" height="14" fill="#F2F0E9" opacity=".85" /> : null)))}</g>
    <path d="M44 20h30M44 20v30M356 20h-30M356 20v30M44 280h30M44 280v-30M356 280h-30M356 280v-30" {...stroke} /></>,
  () => <><g stroke="#2B2B29">{[...Array(16)].map((_, i) => <line key={i} x1={i * 30 - 100} y1="300" x2={i * 30 + 100} y2="0" />)}</g>
    <path d="M90 90h40M90 90v40M310 210h-40M310 210v-40" {...stroke} /><rect x="130" y="120" width="140" height="70" {...stroke} strokeDasharray="6 6" /><circle cx="200" cy="155" r="5" fill="#C8FF45" /></>,
];
export default function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);
  const Art = arts[project.variant % arts.length];
  return project.image && !failed
    ? <img src={project.image} alt={`${project.name} preview`} loading="lazy" width="800" height="600" onError={() => setFailed(true)} className="h-full w-full object-cover" />
    : <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${project.name} placeholder artwork`} className="h-full w-full bg-[#111110]"><Art /></svg>;
}
