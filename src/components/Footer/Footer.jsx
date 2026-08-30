import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} dir="rtl">
      <div className={styles.accentLine}></div>

      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            Arabic L10 <span>Hub</span>
          </Link>

          <p>
            منصة عربية مستقلة لحفظ ونشر تعريبات الألعاب وتعديلاتها، وتوفير مكان
            موثوق للاعب العربي.
          </p>
        </div>

        <nav className={styles.quickLinksSection} aria-label="روابط الموقع">
          <h4>روابط الموقع</h4>

          <ul className={styles.pageLinks}>
            <li>
              <Link to="/">الرئيسية</Link>
            </li>

            <li>
              <Link to="/translations">التعريبات</Link>
            </li>

            <li>
              <Link to="/about">عن المشروع</Link>
            </li>

            <li>
              <Link to="/contact">تواصل معي</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.contact}>
          <h4>تواصل معي</h4>

          <p className={styles.contactText}>
            تابع أخبار التعريبات أو تواصل معي للاستفسارات والدعم الفني
            والاقتراحات.
          </p>

          <div className={styles.socialLinks}>
            <a
              href="https://discord.gg/THPYXggyz"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Discord"
              title="سيرفر Discord"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
              </svg>

              <span>Discord</span>
            </a>

            <a
              href="mailto:alialojeely@gmail.com"
              className={styles.linkItem}
              aria-label="Gmail"
              title="البريد الإلكتروني"
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>

              <span>Gmail</span>
            </a>

            <a
              href="https://www.reddit.com/user/Mrdarkghosty"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Reddit"
              title="حساب Reddit"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.5-11.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-2.5 5c-1.933 0-3.5-1.119-3.5-2.5h7c0 1.381-1.567 2.5-3.5 2.5z" />
              </svg>

              <span>Reddit</span>
            </a>

            <a
              href="https://next.nexusmods.com/profile/AliAlOjeely"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Nexus Mods"
              title="حساب Nexus Mods"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm0 3.5l7 4v6.9l-7 4.1-7-4.1V9.5l7-4zm-1.5 3v5.6L14.6 9.8v4.7l-4.1-2.4v-5.6l4.1 2.4V14l-4.1-2.4z" />
              </svg>

              <span>Nexus Mods</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {currentYear} Ali Al-ojeely. جميع الحقوق محفوظة.</p>

        <p className={styles.nonProfit}>
          مشروع مستقل وغير ربحي لخدمة مجتمع تعريب الألعاب العربي.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
