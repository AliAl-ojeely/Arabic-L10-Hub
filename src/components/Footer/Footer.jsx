import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>

                <div className={styles.brand}>
                    <h3>Arabic L10 <span>Hub</span></h3>
                    <p>منصتك الأولى لتعريب الألعاب وتعديلاتها.</p>
                </div>

                <div className={styles.contact}>
                    <h4>تواصل معي</h4>

                    <div className={styles.socialLinks}>
                        <a href="mailto:alialojeely@gmail.com" className={styles.linkItem} title="عبر البريد الإلكتروني">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span>Gmail</span>
                        </a>

                        <a href="https://www.reddit.com/user/Mrdarkghosty" target="_blank" rel="noopener noreferrer" className={styles.linkItem} title="حسابي على Reddit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.5-11.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-2.5 5c-1.933 0-3.5-1.119-3.5-2.5h7c0 1.381-1.567 2.5-3.5 2.5z" />
                            </svg>
                            <span>Reddit</span>
                        </a>

                        <a href="https://next.nexusmods.com/profile/MrGhost2001" target="_blank" rel="noopener noreferrer" className={styles.linkItem} title="حسابي على Nexus Mods">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm0 3.5l7 4v6.9l-7 4.1-7-4.1V9.5l7-4zm-1.5 3v5.6L14.6 9.8v4.7l-4.1-2.4v-5.6l4.1 2.4V14l-4.1-2.4z" />
                            </svg>
                            <span>Nexus Mods</span>
                        </a>
                    </div>
                </div>

            </div>

            <div className={styles.copyright}>
                <p>&copy; {currentYear} Ali Al-ojeely. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    );
};

export default Footer;