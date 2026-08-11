import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import { useTypingRotate } from '../../hooks/useTypingRotate';
import styles from './Home.module.css';

// جلب المسار الأساسي لـ Vite لضمان ظهور الصور حتى بعد رفع الموقع على GitHub
const baseUrl = import.meta.env.BASE_URL;

// مصفوفة الفرق والمكتبات الداعمة (تم إضافة baseUrl لمسار الصور)
const teams = [
    {
        id: 1,
        name: "موقع مُعرّب",
        description: "مصدرك الشامل لتعريبات الألعاب الرسمية والهاوية.",
        image: `${baseUrl}muarrab.webp`,
        link: "https://muarrab.com/"
    },
    {
        id: 2,
        name: "مكتبة أسمر",
        description: "منصة تعريبات حصرية جاهزة للتحميل بروابط مباشرة وتحديثات مستمرة.",
        image: `${baseUrl}asmar.webp`,
        link: "https://asmar-ar.com/"
    },
    {
        id: 3,
        name: "فريق الحلم المتجدد",
        description: "من أعرق الفرق المتخصصة في تعريب ألعاب القصة والروايات المرئية.",
        image: `${baseUrl}dream.webp`,
        link: "https://etrdream.com/"
    },
    {
        id: 4,
        name: "فريق فلته",
        description: "فريق مبدع ومتألق يقدم تعريبات احترافية ومتقنة لمختلف الألعاب المستقلة والشهيرة.",
        image: `${baseUrl}fltah.webp`,
        link: "https://fltah-translator.com/"
    },
    {
        id: 5,
        name: "العب بالعربي",
        description: "منصة رائدة تهدف إلى إثراء المحتوى العربي وتقديم تعريبات عالية الجودة لمختلف منصات الألعاب.",
        image: `${baseUrl}playinarabic.webp`,
        link: "https://www.playinarabic.com/"
    }
];

const redditReviews = [
    { id: 1, user: "u/Disastrous_Tip_7759", text: "شكرا اخي حبيت ان اخبرك ان تعريبك هو الوحيد اللي يعمل على نسخه لينكس من اللعبة بدون مشاكل" },
    { id: 2, user: "u/BadOrange8", text: "ممتاز يا شيخ الله يباركلك ❤️ رغم ان اللعبة لها اكثر من تعريب بس ما توقعت احد يعربها لنا بشكل يدوي" },
    { id: 3, user: "u/Chance_Pop_235", text: "عجبني انك غير الاسماء لاسماء الدبلجه 😆" },
    { id: 4, user: "u/BadOrange8", text: "الله يجزيك خير تعرب العاب وتعرفنا كمان على العاب جديدة ممتازة اول مرة اسمع عنها" }
];

const Home = () => {
    const [latestGames, setLatestGames] = useState([]);
    const [totalGamesCount, setTotalGamesCount] = useState(0);
    const [currentReview, setCurrentReview] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

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
                setTotalGamesCount(data.length);
                const sortedData = data.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
                setLatestGames(sortedData.slice(0, 3));
            } catch (error) {
                console.error("لم يتم العثور على بيانات الألعاب", error);
            }
        };
        loadHomeData();
    }, []);

    useEffect(() => {
        const reviewInterval = setInterval(() => {
            setCurrentReview((prev) => (prev === redditReviews.length - 1 ? 0 : prev + 1));
        }, 10000);
        return () => clearInterval(reviewInterval);
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev === teams.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(slideInterval);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev === teams.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? teams.length - 1 : prev - 1));

    return (
        <div className={styles.homeContainer}>

            {/* --- Hero Section --- */}
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

            {/* --- سلايدر فرق ومكتبات التعريب --- */}
            <section className={styles.section}>
                <div className={styles.sliderHeader}>
                    <h2 className={styles.sectionTitle}>مجتمع التعريب العربي</h2>
                    <p className={styles.sectionDescription}>تعرف على أبرز الفرق والمكتبات التي تساهم في إثراء المحتوى العربي. <br /> (قائمة سيرفرات ديسكورد قادمة قريباً ⏳)</p>
                </div>

                <div className={styles.slideshowContainer}>
                    {teams.map((team, index) => (
                        <div
                            key={team.id}
                            className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
                            style={{ backgroundImage: `url('${team.image}')` }}
                        >
                            <div className={styles.slideOverlay}>
                                <div className={styles.slideContent}>
                                    <h3>{team.name}</h3>
                                    <p>{team.description}</p>
                                    <a href={team.link} target="_blank" rel="noopener noreferrer" className={styles.slideButton}>
                                        زيارة الموقع
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* الزر الأيمن: يشير لليمين ويأخذك للشريحة التالية */}
                    <button className={`${styles.sliderNav} ${styles.rightButton}`} onClick={nextSlide}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>

                    {/* الزر الأيسر: يشير لليسار ويرجعك للشريحة السابقة */}
                    <button className={`${styles.sliderNav} ${styles.leftButton}`} onClick={prevSlide}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    <div className={styles.slideIndicators}>
                        {teams.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- أحدث الإضافات --- */}
            <section className={`${styles.section} ${styles.latestSection}`}>
                <div className={styles.latestContainer}>
                    <div className={styles.latestHeader}>
                        <h2 className={styles.sectionTitle} style={{ margin: 0 }}>أحدث الإضافات</h2>
                        {totalGamesCount > 0 && (
                            <span className={styles.totalGamesBadge}>
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

            {/* --- ماذا يقول اللاعبون (Reddit) --- */}
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