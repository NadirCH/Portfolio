import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const follower = followerRef.current;
    if (!follower) return;

    gsap.set(follower, { xPercent: -50, yPercent: -50, force3D: true });

    // Ultra-fast responsive quickTo
    const xTo = gsap.quickTo(follower, "x", { duration: 0.14, ease: "power2.out" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.14, ease: "power2.out" });

    let isScheduled = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isScheduled) {
        isScheduled = true;
        requestAnimationFrame(() => {
          xTo(mouseX);
          yTo(mouseY);
          isScheduled = false;
        });
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest("#video-container")) {
        setIsHidden(true);
        return;
      } else {
        setIsHidden(false);
      }

      if (
        target.closest("a, button, [role='button'], .project-card, .page3-circle, #footer-text, .hero h2")
      ) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      if (
        target.closest("a, button, [role='button'], .project-card, .page3-circle, #footer-text, .hero h2")
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });

    // Magnetic effect implementation
    const magnetics = document.querySelectorAll("[data-magnetic]");
    const handlers = [];

    magnetics.forEach((el) => {
      const onMagneticMove = (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(el, {
          x: relX * 0.3,
          y: relY * 0.3,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const onMagneticLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };

      el.addEventListener("mousemove", onMagneticMove, { passive: true });
      el.addEventListener("mouseleave", onMagneticLeave, { passive: true });
      handlers.push({ el, onMagneticMove, onMagneticLeave });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      handlers.forEach(({ el, onMagneticMove, onMagneticLeave }) => {
        el.removeEventListener("mousemove", onMagneticMove);
        el.removeEventListener("mouseleave", onMagneticLeave);
      });
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`mousefollower ${isHovered ? "hovered" : ""} ${isHidden ? "hidden" : ""}`}
    />
  );
}
