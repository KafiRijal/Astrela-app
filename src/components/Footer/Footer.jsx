import React from "react";
import styles from "./Footer.module.css";
import Logo from "../../assets/logo-kotak.png";


export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Footer">
      <div className={styles.inner}>
        {/* Left column: logo + description */}
        <div className={styles.colLeft}>
          <div className={styles.brand}>
            <img src={Logo} alt="Astrela logo" className={styles.logo} />
          </div>
          <p className={styles.description}>
            Astrela helps banking sales teams work smarter with predictive lead
            scoring, automated follow-up management, and actionable insights —
            all in one powerful dashboard.
          </p>
        </div>

        {/* Center column: copyright */}
        <div className={styles.colCenter}>
          <div className={styles.copy}>
            © 2025 ASTRELA — All rights reserved.
          </div>
        </div>

        {/* Right column: Mission */}
        <div className={styles.colRight}>
          <h3 className={styles.missionTitle}>Mission</h3>
          <p className={styles.missionText}>
            Empowering smarter, data-driven sales decisions for the modern
            banking industry.
          </p>
        </div>
      </div>
    </footer>
  );
}
