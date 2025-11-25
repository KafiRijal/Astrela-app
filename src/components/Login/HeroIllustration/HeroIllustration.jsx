// src/components/Login/HeroIllustration/HeroIllustration.jsx
import styles from "./HeroIllustration.module.css";
import LoginIllustration from "../../../assets/login.png";

const HeroIllustration = ({ alt = "Login illustration" }) => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <img src={LoginIllustration} alt={alt} className={styles.image} />
    </div>
  );
};

export default HeroIllustration;
