import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import { useTypingRotate } from '../../hooks/useTypingRotate';
import styles from './Home.module.css';

const redditReviews = [
    { id: 1, user: "u/Disastrous_Tip_7759", text: "شكرا اخي حبيت ان اخبرك ان تعريبك هو الوحيد اللي يعمل على نسخه لينكس من اللعبة بدون مشاكل" },
    { id: 2, user: "u/BadOrange8", text: "ممتاز يا شيخ الله يباركلك ❤️ رغم ان اللعبة لها اكثر من تعريب بس ما توقعت احد يعربها لنا بشكل يدوي" },
    { id: 3, user: "u/Chance_Pop_235", text: "عجبني انك غير الاسماء لاسماء الدبلجه 😆" },
    { id: 4, user: "u/BadOrange8", text: "الله يجزيك خير تعرب العاب وتعرفنا كمان على العاب جديدة ممتازة اول مرة اسمع عنها" }
];

const Home = () => {
    const [latestGames, setLatestGames] = useState([]);
    const [totalGamesCount, setTotalGamesCount] = useState(0); // حالة لتخزين إجمالي عدد الألعاب
    const [currentReview, setCurrentReview] = useState(0);

    const typingWords = [
        'مركز توطين وتعديل الألعاب',
        'مكتبة شاملة لتعريبات الألعاب',
        'أحدث الباتشات والتعديلات الحصرية',
        'منصتك الأولى للألعاب المعربة'
    ];

    const typedText = useTypingRotate(typingWords, 80, 50, 2000);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                const data = await fetchTranslationsData();

                // حفظ العدد الإجمالي للألعاب
                setTotalGamesCount(data.length);

                const sortedData = data.sort((a, b) => {
                    return new Date(b.addedDate) - new Date(a.addedDate);
                });

                setLatestGames(sortedData.slice(0, 3));

            } catch (error) {
                console.error("لم يتم العثور على بيانات الألعاب", error);
            }
        };
        loadHomeData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev === redditReviews.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.homeContainer}>

            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        <span className={styles.typingText}>{typedText}</span>
                        <span className={styles.cursor}>|</span>
                    </h1>
                    <p className={styles.subtitle}>
                        ارتقِ بتجربتك وانغمس في عوالم الألعاب بلغتك الأم. نوفر لك باتشات تعريب دقيقة، وتعديلات (Mods) آمنة ومتوافقة مع مختلف أنظمة التشغيل، مجهزة لتثبيتها بكل سهولة لضمان تجربة لعب متكاملة.
                    </p>
                    <div className={styles.actions}>
                        <Link to="/translations" className={styles.primaryButton}>
                            تصفح مكتبة الألعاب
                        </Link>
                        <Link to="/about" className={styles.secondaryButton}>
                            تعرف على المشروع
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>لماذا تختار تعريباتنا؟</h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </div>
                        <h3>توطين احترافي</h3>
                        <p>صياغة دقيقة للنصوص والحوارات لتتناسب مع سياق اللعبة وتوفر تجربة اندماج كاملة بعيداً عن الترجمة الحرفية.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </div>
                        <h3>تثبيت آمن وسهل</h3>
                        <p>ملفات مجهزة بعناية ومضغوطة لتكون جاهزة للفك والنقل المباشر إلى مسار اللعبة دون المساس بملفات النظام الأساسية.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        </div>
                        <h3>دعم التحديثات</h3>
                        <p>تحديثات مستمرة للباتشات لتتوافق مع أحدث إصدارات الألعاب الرسمية لضمان استقرار الأداء وخلوه من المشاكل.</p>
                    </div>
                </div>
            </section>

            {/* القسم الثالث: أحدث الإضافات مع عرض إجمالي عدد الألعاب */}
            <section className={`${styles.section} ${styles.latestSection}`}>
                <div className={styles.latestContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                        <h2 className={styles.sectionTitle} style={{ margin: 0 }}>أحدث الإضافات</h2>
                        {totalGamesCount > 0 && (
                            <span style={{ marginTop: 20, backgroundColor: 'var(--surface-color-light)', padding: '0.4rem 1rem', borderRadius: '20px', color: 'var(--accent-color)', fontWeight: 'bold', border: '1px solid var(--accent-color)', fontSize: '0.95rem' }}>
                                إجمالي الألعاب المعربة: {totalGamesCount}
                            </span>
                        )}
                    </div>

                    {latestGames.length > 0 ? (
                        <div className={styles.gamesGrid}>
                            {latestGames.map((game) => (
                                <Link to={`/translations/${game.folderName}`} key={game.id} className={styles.gameCard}>
                                    <div className={styles.posterContainer}>
                                        <img src={game.coverImage} alt={game.title} loading="lazy" />
                                    </div>
                                    <div className={styles.gameInfo}>
                                        <h4>{game.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.emptyState}>جاري تحميل أحدث التعريبات...</p>
                    )}

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <Link to="/translations" className={styles.secondaryButton}>
                            عرض جميع التعريبات ({totalGamesCount})
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>ماذا يقول اللاعبون؟</h2>
                <div className={styles.carouselWrapper}>
                    <div
                        className={styles.carouselTrack}
                        style={{ transform: `translateX(${currentReview * 100}%)` }}
                    >
                        {redditReviews.map((review) => (
                            <div key={review.id} className={styles.reviewSlide}>
                                <div className={styles.reviewCard}>
                                    <div className={styles.redditUser}>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.5-11.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-2.5 5c-1.933 0-3.5-1.119-3.5-2.5h7c0 1.381-1.567 2.5-3.5 2.5z" />
                                        </svg>
                                        <span>{review.user}</span>
                                    </div>
                                    <p className={styles.reviewText}>"{review.text}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.carouselDots}>
                        {redditReviews.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentReview ? styles.activeDot : ''}`}
                                onClick={() => setCurrentReview(index)}
                                aria-label={`الذهاب إلى التعليق ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;