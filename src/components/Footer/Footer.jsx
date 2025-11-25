// src/components/Footer/Footer.jsx
import styles from "./Footer.module.css";
import Logo from "../../assets/logo-kotak.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section - Logo & Description */}
        <div className={styles.left}>
          <img src={Logo} alt="Astrela Logo" className={styles.logo} />
          <p className={styles.description}>
            Astrela helps banking sales teams work smarter with predictive lead
            scoring, automated follow-up management, and actionable insights —
            all in one powerful dashboard.
          </p>
        </div>

        {/* Right Section - Mission */}
        <div className={styles.right}>
          <h3 className={styles.missionTitle}>Mission</h3>
          <p className={styles.missionText}>
            Empowering smarter, data-driven sales decisions for the modern
            banking industry.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        © {currentYear} ASTRELA — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
