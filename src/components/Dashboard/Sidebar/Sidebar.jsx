// src/components/Dashboard/Sidebar/Sidebar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Logo from "../../../assets/dashboard.png";
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiDownload,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: <FiHome />,
      path: "/dashboard/home",
    },
    {
      id: "leads",
      label: "Leads",
      icon: <FiUsers />,
      path: "/dashboard/leads",
    },
    {
      id: "sales",
      label: "Sales",
      icon: <FiUsers />,
      path: "/dashboard/sales",
    },
    {
      id: "follow-up",
      label: "Follow-Up",
      icon: <FiMessageSquare />,
      path: "/dashboard/follow-up",
    },
    {
      id: "call-logs",
      label: "Call Logs",
      icon: <FiMessageSquare />,
      path: "/dashboard/call-logs",
    },
    {
      id: "exports",
      label: "Exports",
      icon: <FiDownload />,
      path: "/dashboard/exports",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <FiUser />,
      path: "/dashboard/profile",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    // Special handling for Leads menu - active when in /dashboard/leads or /dashboard/leads/:id or /dashboard/leads/create
    if (path === "/dashboard/leads") {
      return (
        location.pathname === path ||
        location.pathname.match(/^\/dashboard\/leads\/\d+$/) ||
        location.pathname === "/dashboard/leads/create"
      );
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={styles.mobileToggle}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <img src={Logo} alt="Astrela Logo" className={styles.logo} />
          <span className={styles.brandName}>ASTRELA</span>
        </div>

        {/* Menu Items */}
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.menuItem} ${
                    isActive(item.path) ? styles.menuItemActive : ""
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
