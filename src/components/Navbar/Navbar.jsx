import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const burgerRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);

        requestAnimationFrame(() => {
          burgerRef.current?.focus();
        });
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link
            to="/"
            className={styles.logo}
            onClick={closeMenu}
            aria-label="Arabic L10 Hub"
          >
            <span className={styles.logoMark}>
              <span>A</span>
            </span>

            <span className={styles.logoText}>
              <span>Arabic L10</span>
              <strong>Hub</strong>
            </span>
          </Link>

          <nav className={styles.desktopNav} aria-label="التنقل الرئيسي">
            <ul className={styles.navLinks}>
              <li>
                <NavLink to="/" end className={getNavLinkClass}>
                  الرئيسية
                </NavLink>
              </li>

              <li>
                <NavLink to="/translations" className={getNavLinkClass}>
                  التعريبات
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  عن المشروع
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  تواصل معي
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.navActions}>
            <a
              href="https://discord.gg/THPYXggyz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordButton}
              aria-label="Discord"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
              </svg>

              <span>Discord</span>
            </a>

            <button
              ref={burgerRef}
              type="button"
              className={`${styles.burgerButton} ${
                isOpen ? styles.activeBurger : ""
              }`}
              onClick={toggleMenu}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.menuOverlay} ${isOpen ? styles.showOverlay : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${isOpen ? styles.showMenu : ""}`}
        inert={!isOpen}
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-label="قائمة التنقل"
      >
        <div className={styles.mobileHeader}>
          <Link to="/" className={styles.mobileLogo} onClick={closeMenu}>
            <span className={styles.mobileLogoText}>
              <span>Arabic L10</span>
              <strong>Hub</strong>
            </span>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label="إغلاق القائمة"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.mobileBody}>
          <span className={styles.mobileLabel}>التنقل</span>

          <nav aria-label="التنقل للجوال">
            <ul className={styles.mobileLinks}>
              <li>
                <NavLink
                  to="/"
                  end
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  <span className={styles.mobileLinkIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 11 12 4l9 7" />
                      <path d="M5 10v10h14V10" />
                    </svg>
                  </span>

                  <span>الرئيسية</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/translations"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  <span className={styles.mobileLinkIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                    </svg>
                  </span>

                  <span>التعريبات</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  <span className={styles.mobileLinkIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </span>

                  <span>عن المشروع</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={getNavLinkClass}
                  onClick={closeMenu}
                >
                  <span className={styles.mobileLinkIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                    </svg>
                  </span>

                  <span>تواصل معي</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.mobileFooter}>
          <a
            href="https://discord.gg/THPYXggyz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileDiscord}
            onClick={closeMenu}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
            </svg>

            <div>
              <strong>انضم إلى Discord</strong>
              <span>تواصل مع مجتمع التعريب</span>
            </div>

            <svg
              className={styles.discordArrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
