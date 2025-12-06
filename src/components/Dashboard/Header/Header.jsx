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
import NotificationModal from "./NotificationModal/NotificationModal";

const Header = ({ userRole = "sales" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Follow-up reminder — Sahrul Firdaus",
      message: "followup — 20/11/2025, 10.00.00",
      isRead: false,
    },
    {
      id: 2,
      title: "Follow-up reminder — Sahrul Firdaus",
      message: "followup — 20/11/2025, 10.00.00",
      isRead: false,
    },
    {
      id: 3,
      title: "Follow-up reminder — Sahrul Firdaus",
      message: "followup — 20/11/2025, 10.00.00",
      isRead: false,
    },
    {
      id: 4,
      title: "Follow-up reminder — Sahrul Firdaus",
      message: "followup — 20/11/2025, 10.00.00",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/home")
      return "Dashboard Monitoring";
    if (path === "/dashboard/leads")
      return userRole === "admin" ? "Leads Management" : "Lead List";
    if (path === "/dashboard/leads/create") return "Create New Lead";
    if (path.match(/^\/dashboard\/leads\/edit\/\d+$/)) return "Edit Lead";
    if (path.match(/^\/dashboard\/leads\/\d+$/)) return "Lead Detail";
    if (path === "/dashboard/users") return "Users Management";
    if (path === "/dashboard/users/create") return "Create New User";
    if (path.match(/^\/dashboard\/users\/edit\/\d+$/)) return "Update User";
    if (path === "/dashboard/follow-up") return "Follow-up Scheduler";
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
    if (path === "/dashboard/follow-up")
      return "Manage scheduled follow-up — date, contact and status";
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
      const leadsLabel =
        userRole === "admin" ? "Leads Management" : "Lead List";

      if (path === "/dashboard/leads/create") {
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Create Leads", path });
      } else if (path.match(/^\/dashboard\/leads\/edit\/\d+$/)) {
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Edit Lead", path });
      } else if (path.match(/^\/dashboard\/leads\/\d+$/)) {
        breadcrumbs.push({ label: leadsLabel, path: "/dashboard/leads" });
        breadcrumbs.push({ label: "Lead Detail", path });
      } else if (path === "/dashboard/users/create") {
        breadcrumbs.push({
          label: "Users Management",
          path: "/dashboard/users",
        });
        breadcrumbs.push({ label: "Create User", path });
      } else if (path.match(/^\/dashboard\/users\/edit\/\d+$/)) {
        breadcrumbs.push({
          label: "Users Management",
          path: "/dashboard/users",
        });
        breadcrumbs.push({ label: "Edit User", path });
      } else if (path.includes("/profile")) {
        breadcrumbs.push({ label: "Profile Settings", path });
      } else if (
        pageName !== "Dashboard" &&
        pageName !== "Dashboard Monitoring"
      ) {
        breadcrumbs.push({ label: pageName, path });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const toggleNotification = () => {
    setIsNotificationOpen(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
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
            {breadcrumbs.map((crumb, index) => (
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
                    index === breadcrumbs.length - 1
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
          <button
            className={styles.notificationBtn}
            aria-label="Notifications"
            onClick={toggleNotification}
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
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

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onUpdate={(newList) => setNotifications(newList)}
      />
    </header>
  );
};

export default Header;
