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
      includeSubPaths: true,
    },
    {
      id: "users",
      label: "Users",
      icon: <FiUsers />,
      path: "/dashboard/users",
      includeSubPaths: true,
    },
    {
      id: "follow-up",
      label: "Follow-Up",
      icon: <FiMessageSquare />,
      path: "/dashboard/follow-up",
    },
    {
      id: "exports",
      label: "Exports",
      icon: <FiDownload />,
      path: "/dashboard/exports",
    },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveWithSubs = (item) => {
    if (item.includeSubPaths) {
      return location.pathname.startsWith(item.path);
    }
    return location.pathname === item.path;
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
                    isActiveWithSubs(item) ? styles.menuItemActive : ""
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
