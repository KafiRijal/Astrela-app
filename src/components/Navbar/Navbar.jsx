// src/components/Navbar/Navbar.jsx
import React, { useState, useRef } from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo-kotak.png";
import { FiGlobe } from "react-icons/fi";
import { useLanguage } from "../../contexts/useLanguage";

export default function Navbar({ menus: _menus = [], onLogin }) {
  const [open, setOpen] = useState(false);

  const { lang, toggleLang, t } = useLanguage();
  const menus = _menus.length ? _menus : t.menus;

  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const brandRef = useRef(null);

  function closeMobileAndFocus(target = null) {
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
  }

  function handleMobileLangClick() {
    toggleLang();
    closeMobileAndFocus(hamburgerRef.current);
  }

  function handleMobileLinkClick() {
    closeMobileAndFocus(hamburgerRef.current);
  }

  function handleMobileLogin() {
    closeMobileAndFocus(hamburgerRef.current);
    if (onLogin) onLogin();
    else window.location.href = "/login";
  }

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

          {menus.map((m) => (
            <li key={m} className={styles.menuItem}>
              <a
                href={"#" + m.toLowerCase().replace(/\s+/g, "-")}
                className={styles.menuLink}
              >
                {m}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions: Login + Hamburger */}
        <div className={styles.actions}>
          <button
            className={styles.loginBtn}
            onClick={() =>
              onLogin ? onLogin() : (window.location.href = "/login")
            }
          >
            {t.login}
          </button>

          {/* Hamburger (mobile) */}
          <button
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
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

          {menus.map((m) => (
            <li key={m}>
              <a
                href={"#" + m.toLowerCase().replace(/\s+/g, "-")}
                className={styles.mobileLink}
                onClick={handleMobileLinkClick}
              >
                {m}
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
}
