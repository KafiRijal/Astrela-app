import React from "react";
import styles from "./Features.module.css";
import { IoBarChart } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { IoMdThumbsUp } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";

export default function Features() {
  const items = [
    { id: 1, icon: <IoBarChart />, title: "AI-Based Lead Scoring" },
    { id: 2, icon: <FiPhoneCall />, title: "Call & Follow-Up Management" },
    { id: 3, icon: <BiFilterAlt />, title: "Lead Filtering & Sorting" },
    {
      id: 4,
      icon: <IoMdThumbsUp />,
      title: "Next Best Offer Recommendation",
    },
    {
      id: 5,
      icon: <BsGraphUpArrow />,
      title: "Performance Dashboard (Admin)",
    },
    { id: 6, icon: <GiPadlock />, title: "Secure Access for Teams" },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.header}>
        <h2 className={styles.headline}>
          What You Can Do with <span className={styles.brand}>ASTRELA?</span>
        </h2>
        <p className={styles.lead}>
          Take your sales performance to the next level with intelligent,
          data-driven features.
        </p>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {items.map((item) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.title}>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
