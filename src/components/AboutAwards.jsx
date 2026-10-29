import React from "react";

export default function AboutAwards() {
  return (
    <section id="page4">
      <div id="page4-content">
        <h1>
          <span className="chapter-marker">03</span>
          ABOUT &amp; EXPERIENCE
        </h1>
        <div className="underline"></div>

        <p>
          Multidisciplinary designer with a background in finance and 4+ years of
          experience in UI/UX and front-end development. Skilled in creating
          intuitive, emotionally resonant digital experiences using Figma, React,
          and modern web technologies.
        </p>

        <div id="page4-flex">
          <img
            src="./assets/nadir/8.jpg"
            alt="Nadir Chabani Workspace & Studio"
            loading="lazy"
            decoding="async"
            style={{ borderRadius: "4px" }}
          />
          <p>
            I hold a Master's degree in Corporate Finance from University of Oran
            2, following computer science studies at USTO University of Science
            and Technology in Oran. That foundation gives me a rare hybrid
            advantage: aligning business strategy and metrics with pixel-perfect
            frontend development.
            <br />
            <br />
            Available for selected freelance contracts and full-time product
            collaborations worldwide.
            <br />
            <br />
            Say hi directly:{" "}
            <a
              href="mailto:Chabaninadir98@gmail.com"
              style={{ color: "#EC4067", textDecoration: "underline" }}
            >
              Chabaninadir98@gmail.com
            </a>
          </p>
        </div>

        {/* The Signature Obys Blue Box */}
        <div id="page4-blue-div" data-magnetic>
          <div className="blue-div-elem">
            <h4>La Nation (2024 – Present)</h4>
            <p>WordPress Developer — Responsive Design, SEO &amp; Security</p>
          </div>
          <div className="blue-div-elem">
            <h4>Sonatrach (2023 – 2024)</h4>
            <p>Corporate Financial Analyst — KPIs &amp; Strategic Modeling</p>
          </div>
          <div className="blue-div-elem">
            <h4>DZConseil (2021 – 2022)</h4>
            <p>UI/UX Designer &amp; Frontend Dev — Intuitive Web Apps</p>
          </div>
          <div className="blue-div-elem">
            <h4>Master's in Finance</h4>
            <p>University of Oran 2, Algeria (Corporate Finance &amp; Accounting)</p>
          </div>
          <div className="blue-div-elem">
            <h4>Certified Credentials</h4>
            <p>Udacity Full Stack Developer &amp; Google Digital Marketing</p>
          </div>
        </div>

        <div className="underline"></div>
      </div>
    </section>
  );
}
