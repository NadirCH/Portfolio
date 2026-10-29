import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Play, Pause } from "lucide-react";

export default function Showreel() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cursor, {
      left: x,
      top: y,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, { opacity: 1, scale: isPlaying ? 0.6 : 1, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.to(cursor, {
      left: "70%",
      top: "-10%",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    const video = videoRef.current;
    const cursor = cursorRef.current;
    if (!video) return;

    if (!isPlaying) {
      video.play().catch((err) => console.log("Video play interrupted", err));
      video.style.opacity = "1";
      setIsPlaying(true);
      if (cursor) {
        gsap.to(cursor, { scale: 0.6, duration: 0.25 });
      }
    } else {
      video.pause();
      video.style.opacity = "0";
      setIsPlaying(false);
      if (cursor) {
        gsap.to(cursor, { scale: 1, duration: 0.25 });
      }
    }
  };

  return (
    <section id="page2">
      <div
        id="video-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          backgroundImage: 'url("./assets/nadir/4.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "6px",
        }}
      >
        <div id="video-cursor" ref={cursorRef}>
          {isPlaying ? <Pause /> : <Play />}
        </div>

        {/* preload="none" saves 3.4 MB on initial page load! */}
        <video
          ref={videoRef}
          src="./assets/video.mp4"
          loop
          muted
          playsInline
          preload="none"
        />

        <div
          style={{
            position: "absolute",
            bottom: "2vw",
            left: "2vw",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(10px)",
            padding: "0.8vw 1.6vw",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "0.85vw",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#EC4067",
              display: "block",
            }}
          >
            Featured Showcase
          </span>
          <span style={{ fontSize: "1.1vw", fontWeight: 600 }}>
            Interactive Web &amp; Motion Prototype
          </span>
        </div>
      </div>
    </section>
  );
}
