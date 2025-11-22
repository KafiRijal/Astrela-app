import React from "react";
import styles from "./HeroIllustration.module.css";
import LoginIllustration from "../../../assets/login.png";


export default function HeroIllustration({ alt = "Login illustration" }) {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <img src={LoginIllustration} alt={alt} className={styles.image} />
    </div>
  );
}