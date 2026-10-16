import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTranslationsData } from "../../services/dataLoader";
import CinematicHero from "../../components/CinematicHero/CinematicHero";
import styles from "./Home.module.css";
import CommunityCinematic from "../../components/CommunityCinematic/CommunityCinematic";

const baseUrl = import.meta.env.BASE_URL;

const teams = [
  {
    id: 1,
    name: "موقع مُعرّب",
    description: "مصدرك الشامل لتعريبات الألعاب الرسمية والهاوية.",
    image: `${baseUrl}muarrab.webp`,
    link: "https://muarrab.com/",
  },
  {
    id: 2,
    name: "مكتبة أسمر",
    description:
      "منصة تعريبات حصرية جاهزة للتحميل بروابط مباشرة وتحديثات مستمرة.",
    image: `${baseUrl}asmar.webp`,
    link: "https://asmar-ar.com/",
  },
  {
    id: 3,
    name: "فريق الحلم المتجدد",
    description:
      "من أعرق الفرق المتخصصة في تعريب ألعاب القصة والروايات المرئية.",
    image: `${baseUrl}dream.webp`,
    link: "https://etrdream.com/",
  },
  {
    id: 4,
    name: "فريق فلته",
    description:
      "فريق مبدع ومتألق يقدم تعريبات احترافية ومتقنة لمختلف الألعاب المستقلة والشهيرة.",
    image: `${baseUrl}fltah.webp`,
    link: "https://fltah-translator.com/",
  },
  {
    id: 5,
    name: "العب بالعربي",
    description:
      "منصة رائدة تهدف إلى إثراء المحتوى العربي وتقديم تعريبات عالية الجودة لمختلف منصات الألعاب.",
    image: `${baseUrl}playinarabic.webp`,
    link: "https://www.playinarabic.com/",
  },

  {
    id: 6,
    name: "هشام للتعريب",
    description:
      "منصة عربية متخصصة في تقديم تعريبات الألعاب، تهدف إلى إثراء تجربة اللاعبين وإتاحة المزيد من الألعاب باللغة العربية.",
    image: `${baseUrl}hesham.webp`,
    link: "https://arabichesham.com/",
  },
];

const redditReviews = [
  {
    id: 1,
    user: "u/Disastrous_Tip_7759",
    text: "شكرا اخي حبيت ان اخبرك ان تعريبك هو الوحيد اللي يعمل على نسخه لينكس من اللعبة بدون مشاكل",
  },
  {
    id: 2,
    user: "u/BadOrange8",
    text: "ممتاز يا شيخ الله يباركلك ❤️ رغم ان اللعبة لها اكثر من تعريب بس ما توقعت احد يعربها لنا بشكل يدوي",
  },
  {
    id: 3,
    user: "u/Chance_Pop_235",
    text: "عجبني انك غير الاسماء لاسماء الدبلجه 😆",
  },
  {
    id: 4,
    user: "u/BadOrange8",
    text: "الله يجزيك خير تعرب العاب وتعرفنا كمان على العاب جديدة ممتازة اول مرة اسمع عنها",
  },
];

const highlights = [
  {
    id: 1,
    title: "تعريبات منظمة",
    description:
      "صفحات واضحة لكل لعبة تحتوي على معلومات التعريب والصور وطريقة الوصول إليه.",
  },
  {
    id: 2,
    title: "تجربة عربية",
    description:
      "واجهة مصممة من الأساس للمحتوى العربي مع دعم كامل لاتجاه RTL والجوال.",
  },
  {
    id: 3,
    title: "مجتمع واحد",
    description:
      "مساحة تجمع اللاعبين والمهتمين بالتعريب وتساعد على إبقاء المشاريع متاحة.",
  },
];

const Home = () => {
  const [latestGames, setLatestGames] = useState([]);
  const [totalGamesCount, setTotalGamesCount] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const data = await fetchTranslationsData();

        setAllGames(data);

        const sortedData = [...data].sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate),
        );

        setTotalGamesCount(data.length);
        setLatestGames(sortedData.slice(0, 3));
      } catch (error) {
        console.error("Failed to load translations data", error);
      }
    };

    loadHomeData();
  }, []);

  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) =>
        prev === redditReviews.length - 1 ? 0 : prev + 1,
      );
    }, 9000);

    return () => clearInterval(reviewInterval);
  }, []);

  return (
    <div className={styles.homeContainer} dir="rtl">
      <CinematicHero games={allGames} />

      <section className={styles.highlightsSection}>
        <div className={styles.highlightsGrid}>
          {highlights.map((item) => (
            <article key={item.id} className={styles.highlightCard}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.latestSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>أحدث الإضافات</h2>
              <p className={styles.sectionDescription}>
                آخر الألعاب التي تمت إضافتها إلى مكتبة التعريبات.
              </p>
            </div>

            {totalGamesCount > 0 && (
              <div className={styles.totalGamesBadge}>
                <span>{totalGamesCount}</span>
                لعبة في المكتبة
              </div>
            )}
          </div>

          {latestGames.length > 0 ? (
            <div className={styles.gamesGrid}>
              {latestGames.map((game, index) => (
                <Link
                  to={`/translations/${game.folderName}`}
                  key={game.folderName}
                  className={styles.gameCard}
                >
                  <div className={styles.posterContainer}>
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      loading="lazy"
                    />

                    {index === 0 && (
                      <span className={styles.latestBadge}>الأحدث</span>
                    )}
                  </div>

                  <div className={styles.gameInfo}>
                    <h3>{game.title}</h3>
                    <div className={styles.gameLink}>عرض التفاصيل</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.loadingGrid}>
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.loadingCard} />
              ))}
            </div>
          )}

          <div className={styles.centerAction}>
            <Link to="/translations" className={styles.viewAllButton}>
              عرض جميع التعريبات
              {totalGamesCount > 0 && <span>{totalGamesCount}</span>}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.centerSectionHeader}>
            <h2 className={styles.sectionTitle}>مجتمع التعريب العربي</h2>
            <p className={styles.sectionDescription}>
              مجموعة من الفرق والمواقع التي ساهمت في إثراء تجربة الألعاب باللغة
              العربية.
            </p>
          </div>

          <CommunityCinematic sites={teams} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.reviewsSection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.centerSectionHeader}>
            <h2 className={styles.sectionTitle}>ماذا يقول اللاعبون؟</h2>
          </div>

          <div className={styles.reviewContainer}>
            <div className={styles.reviewStage}>
              {redditReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`${styles.reviewCard} ${
                    index === currentReview ? styles.activeReviewCard : ""
                  }`}
                  aria-hidden={index !== currentReview}
                >
                  <div className={styles.redditUser}>
                    <div className={styles.redditIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.5-11.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm5 0c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm-2.5 5c-1.933 0-3.5-1.119-3.5-2.5h7c0 1.381-1.567 2.5-3.5 2.5z" />
                      </svg>
                    </div>

                    <div>
                      <strong>{review.user}</strong>
                      <span>Reddit</span>
                    </div>
                  </div>

                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              ))}
            </div>

            <div className={styles.carouselDots}>
              {redditReviews.map((review, index) => (
                <button
                  type="button"
                  key={review.id}
                  className={`${styles.dot} ${
                    index === currentReview ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentReview(index)}
                  aria-label={`عرض التعليق ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.discordSection}>
        <div className={styles.discordGlow} />

        <div className={styles.discordContent}>
          <div className={styles.discordIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
            </svg>
          </div>

          <div className={styles.discordText}>
            <h2>انضم إلى مجتمعنا على Discord</h2>
            <p>
              تابع آخر أخبار التعريبات، شارك اقتراحاتك، احصل على المساعدة وتواصل
              مباشرة مع المجتمع.
            </p>
          </div>

          <a
            href="https://discord.gg/THPYXggyz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordButton}
          >
            الانضمام إلى السيرفر
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
