// src/components/About/About.jsx
import React from "react";
import styles from "./About.module.css";
import AboutImg from "../../assets/about.png";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imageBox}>
            <img src={AboutImg} alt="About Astrela" className={styles.image} />
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.kicker}>About Astrela</span>
          <h2 className={styles.title}>
            Empowering Smarter Sales <br /> Decisions
          </h2>
          <p className={styles.description}>
            Astrela is a predictive lead scoring platform built to help banking
            sales teams work more efficiently. By combining customer data, past
            interactions, and behavioral insights, Astrela automatically ranks
            leads based on conversion likelihood — helping sales teams spend
            time where it counts most. From monitoring lead performance to
            tracking call results and follow-ups, Astrela brings clarity and
            focus to the sales process.
          </p>
        </div>

        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={styles.dot} />
          ))}
        </div>
      </div>
    </section>
  );
}
