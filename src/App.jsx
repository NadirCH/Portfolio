import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showreel from "./components/Showreel";
import Projects from "./components/Projects";
import AboutAwards from "./components/AboutAwards";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef(null);
  const page1Ref = useRef(null);

  // Initialize Lightweight, Snappy Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Single unified GSAP ticker binding to prevent duplicate frame rendering
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaded(true);

    // Snappy entrance reveal for Page 1
    if (page1Ref.current) {
      gsap.fromTo(
        page1Ref.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }

    gsap.fromTo(
      "#nav",
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
    );
  };

  return (
    <>
      {/* Signature Custom Mouse Follower */}
      <Cursor />

      {/* Lightweight, Snappy Counter Preloader */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Main Experience Container */}
      <div id="main" ref={mainRef}>
        <section id="page1" ref={page1Ref}>
          <Navbar />
          <Hero isLoaded={isLoaded} />
        </section>

        <Showreel />
        <Projects />
        <AboutAwards />
        <Marquee />
        <Footer />
      </div>
    </>
  );
}
