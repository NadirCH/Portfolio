import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Play, X } from 'lucide-react';

export default function VideoShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const fullVideoRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Play full-screen video
    if (fullVideoRef.current) {
      fullVideoRef.current.currentTime = 0;
      fullVideoRef.current.play().catch(err => console.log("Video play request was interrupted", err));
    }

    // GSAP reveal animation for modal
    gsap.fromTo(overlayRef.current,
      { opacity: 0, visibility: 'hidden' },
      { opacity: 1, visibility: 'visible', duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(fullVideoRef.current,
      { scale: 0.8 },
      { scale: 1, duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
  };

  const handleClose = (e) => {
    e.stopPropagation();
    // Pause full-screen video
    if (fullVideoRef.current) {
      fullVideoRef.current.pause();
    }

    // GSAP exit animation for modal
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsOpen(false);
        gsap.set(overlayRef.current, { visibility: 'hidden' });
      }
    });
  };

  return (
    <section className="showcase-wrapper">
      <div className="container">
        <div className="showcase-header">
          <p className="showcase-subtitle">Featured Experience</p>
          <h2 className="showcase-title">Interactive Motion Showcase</h2>
        </div>

        {/* Clicking this card expands the showcase to fullscreen */}
        <div 
          className="video-container-card"
          data-cursor-text="PLAY"
          onClick={handleOpen}
        >
          <video 
            ref={videoRef}
            className="showcase-video"
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0542d87e1f210abd44be2923bb13062&profile_id=139&oauth2_token_id=57447761"
            loop 
            muted 
            autoPlay 
            playsInline
          />
          
          <div className="video-overlay-tint" />
          
          <div className="video-bottom-caption">
            <div className="caption-left">
              <h3>Liquid Metal Art</h3>
              <p>Explore high fidelity WebGL simulation</p>
            </div>
            
            <div className="play-hint-btn" data-magnetic>
              <Play size={20} fill="#fff" />
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN VIDEO PORTAL OVERLAY */}
      <div 
        ref={overlayRef}
        className="fullscreen-video-overlay"
        onClick={handleClose}
      >
        <button 
          className="close-video-btn" 
          onClick={handleClose}
          data-magnetic
        >
          <X size={24} />
        </button>

        <video
          ref={fullVideoRef}
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0542d87e1f210abd44be2923bb13062&profile_id=139&oauth2_token_id=57447761"
          loop
          controls={false}
          playsInline
          onClick={(e) => e.stopPropagation()} // prevent modal closing on video tap
        />
      </div>
    </section>
  );
}
