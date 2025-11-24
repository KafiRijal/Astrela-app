import React from "react";
import styles from "./HowItWorks.module.css";
import Illustration from "../../assets/ellipse.png";

const HowItWorks = () => {
  const features = [
    {
      number: "1",
      title: "Login & Explore Your Leads",
      description:
        "Sales representatives log into their dashboard and instantly view prioritized leads based on their score.",
    },
    {
      number: "2",
      title: "Contact & Record Outcomes",
      description:
        'Make calls, record lead status ("Subscribed", "Not Interested", "Call Back Later"), and add quick notes.',
    },
    {
      number: "3",
      title: "Schedule & Get Reminders",
      description:
        "Set follow-up dates with reminders via in-app notifications or email, ensuring no opportunity is missed.",
    },
    {
      number: "4",
      title: "Review Insights & Improve",
      description:
        "Admins track sales activities & performance through dashboards, uncovering trends that drive conversion growth.",
    },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.background}>
        <img src={Illustration} alt="" className={styles.ellipse} />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            How <span className={styles.highlight}>ASTRELA</span> works
          </h2>
          <p className={styles.subtitle}>
            Take your sales performance to the next level with intelligent,
            data-driven features.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.number} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.number}>{feature.number}</span>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
              </div>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.dots}>
          {[...Array(18)].map((_, i) => (
            <span key={i} className={styles.dot}></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
