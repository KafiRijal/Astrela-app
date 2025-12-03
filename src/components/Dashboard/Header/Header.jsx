// src/components/Dashboard/Header/Header.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { FiBell, FiChevronRight, FiHome } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [notifications] = useState(3);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/home")
      return "Dashboard Monitoring";
    if (path === "/dashboard/leads") return "Lead List";
    if (path.match(/^\/dashboard\/leads\/\d+$/)) return "Lead Detail";
    if (path.includes("/sales")) return "Sales Management";
    if (path.includes("/follow-up")) return "Follow-Up Tasks";
    if (path.includes("/call-logs")) return "Call Logs";
    if (path.includes("/exports")) return "Data Exports";
    if (path.includes("/profile")) return "Profile Settings";
    return "Dashboard";
  };

  const getSubtitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/home") return "";
    if (path === "/dashboard/leads")
      return "Search, filter, sort, log calls and export leads";
    if (path.match(/^\/dashboard\/leads\/\d+$/))
      return "Detailed profile and call interactions";
    if (path.includes("/sales"))
      return "Track and manage your sales activities";
    if (path.includes("/follow-up")) return "Manage your follow-up schedule";
    if (path.includes("/call-logs")) return "View and analyze call history";
    if (path.includes("/exports")) return "Export your data in various formats";
    if (path.includes("/profile")) return "Manage your account settings";
    return "";
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: "Home", path: "/dashboard/home", icon: <FiHome /> },
    ];

    if (path !== "/dashboard" && path !== "/dashboard/home") {
      const pageName = getPageTitle();

      // Handle Lead Detail breadcrumb
      if (path.match(/^\/dashboard\/leads\/\d+$/)) {
        breadcrumbs.push({ label: "Leads", path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Lead Detail", path: path });
      } else if (
        pageName !== "Dashboard" &&
        pageName !== "Dashboard Monitoring"
      ) {
        breadcrumbs.push({ label: pageName, path: path });
      }
    }

    return breadcrumbs;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>{getPageTitle()}</h1>
          {getSubtitle() && <p className={styles.subtitle}>{getSubtitle()}</p>}

          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {getBreadcrumbs().map((crumb, index) => (
              <span key={crumb.path} className={styles.breadcrumbItem}>
                {index > 0 && (
                  <FiChevronRight className={styles.breadcrumbSeparator} />
                )}
                {index === 0 && crumb.icon && (
                  <span className={styles.breadcrumbIcon}>{crumb.icon}</span>
                )}
                <a
                  href={crumb.path}
                  className={
                    index === getBreadcrumbs().length - 1
                      ? styles.breadcrumbActive
                      : styles.breadcrumbLink
                  }
                >
                  {crumb.label}
                </a>
              </span>
            ))}
          </nav>
        </div>

        <div className={styles.right}>
          <button className={styles.notificationBtn} aria-label="Notifications">
            <FiBell />
            {notifications > 0 && (
              <span className={styles.notificationBadge}>{notifications}</span>
            )}
          </button>

          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Marsela</span>
              <span className={styles.userRole}>Admin</span>
            </div>
            <div className={styles.userAvatar}>
              <span>M</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
