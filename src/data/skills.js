export const skillGroups = [
  { name: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'] },
  { name: 'Creative development', items: ['GSAP', 'ScrollTrigger', 'Responsive interaction design'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'Figma'] },
];
export const marquee = skillGroups.flatMap((g) => g.items);
