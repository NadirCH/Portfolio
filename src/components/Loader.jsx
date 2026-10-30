import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const hasFinishedRef = useRef(false);

  const finishLoader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
          if (onComplete) onComplete();
        },
      });
    } else {
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Elegant, measured entrance for text lines
      tl.from(".loader-line h1", {
        y: 120,
        stagger: 0.14,
        duration: 0.65,
        ease: "power3.out",
        delay: 0.1,
      });

      // Smooth, beautifully eased counter to 100 (~2.2s)
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            setCounter(Math.floor(counterObj.value));
          },
        },
        "-=0.3"
      );

      // Smooth fade-out after count completes
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: finishLoader,
      });
    }, loaderRef);

    // Allow user to click anywhere or press Escape to skip immediately
    const handleSkip = () => finishLoader();
    window.addEventListener("keydown", handleSkip, { once: true });

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", handleSkip);
    };
  }, [finishLoader]);

  const formattedCount = counter < 10 ? `0${counter}` : counter;

  return (
    <div
      id="loader"
      ref={loaderRef}
      onClick={finishLoader}
      style={{ cursor: "pointer" }}
      title="Click anywhere to skip"
    >
      <div className="loader-line">
        <div id="line1-part1">
          <h5>{formattedCount}</h5>
          <h6>- 100</h6>
        </div>
        <h1>Nadir Chabani</h1>
      </div>
      <div className="loader-line">
        <h1>Digital Portfolio</h1>
      </div>
      <div className="loader-line">
        <h1>is loading right</h1>
        <h2>Now</h2>
      </div>

      <div
        style={{
          marginTop: "auto",
          fontSize: "0.8vw",
          color: "rgba(255, 255, 255, 0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        Click anywhere to skip intro →
      </div>
    </div>
  );
}
