// src/pages/Dashboard/Dashboard.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Header/Header";
import DashboardFooter from "../../components/Dashboard/Footer/DashboardFooter";
import Home from "../../components/Dashboard/Home/Home";
import Leads from "../../components/Dashboard/Leads/Leads";
import LeadDetail from "../../components/Dashboard/Leads/LeadDetail/LeadDetail";
import CreateLead from "../../components/Dashboard/Leads/CreateLead/CreateLead";
import EditLead from "../../components/Dashboard/Leads/EditLead/EditLead";
import Users from "../../components/Dashboard/Users/Users";
import CreateUser from "../../components/Dashboard/Users/CreateUser/CreateUser";
import EditUser from "../../components/Dashboard/Users/EditUser/EditUser";
import FollowUp from "../../components/Dashboard/FollowUp/FollowUp";
import Exports from "../../components/Dashboard/Exports/Exports";
import Profile from "../../components/Dashboard/Profile/Profile";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  // TODO: Get user role from auth context/state management
  // For now, we'll use a hardcoded value
  const userRole = "admin"; // Change to "sales" to see sales view

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <div className={styles.contentWrapper}>
        <Header userRole={userRole} />

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

              {/* Leads routes with dynamic role */}
              <Route path="/leads" element={<Leads userRole={userRole} />} />
              <Route path="/leads/create" element={<CreateLead />} />
              <Route path="/leads/edit/:id" element={<EditLead />} />
              <Route path="/leads/:id" element={<LeadDetail />} />

              {/* Users routes */}
              <Route path="/users" element={<Users />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />

              {/* Follow-Up route */}
              <Route path="/follow-up" element={<FollowUp />} />

              {/* Exports route */}
              <Route
                path="/exports"
                element={<Exports userRole={userRole} />}
              />

              {/* Profile route */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
