import React from "react";
import fire from "../../videos/fire-double.mp4";
import './fire.scss'

export default function Fire() {
  return (
    <div className="Fire">
      <section>
        <video src={fire} autoPlay muted ></video>
        <h1>
          <span>T</span>
          <span>R</span>
          <span>E</span>
          <span>F</span>
          <span>F</span>
          <span>N</span>
          <span>&nbsp;</span>
          <span>A</span>
          <span>P</span>
          <span>P</span>
        </h1>
      </section>
    </div>
  );
}
