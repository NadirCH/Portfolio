import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const linksRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isFirstRender = useRef(true);

  // GSAP Entrance & Exit Animations
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Do nothing on initial mount when closed
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!isOpen) {
        gsap.set(overlay, { y: "-100%", autoAlpha: 0 });
        return;
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      const tl = gsap.timeline();

      // Animate curtain down into view
      tl.fromTo(
        overlay,
        { y: "-100%", autoAlpha: 1 },
        {
          y: "0%",
          autoAlpha: 1,
          duration: 0.55,
          ease: "power4.out",
        }
      );

      // Stagger link reveals
      const linkElements = linksRef.current?.querySelectorAll(".menu-nav-anchor");
      if (linkElements) {
        tl.fromTo(
          linkElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.25"
        );
      }
    } else {
      document.body.style.overflow = "";

      // Animate curtain up and completely hide with autoAlpha
      gsap.to(overlay, {
        y: "-100%",
        autoAlpha: 0,
        duration: 0.45,
        ease: "power3.inOut",
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (selector) => (e) => {
    e.preventDefault();
    onClose();

    setTimeout(() => {
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  const navLinks = [
    { num: "01", label: "Home", href: "#page1" },
    { num: "02", label: "Selected Works", href: "#page3" },
    { num: "03", label: "Experience & Awards", href: "#page4" },
    { num: "04", label: "About Profile", href: "#page4" },
    { num: "05", label: "Get In Touch", href: "#footer" },
  ];

  return (
    <div
      ref={overlayRef}
      className={`menu-overlay-backdrop ${isOpen ? "is-open" : ""}`}
      data-lenis-prevent
      style={{
        visibility: "hidden",
        opacity: 0,
        transform: "translateY(-100%)",
      }}
    >
      {/* Top Header Row */}
      <div className="menu-top-row">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="menu-brand-title">
            NCH<span style={{ color: "var(--accent-orange)" }}>.</span>
          </span>
          <span className="menu-brand-sub">Navigation</span>
        </div>

        <button
          className="menu-close-btn"
          data-magnetic
          onClick={onClose}
          aria-label="Close Navigation"
        >
          <span>Close</span>
          <X size={16} />
        </button>
      </div>

      {/* Main Content: Left-aligned, scrollable navigation list */}
      <div
        className="menu-body-grid"
        ref={scrollContainerRef}
        data-lenis-prevent
      >
        <div className="menu-nav-links" ref={linksRef}>
          {navLinks.map((item, idx) => (
            <div key={idx} className="menu-link-wrapper">
              <a
                href={item.href}
                className="menu-nav-anchor"
                data-magnetic
                onClick={handleLinkClick(item.href)}
              >
                <span className="menu-link-num">{item.num}</span>
                <span className="menu-link-title">{item.label}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="menu-bottom-row">
        <span>Nadir Chabani &copy; {new Date().getFullYear()}</span>
        <span>UI / UX Designer &amp; Front-End Developer</span>
      </div>
    </div>
  );
}
