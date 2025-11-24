import { useState, useRef } from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo-kotak.png";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../../contexts/useLanguage";

const Navbar = ({ menus: _menus = [], onLogin }) => {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const menus = _menus.length ? _menus : t.menus;

  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
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
      // fallback: nothing
    }
    setOpen(false);
  };

  const handleMobileLangClick = () => {
    toggleLang();
    closeMobileAndFocus(hamburgerRef.current);
  };

  const handleMobileLinkClick = () => {
    closeMobileAndFocus(hamburgerRef.current);
  };

  const handleMobileLogin = () => {
    closeMobileAndFocus(hamburgerRef.current);
    if (onLogin) onLogin();
    else window.location.href = "/login";
  };

  const handleLogin = () => {
    if (onLogin) onLogin();
    else window.location.href = "/login";
  };

  const handleToggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const getMenuHref = (menuItem) => {
    return "#" + menuItem.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Brand Logo */}
        <a
          href="/"
          className={styles.brand}
          aria-label="Astrela home"
          ref={brandRef}
        >
          <img src={Logo} alt="Astrela Logo" className={styles.logo} />
        </a>

        {/* Desktop Menu */}
        <ul className={styles.menu}>
          <li className={styles.langItem}>
            <button
              className={styles.langBtn}
              onClick={toggleLang}
              title={t.change_language + ` (${lang.toUpperCase()})`}
              aria-label={`Change language (${lang})`}
            >
              <FiGlobe className={styles.langIcon} />
              <span className={styles.langLabel}>{lang.toUpperCase()}</span>
            </button>
          </li>

          {menus.map((menu) => (
            <li key={menu} className={styles.menuItem}>
              <a href={getMenuHref(menu)} className={styles.menuLink}>
                {menu}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={handleLogin}>
            {t.login}
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

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}
        aria-hidden={!open}
        ref={mobileMenuRef}
      >
        <ul className={styles.mobileList}>
          <li>
            <button
              className={styles.mobileLangBtn}
              onClick={handleMobileLangClick}
            >
              <FiGlobe style={{ verticalAlign: "middle", marginRight: 8 }} />
              {lang === "en" ? "English" : "Indonesia"}
            </button>
          </li>

          {menus.map((menu) => (
            <li key={menu}>
              <a
                href={getMenuHref(menu)}
                className={styles.mobileLink}
                onClick={handleMobileLinkClick}
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
              {t.login}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
