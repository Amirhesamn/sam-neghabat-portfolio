import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor';
import { FilmOverlays, ScrollProgress } from './components/Overlays';
import { Preloader } from './components/Preloader';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Pipeline } from './components/Pipeline';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [booted, setBooted] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setBooted(true)} />
      <FilmOverlays />
      <ScrollProgress />
      <CustomCursor />
      <Nav />

      <main className={booted ? '' : 'pointer-events-none'}>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <TechStack />
        <Pipeline />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
