import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);
  
  // Ref elements for line reveals
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const line4 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set([line1.current, line2.current, line3.current, line4.current], { yPercent: 100 });
      
      const tl = gsap.timeline();

      // 2. Entrance Stagger for Text Lines
      tl.to([line1.current, line2.current, line3.current, line4.current], {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });

      // 3. Counter Animation (Smooth GSAP Easing)
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 3.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          setCount(Math.floor(counterObj.value));
        },
        onComplete: () => {
          // 4. Preloader Exit Timeline
          const exitTl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            }
          });

          // Text lines fly up and out
          exitTl.to([line1.current, line2.current, line3.current, line4.current], {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power4.in'
          });

          // Counter fades out
          exitTl.to(counterRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.in'
          }, '-=0.6');

          // Whole Preloader Screen slides UP and away
          exitTl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: 'power4.inOut'
          }, '-=0.2');
        }
      }, '-=0.8'); // start counting before lines finish entering
    });

    return () => ctx.revert();
  }, [onComplete]);

  // Format number to double digit: 0 -> 00, 5 -> 05, etc.
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div ref={containerRef} className="preloader-container">
      <div className="preloader-top">
        <div className="line-mask">
          <span className="line-content">ART & CODE AGENCY</span>
        </div>
        <div className="line-mask">
          <span className="line-content">EST. 2026</span>
        </div>
      </div>

      <div className="preloader-center">
        <div className="preloader-text-line">
          <div className="line-mask">
            <span ref={line1} className="line-content">We Design</span>
          </div>
        </div>
        <div className="preloader-text-line">
          <div className="line-mask">
            <span ref={line2} className="line-content">We Code</span>
          </div>
        </div>
        <div className="preloader-text-line">
          <div className="line-mask">
            <span ref={line3} className="line-content">We Animate</span>
          </div>
        </div>
        <div className="preloader-text-line">
          <div className="line-mask">
            <span ref={line4} className="line-content">Unique Experiences</span>
          </div>
        </div>
      </div>

      <div className="preloader-bottom">
        <div ref={counterRef} className="preloader-counter">
          {formatNumber(count)}
          <span>%</span>
        </div>
        <div className="line-mask" style={{ color: '#8c8c8e', fontSize: '14px' }}>
          <span className="line-content">LOADING EXPERIENCE</span>
        </div>
      </div>
    </div>
  );
}
