import styles from "./DashboardFooter.module.css";

const DashboardFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} ASTRELA — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
