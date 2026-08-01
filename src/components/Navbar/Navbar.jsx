import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Arabic L10 <span>Hub</span>
            </div>

            <ul className={styles.navLinks}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                    >
                        الرئيسية
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/translations"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                    >
                        التعريبات
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                    >
                        عن المشروع
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                    >
                        تواصل معي
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;