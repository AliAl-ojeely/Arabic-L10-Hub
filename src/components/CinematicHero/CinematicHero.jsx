import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CinematicHero.module.css";

const SLIDE_DURATION = 8000;

// Exact background filenames from public/background.
const BACKGROUNDS = {
  "Partisans 1941": "partisans-1941.jpg",
  "Hollow Knight Silksong": "hollow-knight-silksong.png",
  "Gothic 1 Remake": "gothic-1-remake.png",
  "SpongeBob SquarePants Titans of the Tide":
    "spongebob-squarepants-titans-of-the-tide.jpg",
  "The Mound - Omen of Cthulhu": "the-mound-omen-of-cthulhu.jpg",
  "Eriksholm - The Stolen Dream": "eriksholm-the-stolen-dream.jpg",
  "This Bed We Made": "this-bed-we-made.jpg",
  "Beast of Reincarnation": "beast-of-reincarnation.jpg",
  "Lost & Found - A This Bed We Made Story":
    "lost-found-a-this-bed-we-made-story.jpg",
  "Grounded 2": "grounded-2.png",
  "Men of War": "men-of-war.jpg",
  "Jagged Alliance 3": "jagged-alliance-3.jpg",
  "Help Will Come Tomorrow": "help-will-come-tomorrow.png",
  "All Quiet in the Trenches": "all-quiet-in-the-trenches.png",
  Banished: "banished.png",
  "Phoenix Wright Ace Attorney Trilogy":
    "phoenix-wright-ace-attorney-trilogy.jpg",
  "Have a Nice Death": "have-a-nice-death.png",
  "Laika Aged Through Blood": "laika-aged-through-blood.png",
  "Enderal Forgotten Stories": "enderal-forgotten-stories.png",
  "Ghost Trick Phantom Detective": "ghost-trick-phantom-detective.png",
  "Danganronpa Trigger Happy Havoc": "danganronpa-trigger-happy-havoc.png",
};

export default function CinematicHero({ games = [] }) {
  
const slides = useMemo(() => {
  const base = import.meta.env.BASE_URL;

  return [...games]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .map((game) => {
      const backgroundFile = BACKGROUNDS[game.folderName];

      // Prefer the dedicated cinematic background.
      // Otherwise use the game's first screenshot.
      const backgroundUrl = backgroundFile
        ? `${base}background/${backgroundFile}`
        : game.screenshots?.[0] || game.coverImage;

      return {
        ...game,
        backgroundUrl,
      };
    })
    .filter((game) => Boolean(game.backgroundUrl));
}, [games]);


  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);

  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [pageHidden, setPageHidden] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (slides.length < 2) return;

      const next = ((index % slides.length) + slides.length) % slides.length;

      if (next === activeIndex) return;

      setPreviousIndex(activeIndex);
      setActiveIndex(next);
    },
    [activeIndex, slides.length],
  );

  // Stop automatic transitions in background tabs.
  useEffect(() => {
    const handleVisibility = () => {
      setPageHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    handleVisibility();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Automatic slideshow.
  useEffect(() => {
    if (paused || pageHidden || slides.length < 2) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      goTo(activeIndex + 1);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, goTo, pageHidden, paused, slides.length]);

  // Remove the old image layer after transition.
  useEffect(() => {
    if (previousIndex === null) return undefined;

    const timer = window.setTimeout(() => {
      setPreviousIndex(null);
    }, 1100);

    return () => window.clearTimeout(timer);
  }, [activeIndex, previousIndex]);

  // Preload the next background only.
  useEffect(() => {
    if (slides.length < 2) return;

    const next = new Image();

    next.src = slides[(activeIndex + 1) % slides.length].backgroundUrl;
  }, [activeIndex, slides]);

  const active = slides[activeIndex];

  const previous = previousIndex === null ? null : slides[previousIndex];

  const playing = !paused && !pageHidden;

  // Fallback while game data is being loaded.
  if (!active) {
    return (
      <section className={`${styles.hero} ${styles.emptyHero}`} dir="rtl">
        <div className={styles.inner}>
          <div className={styles.content}>
            <h1>ألعابك... الآن بالعربية</h1>

            <p>تصفح التعريبات العربية واكتشف لعبتك التالية.</p>

            <Link to="/translations" className={styles.primaryButton}>
              تصفح مكتبة التعريبات
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.hero}
      dir="rtl"
      aria-label="عرض الألعاب المتوفرة باللغة العربية"
      aria-roledescription="عرض شرائح"
    >
      {/* Previous cinematic background */}
      {previous && (
        <img
          className={styles.previousBackground}
          src={previous.backgroundUrl}
          alt=""
          aria-hidden="true"
        />
      )}

      {/* Current cinematic background */}
      <img
        key={active.folderName}
        className={styles.currentBackground}
        src={active.backgroundUrl}
        alt=""
        aria-hidden="true"
        fetchPriority={activeIndex === 0 ? "high" : "auto"}
        onAnimationEnd={() => setPreviousIndex(null)}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Main content */}
        <div className={styles.content}>
          <h1 className={styles.headline}>ألعابك... الآن بالعربية</h1>

          <div className={styles.gameDetails} key={active.folderName}>
            <h2 className={styles.gameTitle}>{active.title}</h2>

            <p className={styles.gameDescription}>{active.description}</p>
          </div>

          <div className={styles.actions}>
            <Link
              to={`/translations/${active.folderName}`}
              className={styles.primaryButton}
            >
              استعراض تعريب اللعبة
              <span aria-hidden="true">←</span>
            </Link>

            <Link to="/translations" className={styles.secondaryButton}>
              جميع التعريبات
            </Link>
          </div>
        </div>

        {/* Featured game poster */}
        <Link
          to={`/translations/${active.folderName}`}
          className={styles.posterLink}
          aria-label={`الانتقال إلى تعريب ${active.title}`}
        >
          <img
            key={active.coverImage}
            src={active.coverImage}
            alt={`غلاف ${active.title}`}
            className={styles.poster}
          />
        </Link>
      </div>

      {/* Cinematic slideshow controls */}
      <div className={styles.navigation}>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="اللعبة السابقة"
            title="السابق"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="اللعبة التالية"
            title="التالي"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={
              paused ? "تشغيل التبديل التلقائي" : "إيقاف التبديل التلقائي"
            }
            aria-pressed={paused}
            title={paused ? "تشغيل تلقائي" : "إيقاف مؤقت"}
          >
            {paused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="m8 5 11 7-11 7V5Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="7" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.progressPanel}>
          <span
            className={styles.counter}
            aria-label={`اللعبة ${activeIndex + 1} من ${slides.length}`}
          >
            <b>{String(activeIndex + 1).padStart(2, "0")}</b>

            <span aria-hidden="true">/</span>

            {String(slides.length).padStart(2, "0")}
          </span>

          <div className={styles.progressTrack} aria-hidden="true">
            <span
              key={active.folderName}
              className={styles.progressFill}
              style={{
                animationDuration: `${SLIDE_DURATION}ms`,
                animationPlayState: playing ? "running" : "paused",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
