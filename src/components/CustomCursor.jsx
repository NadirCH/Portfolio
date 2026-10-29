import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isNavHover, setIsNavHover] = useState(false);
  const [isMagneticSnap, setIsMagneticSnap] = useState(false);

  useEffect(() => {
    // Check if device supports pointer hover (exclude mobiles)
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Center coordinates initialization
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for ultra-smooth 60fps tracking
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Event delegation for dynamic cursor states
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // 1. Text hover state (e.g. data-cursor-text="PLAY")
      const textTrigger = target.closest('[data-cursor-text]');
      if (textTrigger) {
        const text = textTrigger.getAttribute('data-cursor-text');
        setCursorText(text);
        setIsActive(true);
        // Hide normal dot when ring expands with text
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }

      // 2. Navigation / standard links hover state
      const navTrigger = target.closest('a, button, [role="button"], .interactive-element');
      if (navTrigger && !textTrigger) {
        setIsNavHover(true);
        gsap.to(dot, { scale: 1.5, backgroundColor: '#EC4067', duration: 0.2 });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const textTrigger = target.closest('[data-cursor-text]');
      if (textTrigger) {
        setIsActive(false);
        setCursorText('');
        gsap.to(dot, { scale: 1, backgroundColor: '#EC4067', duration: 0.2 });
      }

      const navTrigger = target.closest('a, button, [role="button"], .interactive-element');
      if (navTrigger && !textTrigger) {
        setIsNavHover(false);
        gsap.to(dot, { scale: 1, backgroundColor: '#EC4067', duration: 0.2 });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // ==========================================
    // MAGNETIC EFFECT IMPLEMENTATION
    // ==========================================
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach((el) => {
      const handleMagneticMove = (e) => {
        const bound = el.getBoundingClientRect();
        // Calculate relative position of mouse inside the element
        const mouseX = e.clientX - bound.left - bound.width / 2;
        const mouseY = e.clientY - bound.top - bound.height / 2;

        // Pull the element toward the cursor
        gsap.to(el, {
          x: mouseX * 0.35,
          y: mouseY * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Snap custom cursor ring slightly toward the element
        setIsMagneticSnap(true);
      };

      const handleMagneticLeave = () => {
        // Return element back to center with elastic ease
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });
        setIsMagneticSnap(false);
      };

      el.addEventListener('mousemove', handleMagneticMove);
      el.addEventListener('mouseleave', handleMagneticLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on devices that do not support hovering (mobiles, tablets)
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isActive ? 'active' : ''} ${
          isNavHover ? 'hover-nav' : ''
        } ${isMagneticSnap ? 'magnetic-snap' : ''}`}
      >
        <span className="custom-cursor-text">{cursorText}</span>
      </div>
    </>
  );
}
