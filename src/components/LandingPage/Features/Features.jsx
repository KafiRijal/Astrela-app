import styles from "./Features.module.css";
import { IoBarChart } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { MdGroups } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiPadlock } from "react-icons/gi";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <IoBarChart />,
      title: "AI-Based Lead Scoring",
    },
    {
      id: 2,
      icon: <FiPhoneCall />,
      title: "Call & Follow-Up Management",
    },
    {
      id: 3,
      icon: <BiFilterAlt />,
      title: "Lead Filtering & Sorting",
    },
    {
      id: 4,
      icon: <MdGroups />,
      title: "Leads Segmentation",
    },
    {
      id: 5,
      icon: <BsGraphUpArrow />,
      title: "Performance Dashboard (Admin)",
    },
    {
      id: 6,
      icon: <GiPadlock />,
      title: "Secure Access for Teams",
    },
  ];

  return (
    <section className={styles.features} id="features">
      {/* Header Section */}
      <div className={styles.header}>
        <h2 className={styles.headline}>
          What You Can Do with <span className={styles.brand}>ASTRELA?</span>
        </h2>
        <p className={styles.lead}>
          Take your sales performance to the next level with intelligent,
          data-driven features.
        </p>
      </div>

      {/* Features Grid */}
      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div className={styles.card} key={feature.id}>
              <div className={styles.icon}>{feature.icon}</div>
              <div className={styles.title}>{feature.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
