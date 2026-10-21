import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './utils/animations';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import SelectedWork from './sections/SelectedWork';
import About from './sections/About';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Contact from './sections/Contact';

export default function App() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    addEventListener('load', refresh);
    return () => { removeEventListener('load', refresh); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main><Hero /><SelectedWork /><About /><Skills /><Journey /><Contact /></main>
      <Footer />
    </>
  );
}
