import styles from "./Hero.module.css";
import HeroImg from "../../../assets/hero.png";

const Hero = () => {
  const DOTS_COUNT = 30;

  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  const handleExploreFeatures = () => {
    const featuresSection = document.querySelector("#features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.container}>
        {/* Left Content */}
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
            right time — logging calls, scheduling follow-ups, and supporting
            data-driven lead scoring to prioritize opportunities.
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn} onClick={handleGetStarted}>
              Get Started - Sign In
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={handleExploreFeatures}
            >
              Explore Features
            </button>
          </div>

          <div className={styles.dotsPattern}>
            {Array.from({ length: DOTS_COUNT }).map((_, index) => (
              <span key={index} className={styles.dot}></span>
            ))}
          </div>
        </div>

        {/* Right Content */}
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
};

export default Hero;
