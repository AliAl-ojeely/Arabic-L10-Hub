import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTranslationsData } from "../../services/dataLoader";
import styles from "./Translations.module.css";

const normalizeSearchText = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();

const formatDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const Translations = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchTranslationsData();

        const sortedData = [...data].sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate),
        );

        if (!cancelled) {
          setGames(sortedData);
        }
      } catch (err) {
        console.error("Failed to load translations:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredGames = useMemo(() => {
    const query = normalizeSearchText(searchQuery);

    if (!query) {
      return games;
    }

    return games.filter((game) =>
      normalizeSearchText(game.title).includes(query),
    );
  }, [games, searchQuery]);

  const hasSearch = searchQuery.trim().length > 0;
  const visibleCount = hasSearch ? filteredGames.length : games.length;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />

        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>مكتبة التعريبات</h1>

          <p className={styles.pageDescription}>
            استعرض جميع تعريبات الألعاب المتوفرة، وابحث عن لعبتك بسرعة للوصول
            إلى صفحة التعريب والتفاصيل وطريقة التثبيت.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.toolbar}>
            <div className={styles.searchArea}>
              <div className={styles.searchInputWrapper}>
                <svg
                  className={styles.searchIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                  type="search"
                  className={styles.searchInput}
                  placeholder="ابحث عن اسم اللعبة..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="البحث في التعريبات"
                  autoComplete="off"
                />

                {hasSearch && (
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={clearSearch}
                    aria-label="مسح البحث"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className={styles.resultsBadge}>
              <strong className={styles.resultsBadgeNumber}>
                {visibleCount}
              </strong>
              <span className={styles.resultsBadgeLabel}>
                {hasSearch ? "نتيجة" : "تعريب متاح"}
              </span>
            </div>
          </div>

          {loading && (
            <div className={styles.gridContainer}>
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                  <div className={styles.skeletonPoster} />

                  <div className={styles.skeletonInfo}>
                    <span />
                    <span />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className={styles.stateCard}>
              <div className={styles.stateIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>

              <h2>تعذر تحميل مكتبة التعريبات</h2>

              <p>
                حدث خطأ أثناء قراءة بيانات الألعاب. حاول تحديث الصفحة مرة أخرى.
              </p>

              <button
                type="button"
                className={styles.stateButton}
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {!loading && !error && filteredGames.length > 0 && (
            <div className={styles.gridContainer}>
              {filteredGames.map((game, index) => {
                const addedDate = formatDate(game.addedDate);

                return (
                  <Link
                    to={`/translations/${game.folderName}`}
                    key={game.folderName}
                    className={styles.gameCard}
                  >
                    <div className={styles.posterContainer}>
                      <img
                        src={game.coverImage}
                        alt={`غلاف لعبة ${game.title}`}
                        className={styles.posterImage}
                        loading="lazy"
                      />

                      <div className={styles.posterGradient} />

                      {index < 3 && !hasSearch && (
                        <span className={styles.newBadge}>جديد</span>
                      )}

                      <div className={styles.openIcon}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M19 12H5" />
                          <path d="m12 19-7-7 7-7" />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.gameInfo}>
                      <span className={styles.translationLabel}>
                        تعريب عربي
                      </span>

                      <h2 className={styles.gameTitle}>{game.title}</h2>

                      <div className={styles.gameMeta}>
                        {addedDate && (
                          <span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" />
                              <path d="M16 2v4" />
                              <path d="M8 2v4" />
                              <path d="M3 10h18" />
                            </svg>

                            {addedDate}
                          </span>
                        )}

                        <span className={styles.viewDetails}>عرض التفاصيل</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {!loading && !error && filteredGames.length === 0 && (
            <div className={styles.stateCard}>
              <div className={styles.stateIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>

              <h2>لم نجد هذه اللعبة</h2>

              <p>
                لا توجد نتائج مطابقة للبحث عن
                <strong> "{searchQuery}"</strong>. جرّب كتابة اسم آخر أو مسح
                البحث.
              </p>

              <button
                type="button"
                className={styles.stateButton}
                onClick={clearSearch}
              >
                عرض جميع التعريبات
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Translations;
