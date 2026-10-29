import React from "react";

export default function Projects() {
  const arrowSvg = (
    <svg className="button__arrow" viewBox="0 0 91 118" fill="none">
      <path
        d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z"
        fill="currentColor"
      ></path>
    </svg>
  );

  return (
    <section id="page3">
      <div id="page3-header">
        <h1>
          <span className="chapter-marker">02</span>
          SELECTED WORKS
        </h1>
        <div className="underline"></div>
      </div>

      <div id="image-div-container">
        {/* Project 1: CAFE WEB PLATFORM */}
        <a
          href="https://nadirch.github.io/Cafe/Cafe/index.html"
          target="_blank"
          rel="noreferrer"
          className="project-card size-small"
          style={{ textDecoration: "none" }}
        >
          <div className="imaget">
            <h2 className="first">CAFE PLATFORM</h2>
            <h2 className="second">CAFE PLATFORM</h2>
          </div>
          <div className="iimage">
            <img
              className="img-main"
              src="./assets/nadir/3.png"
              alt="Cafe Platform"
              loading="lazy"
              decoding="async"
            />
            <img
              className="img-hover"
              src="./assets/nadir/1.gif"
              alt="Cafe Hover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lowertext">
            <h4>Brand Identity, Interactive UI<br />Frontend Development</h4>
            <h3>2024</h3>
          </div>
        </a>

        {/* Project 2: TV & STREAMING APP - Optimized lightweight preview */}
        <a
          href="https://nadirch.github.io/TV/"
          target="_blank"
          rel="noreferrer"
          className="project-card size-large"
          style={{ textDecoration: "none" }}
        >
          <div className="imaget">
            <h2 className="first">STREAM TV APP</h2>
            <h2 className="second">STREAM TV APP</h2>
          </div>
          <div className="iimage">
            <img
              className="img-main"
              src="./assets/nadir/4.png"
              alt="TV Media App"
              loading="lazy"
              decoding="async"
            />
            <img
              className="img-hover"
              src="./assets/nadir/5.png"
              alt="TV App Hover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lowertext">
            <h4>ReactJS, Streaming Interface<br />Responsive Web Application</h4>
            <h3>2024</h3>
          </div>
        </a>

        {/* Interactive Circle 1 */}
        <div className="page3-circle" data-magnetic>
          {arrowSvg}
          <div className="circle-in">
            <p>4+ years bridging corporate finance precision with UI/UX development.</p>
          </div>
        </div>

        {/* Project 3: DZCONSEIL PLATFORM */}
        <div className="project-card size-small">
          <div className="imaget">
            <h2 className="first">DZCONSEIL</h2>
            <h2 className="second">DZCONSEIL</h2>
          </div>
          <div className="iimage">
            <img
              className="img-main"
              src="./assets/nadir/2.png"
              alt="DZConseil"
              loading="lazy"
              decoding="async"
            />
            <img
              className="img-hover"
              src="./assets/nadir/5.png"
              alt="DZConseil Hover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lowertext">
            <h4>Enterprise UI/UX, Component System<br />Responsive Engineering</h4>
            <h3>2022</h3>
          </div>
        </div>

        {/* Project 4: LA NATION WORDPRESS */}
        <div className="project-card size-large">
          <div className="imaget">
            <h2 className="first">LA NATION</h2>
            <h2 className="second">LA NATION</h2>
          </div>
          <div className="iimage">
            <img
              className="img-main"
              src="./assets/nadir/8.jpg"
              alt="La Nation"
              loading="lazy"
              decoding="async"
            />
            <img
              className="img-hover"
              src="./assets/nadir/3.png"
              alt="La Nation Hover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lowertext">
            <h4>WordPress Engineering, Core Vitals<br />SEO &amp; Performance Optimization</h4>
            <h3>Present</h3>
          </div>
        </div>

        {/* Interactive Circle 2 */}
        <div className="page3-circle circle-rotated" data-magnetic>
          {arrowSvg}
          <div className="circle-in">
            <p>Ready to build intuitive, high-performance web experiences? Let's connect.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
