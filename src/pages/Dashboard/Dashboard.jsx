import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Header/Header";
import DashboardFooter from "../../components/Dashboard/Footer/DashboardFooter";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <Header />

        <main className={styles.mainContent}>
          <div className={styles.container}>
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

        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
