import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { FiBell, FiChevronRight } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const [notifications] = useState(3);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard Monitoring";
    if (path.includes("/leads")) return "Lead List";
    if (path.includes("/lead-detail")) return "Lead Detail";
    if (path.includes("/sales")) return "Sales Management";
    if (path.includes("/follow-up")) return "Follow-Up Scheduler";
    if (path.includes("/call-logs")) return "Call Logs";
    if (path.includes("/exports")) return "Export Data";
    if (path.includes("/profile")) return "Profile Settings";
    return "Dashboard";
  };

  const getSubtitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "";
    if (path.includes("/leads"))
      return "Search, filter, sort, log calls and export leads";
    if (path.includes("/lead-detail"))
      return "Detailed profile and call interactions";
    if (path.includes("/sales"))
      return "Track and manage your sales activities";
    if (path.includes("/follow-up"))
      return "Manage scheduled follow-ups — date, contact, notes and status.";
    if (path.includes("/call-logs")) return "View and analyze call history";
    if (path.includes("/exports"))
      return "Export Leads & Call Logs — choose filters, preview and download";
    if (path.includes("/profile")) return "Manage your account settings";
    return "";
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ label: "Home", path: "/dashboard" }];

    if (path !== "/dashboard") {
      const pageName = getPageTitle();
      if (pageName !== "Dashboard") {
        breadcrumbs.push({ label: pageName, path: path });
      }
    }

    return breadcrumbs;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section - Title & Breadcrumb */}
        <div className={styles.left}>
          <h1 className={styles.title}>{getPageTitle()}</h1>
          {getSubtitle() && <p className={styles.subtitle}>{getSubtitle()}</p>}

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {getBreadcrumbs().map((crumb, index) => (
              <span key={crumb.path} className={styles.breadcrumbItem}>
                {index > 0 && (
                  <FiChevronRight className={styles.breadcrumbSeparator} />
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

        {/* Right Section - User Info */}
        <div className={styles.right}>
          {/* Notification Bell */}
          <button className={styles.notificationBtn} aria-label="Notifications">
            <FiBell />
            {notifications > 0 && (
              <span className={styles.notificationBadge}>{notifications}</span>
            )}
          </button>

          {/* User Profile */}
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
