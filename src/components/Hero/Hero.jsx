import React from "react";
import styles from "./Hero.module.css";
import HeroImg from "../../assets/hero.png";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.welcome}>Welcome to Astrela!</p>

          <h1 className={styles.title}>
            Optimize your banking sales with{" "}
            <span className={styles.highlight}>
              smarter lead prioritization
            </span>
          </h1>

          <p className={styles.description}>
            Astrela helps your sales team contact the right prospects at the
            right time — logging calls, scheduling follow-ups, and surfacing
            next-best-offer product recommendations based on data-driven lead
            scoring.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Get Started - Sign In</button>
            <button className={styles.secondaryBtn}>Explore Features</button>
          </div>

          <div className={styles.dotsPattern}>
            {Array.from({ length: 33 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <img
              src={HeroImg}
              alt="Banking sales optimization graph illustration"
              className={styles.heroImg}
            />

            <div className={styles.floatingCard}>
              <div>
                <span className={styles.cardTitle}>
                  Designed for{" "}
                  <span className={styles.cardBanking}>Banking</span>
                </span>
                <span className={styles.cardSub}>Sales Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
