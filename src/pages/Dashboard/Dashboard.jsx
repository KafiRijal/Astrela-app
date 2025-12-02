// src/pages/Dashboard/Dashboard.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Header/Header";
import DashboardFooter from "../../components/Dashboard/Footer/DashboardFooter";
import Home from "../../components/Dashboard/Home/Home";
import Leads from "../../components/Dashboard/Leads/Leads";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // TODO: Get user role from auth context/state management
  // For now, we'll use a hardcoded value
  const userRole = "sales"; // Change to "admin" to see admin view

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <Header />

        <main className={styles.mainContent}>
          <div className={styles.container}>
            <Routes>
              {/* Default route redirects to home */}
              <Route
                path="/"
                element={<Navigate to="/dashboard/home" replace />}
              />

              {/* Home route with dynamic role */}
              <Route path="/home" element={<Home userRole={userRole} />} />

              {/* Leads route */}
              <Route path="/leads" element={<Leads />} />

              {/* Placeholder routes for other pages */}
              <Route
                path="/sales"
                element={<div>Sales Page - Coming Soon</div>}
              />
              <Route
                path="/follow-up"
                element={<div>Follow-Up Page - Coming Soon</div>}
              />
              <Route
                path="/call-logs"
                element={<div>Call Logs Page - Coming Soon</div>}
              />
              <Route
                path="/exports"
                element={<div>Exports Page - Coming Soon</div>}
              />
              <Route
                path="/profile"
                element={<div>Profile Page - Coming Soon</div>}
              />
            </Routes>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
