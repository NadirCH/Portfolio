import React, { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav id="nav">
        <div className="nav-left">
          {/* Interactive 9-Dot Menu Opener Button */}
          <button
            className="menu-opener-btn"
            data-magnetic
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <svg
              className="menu-opener__square"
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
            >
              <rect y="10" width="2" height="2" fill="currentColor"></rect>
              <rect y="5" width="2" height="2" fill="currentColor"></rect>
              <rect width="2" height="2" fill="currentColor"></rect>
              <rect x="5" y="10" width="2" height="2" fill="currentColor"></rect>
              <rect x="5" y="5" width="2" height="2" fill="currentColor"></rect>
              <rect x="5" width="2" height="2" fill="currentColor"></rect>
              <rect x="10" y="10" width="2" height="2" fill="currentColor"></rect>
              <rect x="10" y="5" width="2" height="2" fill="currentColor"></rect>
              <rect x="10" width="2" height="2" fill="currentColor"></rect>
            </svg>
          </button>

          {/* Brand Logo Link */}
          <a
            href="#page1"
            className="nav-brand-link"
            data-magnetic
            onClick={scrollTo("#page1")}
          >
            <span style={{ fontSize: "1.4vw", fontWeight: 700, letterSpacing: "0.08em" }}>
              NCH<span style={{ color: "var(--accent-orange)" }}>.</span>
            </span>
          </a>
        </div>

        <div id="nav-part2">
          <h4 data-magnetic>
            <a href="#page3" onClick={scrollTo("#page3")} style={{ textDecoration: "none", color: "inherit" }}>
              Projects
            </a>
          </h4>
          <h4 data-magnetic>
            <a href="#page4" onClick={scrollTo("#page4")} style={{ textDecoration: "none", color: "inherit" }}>
              Experience
            </a>
          </h4>
          <h4 data-magnetic>
            <a href="#page4" onClick={scrollTo("#page4")} style={{ textDecoration: "none", color: "inherit" }}>
              About
            </a>
          </h4>
          <h4 data-magnetic>
            <a href="#footer" onClick={scrollTo("#footer")} style={{ textDecoration: "none", color: "inherit" }}>
              Contact
            </a>
          </h4>
        </div>
      </nav>

      {/* Fullscreen Interactive Menu Drawer */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
