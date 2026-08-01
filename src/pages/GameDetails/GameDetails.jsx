import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import { createPortal } from 'react-dom';
import styles from './GameDetails.module.css';

const GameDetails = () => {
    const { folderName } = useParams();

    // 1. الحالات (States)
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // 2. جلب البيانات
    useEffect(() => {
        const loadGameDetails = async () => {
            const allGames = await fetchTranslationsData();
            const foundGame = allGames.find(g => g.folderName === folderName);
            setGame(foundGame);
            setLoading(false);
        };
        loadGameDetails();
    }, [folderName]);

    // 3. دوال التحكم بالنافذة المنبثقة
    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
        setIsPlaying(false);
    };

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setIsPlaying(false);
    }, []);

    const nextImage = useCallback(() => {
        if (!game?.screenshots) return;
        setCurrentIndex((prev) => (prev === game.screenshots.length - 1 ? 0 : prev + 1));
    }, [game]);

    const prevImage = useCallback(() => {
        if (!game?.screenshots) return;
        setCurrentIndex((prev) => (prev === 0 ? game.screenshots.length - 1 : prev - 1));
    }, [game]);

    // 4. التأثيرات (التشغيل التلقائي واختصارات لوحة المفاتيح)
    useEffect(() => {
        let interval;
        if (isPlaying && isModalOpen && game?.screenshots?.length > 0) {
            interval = setInterval(() => {
                nextImage();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isModalOpen, game, nextImage]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isModalOpen) return;
            if (e.key === 'ArrowLeft') nextImage();
            else if (e.key === 'ArrowRight') prevImage();
            else if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, nextImage, prevImage, closeModal]);

    // 5. حالات التحميل والخطأ
    if (loading) return <div className={styles.loadingState}>جاري تحميل التفاصيل...</div>;
    if (!game) return (
        <div className={styles.errorState}>
            <h2>عذراً، لم يتم العثور على هذه اللعبة!</h2>
            <Link to="/translations" className={styles.backLink}>العودة لمعرض التعريبات</Link>
        </div>
    );

    // استخراج المتغيرات ليكون كود الـ JSX نظيفاً (تمت إضافة المترجم والنسخة)
    const { title, description, releaseYear, translator, appVersion, installationSteps, downloadUrl, coverImage, screenshots } = game;

    // 6. واجهة المستخدم (JSX)
    return (
        <div className={styles.detailsContainer}>

            {/* زر العودة المحسّن */}
            <Link to="/translations" className={styles.backLink}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 19 19 12 12 5"></polyline>
                </svg>
                العودة للتعريبات
            </Link>

            {/* --- القسم العلوي: التفاصيل والبوستر --- */}
            <div className={styles.headerSection}>

                {/* التفاصيل (يمين) */}
                <div className={styles.infoWrapper}>

                    <div className={styles.titleHeader}>
                        <h1 className={styles.gameTitle}>{title}</h1>
                        <span className={styles.releaseYear}>{releaseYear}</span>
                    </div>

                    {/* --- القسم الجديد الخاص بالمعرب والنسخة --- */}
                    <div className={styles.metaDataBlock}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>المُعرّب:</span>
                            <span className={styles.metaValue}>{translator}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>النسخة المتوافقة:</span>
                            <span className={styles.metaValue} dir="ltr">{appVersion}</span>
                        </div>
                    </div>

                    <div className={styles.detailsBlock}>
                        <h3>عن اللعبة والتعريب</h3>
                        <p className={styles.description}>{description}</p>
                    </div>

                    {installationSteps && installationSteps.length > 0 && (
                        <div className={styles.detailsBlock}>
                            <h3>طريقة التثبيت</h3>
                            <ol className={styles.installList}>
                                {installationSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}

                    <a href={downloadUrl} download className={styles.downloadButton}>
                        تحميل الـ Mod
                    </a>
                </div>

                {/* البوستر (يسار) */}
                <div className={styles.posterWrapper}>
                    <img src={coverImage} alt={title} className={styles.posterImage} />
                </div>

            </div>

            {/* --- قسم الصور المصغرة --- */}
            {screenshots && screenshots.length > 0 && (
                <div className={styles.gallerySection}>
                    <h2>صور من داخل التعريب</h2>
                    <div className={styles.thumbnailsGrid}>
                        {screenshots.map((img, index) => (
                            <div key={index} className={styles.thumbnailWrapper} onClick={() => openModal(index)}>
                                <img src={img} alt={`صورة ${index + 1}`} loading="lazy" />
                                <div className={styles.zoomIcon}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        <line x1="11" y1="8" x2="11" y2="14"></line>
                                        <line x1="8" y1="11" x2="14" y2="11"></line>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- النافذة المنبثقة للصور (Modal) --- */}
            {/* --- النافذة المنبثقة للصور (Modal باستخدام Portal) --- */}
            {isModalOpen && createPortal(
                <div className={styles.modalOverlay} onClick={closeModal}>

                    <div className={styles.modalControls} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.iconButton} onClick={closeModal} title="إغلاق (Esc)">✖</button>
                        <button
                            className={`${styles.iconButton} ${isPlaying ? styles.activePlay : ''}`}
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? '⏸ إيقاف' : '▶ تشغيل تلقائي'}
                        </button>
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.rightButton}`}
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        title="السابق (السهم الأيمن)"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    <button
                        className={`${styles.navButton} ${styles.leftButton}`}
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        title="التالي (السهم الأيسر)"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className={styles.modalImageContainer} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={screenshots[currentIndex]}
                            alt={`عرض مكبر ${currentIndex + 1}`}
                            className={styles.fullImage}
                        />
                        <div className={styles.imageCounter}>
                            {currentIndex + 1} / {screenshots.length}
                        </div>
                    </div>

                </div>,
                document.body // هذا هو السطر السحري الذي ينقل النافذة خارج الصفحة
            )}
        </div>
    );
};

export default GameDetails;