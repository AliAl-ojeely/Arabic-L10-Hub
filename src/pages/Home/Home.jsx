import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.title}>
                    مركز تعريب الألعاب
                </h1>
                <p className={styles.subtitle}>
                    مكتبتك الشاملة لملفات التعريب، الباتشات، وتعديلات الألعاب المخصصة لبيئة الويندوز.
                    تصفح الألعاب وحمل الترجمات بضغطة زر واحدة وبدون أي تعقيد.
                </p>
                <div className={styles.actions}>
                    <Link to="/translations" className={styles.primaryButton}>
                        تصفح التعريبات
                    </Link>
                    <Link to="/about" className={styles.secondaryButton}>
                        عن المشروع
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;