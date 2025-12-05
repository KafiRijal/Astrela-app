// src/components/Dashboard/Header/Header.jsx
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FiBell,
  FiChevronRight,
  FiHome,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

const Header = ({ userRole = "sales" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/home")
      return "Dashboard Monitoring";
    if (path === "/dashboard/leads") {
      return userRole === "admin" ? "Leads Management" : "Lead List";
    }
    if (path === "/dashboard/leads/create") return "Create New Lead";
    if (path.match(/^\/dashboard\/leads\/edit\/\d+$/)) return "Edit Lead";
    if (path.match(/^\/dashboard\/leads\/\d+$/)) return "Lead Detail";
    if (path === "/dashboard/users") return "Users Management";
    if (path === "/dashboard/users/create") return "Create New User";
    if (path.match(/^\/dashboard\/users\/edit\/\d+$/)) return "Update User";
    if (path.includes("/follow-up")) return "Follow-Up Tasks";
    if (path.includes("/exports")) return "Data Exports";
    if (path.includes("/profile")) return "Profile Settings";
    return "Dashboard";
  };

  const getSubtitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/home") return "";
    if (path === "/dashboard/leads") {
      return userRole === "admin"
        ? "Manage leads, add new leads, and perform CRUD operations"
        : "Search, filter, sort, log calls and export leads";
    }
    if (path === "/dashboard/leads/create")
      return "Enter details to create a new lead";
    if (path.match(/^\/dashboard\/leads\/edit\/\d+$/))
      return "Update lead information";
    if (path.match(/^\/dashboard\/leads\/\d+$/))
      return "Detailed profile and call interactions";
    if (path === "/dashboard/users")
      return "Overview and management of all users";
    if (path === "/dashboard/users/create")
      return "Create new user account and assign role";
    if (path.match(/^\/dashboard\/users\/edit\/\d+$/))
      return "Update user information account and role";
    if (path.includes("/follow-up")) return "Manage your follow-up schedule";
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

      // Handle Create Lead breadcrumb
      if (path === "/dashboard/leads/create") {
        const leadsLabel =
          userRole === "admin" ? "Leads Management" : "Lead List";
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Create Leads", path: path });
      }
      // Handle Edit Lead breadcrumb
      else if (path.match(/^\/dashboard\/leads\/edit\/\d+$/)) {
        const leadsLabel =
          userRole === "admin" ? "Leads Management" : "Lead List";
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Edit Lead", path: path });
      }
      // Handle Lead Detail breadcrumb
      else if (path.match(/^\/dashboard\/leads\/\d+$/)) {
        const leadsLabel =
          userRole === "admin" ? "Leads Management" : "Lead List";
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Lead Detail", path: path });
      }
      // Handle Create User breadcrumb
      else if (path === "/dashboard/users/create") {
        breadcrumbs.push({
          label: "Users Management",
          path: "/dashboard/users",
        });
        breadcrumbs.push({ label: "Create User", path: path });
      }
      // Handle Edit User breadcrumb
      else if (path.match(/^\/dashboard\/users\/edit\/\d+$/)) {
        breadcrumbs.push({
          label: "Users Management",
          path: "/dashboard/users",
        });
        breadcrumbs.push({ label: "Edit User", path: path });
      }
      // Handle Profile breadcrumb
      else if (path.includes("/profile")) {
        breadcrumbs.push({ label: "Profile Settings", path: path });
      } else if (
        pageName !== "Dashboard" &&
        pageName !== "Dashboard Monitoring"
      ) {
        breadcrumbs.push({ label: pageName, path: path });
      }
    }

    return breadcrumbs;
  };

  const handleBreadcrumbClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // TODO: Add logout logic (clear auth token, etc.)
    navigate("/login");
    setIsDropdownOpen(false);
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
                <button
                  onClick={(e) => handleBreadcrumbClick(e, crumb.path)}
                  className={
                    index === getBreadcrumbs().length - 1
                      ? styles.breadcrumbActive
                      : styles.breadcrumbLink
                  }
                >
                  {crumb.label}
                </button>
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

          <div className={styles.userProfileWrapper} ref={dropdownRef}>
            <div className={styles.userProfile} onClick={toggleDropdown}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Marsela</span>
                <span className={styles.userRole}>Admin</span>
              </div>
              <div className={styles.userAvatar}>
                <span>M</span>
              </div>
              <FiChevronDown
                className={`${styles.dropdownIcon} ${
                  isDropdownOpen ? styles.dropdownIconOpen : ""
                }`}
              />
            </div>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem}
                  onClick={handleProfileClick}
                >
                  <FiUser className={styles.dropdownItemIcon} />
                  <span>Profile</span>
                </button>
                <div className={styles.dropdownDivider}></div>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <FiLogOut className={styles.dropdownItemIcon} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
