// src/pages/Dashboard/Dashboard.jsx
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Dashboard</h1>
          <p className={styles.subtitle}>
            This is your dashboard home page. Select a menu from the sidebar to
            get started.
          </p>

          {/* Temporary content to show the dashboard is working */}
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Total Leads</h3>
              <p className={styles.number}>150</p>
            </div>
            <div className={styles.card}>
              <h3>Active Sales</h3>
              <p className={styles.number}>45</p>
            </div>
            <div className={styles.card}>
              <h3>Follow-Ups</h3>
              <p className={styles.number}>28</p>
            </div>
            <div className={styles.card}>
              <h3>Conversions</h3>
              <p className={styles.number}>12</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
