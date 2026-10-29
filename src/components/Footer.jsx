import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const footerTextRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);

  const textPhrase = "Let's Connect";

  useEffect(() => {
    const textElem = footerTextRef.current;
    if (!textElem) return;

    const h1Spans = textElem.querySelectorAll("h1 span");
    const h2Spans = textElem.querySelectorAll("h2 span");

    const onEnter = () => {
      gsap.to(h1Spans, {
        opacity: 0,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.inOut",
      });
      gsap.to(h2Spans, {
        opacity: 1,
        stagger: 0.04,
        delay: 0.15,
        duration: 0.25,
        ease: "power2.inOut",
      });
    };

    const onLeave = () => {
      gsap.to(h1Spans, {
        opacity: 1,
        stagger: 0.04,
        delay: 0.15,
        duration: 0.25,
        ease: "power2.inOut",
      });
      gsap.to(h2Spans, {
        opacity: 0,
        stagger: 0.04,
        duration: 0.25,
        ease: "power2.inOut",
      });
    };

    textElem.addEventListener("mouseenter", onEnter);
    textElem.addEventListener("mouseleave", onLeave);

    return () => {
      textElem.removeEventListener("mouseenter", onEnter);
      textElem.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <footer id="footer">
      <div id="footer-text" ref={footerTextRef}>
        <span className="chapter-marker">04</span>
        <h1 ref={h1Ref}>
          {textPhrase.split("").map((char, index) => (
            <span key={index}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>
        <h2 ref={h2Ref}>
          {textPhrase.split("").map((char, index) => (
            <span key={index}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h2>
      </div>

      <div className="underline"></div>

      <div id="footer-div">
        <div className="footer-box">
          <h6>Connect</h6>
          <a
            href="mailto:Chabaninadir98@gmail.com"
            data-magnetic
          >
            <h5>Email</h5>
          </a>
          <a
            href="https://twitter.com/nadir88273445"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <h5>Twitter / X</h5>
          </a>
          <a
            href="https://nadirch.github.io/Portfolio/NCH/"
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <h5>GitHub</h5>
          </a>
          <a
            href="tel:+213666812564"
            data-magnetic
          >
            <h5>Phone / WhatsApp</h5>
          </a>
        </div>

        <div className="footer-box">
          <h6>Location</h6>
          <h5>
            Oran, Algeria<br />
            Available for remote work<br />
            &amp; relocations worldwide
          </h5>
        </div>

        <div className="footer-box">
          <h6>Direct Contact</h6>
          <a href="mailto:Chabaninadir98@gmail.com" data-magnetic>
            <h5 style={{ color: "#EC4067" }}>Chabaninadir98@gmail.com</h5>
          </a>
          <a href="tel:+213666812564" data-magnetic>
            <h5>+213 666 812 564</h5>
          </a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <h5>Nadir Chabani &copy; {new Date().getFullYear()}</h5>
        <h5>UI / UX Designer &amp; Front End Developer</h5>
      </div>
    </footer>
  );
}
