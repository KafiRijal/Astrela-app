import React from "react";
import styles from "./Hero.module.css";
import HeroImg from "../../assets/hero.png";
import { useLanguage } from "../../contexts/useLanguage";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.welcome}>{t.heroWelcome}</p>
          <h1 className={styles.title}>
            {t.heroTitlePart1}{" "}
            <span className={styles.highlight}>{t.heroTitlePart2}</span>
          </h1>
          <p className={styles.description}>{t.heroDescription}</p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>{t.heroBtnPrimary}</button>
            <button className={styles.secondaryBtn}>
              {t.heroBtnSecondary}
            </button>
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
              alt={t.heroImageAlt}
              className={styles.heroImg}
            />
            <div className={styles.floatingCard}>
              <div>
                <span className={styles.cardTitle}>
                  {t.heroBadgeText1}{" "}
                  <span className={styles.cardBanking}>
                    {t.heroBadgeBanking}
                  </span>
                </span>
                <span className={styles.cardSub}>
                  {t.heroBadgeProfessionals}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
