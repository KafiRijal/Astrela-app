import styles from "./About.module.css";
import AboutImg from "../../../assets/about.png";

const About = () => {
  const DOTS_COUNT = 20;

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        {/* Left Content - Image */}
        <div className={styles.left}>
          <div className={styles.imageBox}>
            <img
              src={AboutImg}
              alt="About Astrela - Empowering sales decisions"
              className={styles.image}
            />
          </div>
        </div>

        {/* Right Content - Text */}
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

        {/* Decorative Dots Pattern */}
        <div className={styles.dots} aria-hidden="true">
          {Array.from({ length: DOTS_COUNT }).map((_, index) => (
            <span key={index} className={styles.dot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
