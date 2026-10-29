import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ isLoaded }) {
  const flagRef = useRef(null);
  const hero3Ref = useRef(null);
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const flag = flagRef.current;
    if (!flag) return;

    gsap.set(flag, { force3D: true });
    const xTo = gsap.quickTo(flag, "x", { duration: 0.25, ease: "power2.out" });
    const yTo = gsap.quickTo(flag, "y", { duration: 0.25, ease: "power2.out" });

    let scheduled = false;
    let mx = 0;
    let my = 0;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          xTo(mx);
          yTo(my);
          scheduled = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const hero3 = hero3Ref.current;
    if (hero3) {
      const onEnter = () => {
        gsap.to(flag, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(flag, { opacity: 0, scale: 0.85, duration: 0.25, ease: "power2.out" });
      };

      hero3.addEventListener("mouseenter", onEnter);
      hero3.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        hero3.removeEventListener("mouseenter", onEnter);
        hero3.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Snappy entrance reveal after loader finishes
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#hero1 h1, #hero2 h1, #hero3 h2, #hero4 h1",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        "#hero1 .chapter-marker",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        ".hero-bio-strip",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.35,
          clearProps: "transform",
        }
      );
    }, heroWrapperRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div id="page1-content" ref={heroWrapperRef}>
      {/* Floating interactive design preview card */}
      <img
        id="flag"
        ref={flagRef}
        src="./assets/nadir/1.gif"
        alt="Nadir Interactive Design"
        loading="lazy"
        decoding="async"
        style={{ borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.2)" }}
      />

      <div className="hero" id="hero1">
        <span className="chapter-marker">01</span>
        <h1>I Design</h1>
      </div>
      <div className="hero" id="hero2">
        <h1>Intuitive</h1>
      </div>
      <div className="hero" id="hero3" ref={hero3Ref}>
        <h2>Web/</h2>
        <h2>Digital</h2>
      </div>
      <div className="hero" id="hero4">
        <h1>Experiences</h1>
      </div>

      <div
        className="hero-bio-strip"
        style={{
          width: "72%",
          marginLeft: "28%",
          marginTop: "4vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "2vw",
          paddingRight: "5vw",
        }}
      >
        <p style={{ fontSize: "1.1vw", color: "rgba(255, 255, 255, 0.7)", maxWidth: "40vw", lineHeight: 1.5 }}>
          <strong style={{ color: "#fff" }}>Nadir Chabani</strong> — UI/UX Designer &amp; Front-End Developer with a background in corporate finance and 4+ years of digital product experience.
        </p>

        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.85vw", color: "#EC4067", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
            Location &amp; Availability
          </span>
          <span style={{ fontSize: "1vw", color: "#fff" }}>Oran, Algeria (Remote Worldwide)</span>
        </div>
      </div>
    </div>
  );
}
