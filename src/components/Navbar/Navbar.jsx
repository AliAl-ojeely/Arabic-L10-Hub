import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Arabic L10 <span>Hub</span>
            </div>

            {/* زر البرجر للجوال */}
            <button
                className={`${styles.burgerButton} ${isOpen ? styles.activeBurger : ''}`}
                onClick={toggleMenu}
                aria-label="القائمة"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ''}`}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                        onClick={closeMenu}
                        end
                    >
                        الرئيسية
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/translations"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                        onClick={closeMenu}
                    >
                        التعريبات
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                        onClick={closeMenu}
                    >
                        عن المشروع
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                        onClick={closeMenu}
                    >
                        تواصل معي
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;