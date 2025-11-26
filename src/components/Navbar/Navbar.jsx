import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo-kotak.png";

const defaultMenus = ["Home", "About", "Features", "How it Works"];

const Navbar = ({ menus: _menus = [], onLogin }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menus = _menus.length ? _menus : defaultMenus;

  const hamburgerRef = useRef(null);
  const brandRef = useRef(null);

  const closeMobileAndFocus = (target = null) => {
    const toFocus =
      target && target.focus
        ? target
        : hamburgerRef.current
        ? hamburgerRef.current
        : brandRef.current
        ? brandRef.current
        : document.body;
    try {
      toFocus.focus();
    } catch {
      // do nothing
    }
    setOpen(false);
  };

  const handleMobileLinkClick = (e, menu) => {
    e.preventDefault();
    closeMobileAndFocus(hamburgerRef.current);
    handleMenuClick(menu);
  };

  const handleMobileLogin = () => {
    closeMobileAndFocus(hamburgerRef.current);
    if (onLogin) onLogin();
    else navigate("/login");
  };

  const handleLogin = () => {
    if (onLogin) onLogin();
    else navigate("/login");
  };

  const handleToggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const home = document.querySelector("#home");
        if (home) home.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleMenuClick = (menu) => {
    const key = String(menu).trim().toLowerCase();
    const sectionId = key === "home" ? "home" : key.replace(/\s+/g, "-");

    if (location.pathname === "/") {
      const el = document.querySelector(`#${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    navigate(`/#${sectionId}`);
    setTimeout(() => {
      const el = document.querySelector(`#${sectionId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const getMenuHref = (menuItem) => {
    return "#" + String(menuItem).toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        <a
          href="/"
          className={styles.brand}
          aria-label="Astrela home"
          ref={brandRef}
          onClick={handleBrandClick}
        >
          <img src={Logo} alt="Astrela Logo" className={styles.logo} />
        </a>

        <ul className={styles.menu}>
          {menus.map((menu) => (
            <li key={menu} className={styles.menuItem}>
              <a
                href={getMenuHref(menu)}
                className={styles.menuLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(menu);
                }}
              >
                {menu}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>

          <button
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={handleToggleMenu}
            ref={hamburgerRef}
          >
            <span className={styles.hamburgerBox}>
              <span className={styles.hamburgerInner} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          {menus.map((menu) => (
            <li key={menu}>
              <a
                href={getMenuHref(menu)}
                className={styles.mobileLink}
                onClick={(e) => handleMobileLinkClick(e, menu)}
              >
                {menu}
              </a>
            </li>
          ))}

          <li>
            <button
              className={styles.mobileLoginBtn}
              onClick={handleMobileLogin}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
