import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CinematicHero.module.css";

const SLIDE_DURATION = 8000;
const BASE = import.meta.env.BASE_URL;

// Exact folder names from dataLoader.js -> original background filename.
const BACKGROUNDS = {
  "Partisans 1941": "partisans-1941.webp",
  "Hollow Knight Silksong": "hollow-knight-silksong.webp",
  "Gothic 1 Remake": "gothic-1-remake.webp",
  "SpongeBob SquarePants Titans of the Tide":
    "spongebob-squarepants-titans-of-the-tide.webp",
  "The Mound - Omen of Cthulhu": "the-mound-omen-of-cthulhu.webp",
  "Eriksholm - The Stolen Dream": "eriksholm-the-stolen-dream.webp",
  "This Bed We Made": "this-bed-we-made.webp",
  "Beast of Reincarnation": "beast-of-reincarnation.webp",
  "Lost & Found - A This Bed We Made Story":
    "lost-found-a-this-bed-we-made-story.webp",
  "Grounded 2": "grounded-2.webp",
  "Men of War": "men-of-war.webp",
  "Jagged Alliance 3": "jagged-alliance-3.webp",
  "Help Will Come Tomorrow": "help-will-come-tomorrow.webp",
  "All Quiet in the Trenches": "all-quiet-in-the-trenches.webp",
  Banished: "banished.webp",
  "Phoenix Wright Ace Attorney Trilogy":
    "phoenix-wright-ace-attorney-trilogy.webp",
  "Have a Nice Death": "have-a-nice-death.webp",
  "Laika Aged Through Blood": "laika-aged-through-blood.webp",
  "Enderal Forgotten Stories": "enderal-forgotten-stories.webp",
  "Ghost Trick Phantom Detective": "ghost-trick-phantom-detective.webp",
  "Danganronpa Trigger Happy Havoc": "danganronpa-trigger-happy-havoc.webp",
};

// The mobile file is portrait-cropped; desktop uses width-based srcSet.
function getSource(slide, portrait, useOriginal = false) {
  if (!slide?.optimizedStem || useOriginal) {
    return { src: slide?.backgroundUrl ?? "" };
  }

  const prefix = `${BASE}background/optimized/${slide.optimizedStem}`;
  if (portrait) {
    return { src: `${prefix}-mobile.webp` };
  }

  return {
    src: `${prefix}-1920.webp`,
    srcSet: [
      `${prefix}-960.webp 960w`,
      `${prefix}-1440.webp 1440w`,
      `${prefix}-1920.webp 1920w`,
    ].join(", "),
    sizes: "100vw",
  };
}

function loadDecoded(source) {
  const image = new Image();
  image.decoding = "async";
  if (source.sizes) image.sizes = source.sizes;
  if (source.srcSet) image.srcSet = source.srcSet;
  image.src = source.src;
  return image.decode();
}

export default function CinematicHero({ games = [] }) {
  const heroRef = useRef(null);
  const preloadRef = useRef(null);
  const slides = useMemo(
    () =>
      [...games]
        .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
        .map((game) => {
          const file = BACKGROUNDS[game.folderName];
          return {
            ...game,
            backgroundUrl: file
              ? `${BASE}background/${file}`
              : game.screenshots?.[0] || game.coverImage,
            optimizedStem: file ? file.replace(/\.webp$/i, "") : null,
          };
        })
        .filter((game) => Boolean(game.backgroundUrl)),
    [games],
  );

  const [requestedIndex, setRequestedIndex] = useState(0);
  const [display, setDisplay] = useState({ index: 0, previous: null });
  const [failedOptimization, setFailedOptimization] = useState({});
  const [portrait, setPortrait] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 680px) and (orientation: portrait)")
        .matches,
  );
  const [showPoster, setShowPoster] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 681px) and (min-height: 551px)").matches,
  );
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [pageHidden, setPageHidden] = useState(
    () => typeof document !== "undefined" && document.hidden,
  );
  const [inView, setInView] = useState(true);

  // Keep responsive image selection in sync with orientation and viewport.
  useEffect(() => {
    const mobileQuery = window.matchMedia(
      "(max-width: 680px) and (orientation: portrait)",
    );
    const posterQuery = window.matchMedia(
      "(min-width: 681px) and (min-height: 551px)",
    );
    const update = () => {
      setPortrait(mobileQuery.matches);
      setShowPoster(posterQuery.matches);
    };
    mobileQuery.addEventListener("change", update);
    posterQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      posterQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const update = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Avoid image downloads and autoplay when the Hero is off-screen.
  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Only switch the visible slide AFTER the selected image has decoded.
  // Cancelling stale requests handles rapid next/previous clicks safely.
  useEffect(() => {
    if (!slides.length || requestedIndex === display.index) return;
    const slide = slides[requestedIndex];
    if (!slide) return;

    let cancelled = false;
    const prepare = async () => {
      const source = getSource(
        slide,
        portrait,
        failedOptimization[slide.folderName],
      );
      try {
        await loadDecoded(source);
      } catch {
        // If optimized files were not generated or a request fails,
        // use the original image instead of showing an empty slide.
        if (!cancelled) {
          setFailedOptimization((prev) => ({
            ...prev,
            [slide.folderName]: true,
          }));
        }
        try {
          await loadDecoded({ src: slide.backgroundUrl });
        } catch {
          return;
        }
      }
      if (!cancelled) {
        setDisplay((current) =>
          current.index === requestedIndex
            ? current
            : { index: requestedIndex, previous: current.index },
        );
      }
    };
    prepare();
    return () => {
      cancelled = true;
    };
  }, [requestedIndex, display.index, slides, portrait, failedOptimization]);

  // Let the old image remain visible throughout the crossfade.
  useEffect(() => {
    if (display.previous === null) return;
    const timer = window.setTimeout(() => {
      setDisplay((current) => ({ ...current, previous: null }));
    }, 950);
    return () => window.clearTimeout(timer);
  }, [display.index, display.previous]);

  // A single autoplay timer starts after each image is on-screen.
  useEffect(() => {
    if (
      paused ||
      pageHidden ||
      !inView ||
      slides.length < 2 ||
      requestedIndex !== display.index
    )
      return;
    const timer = window.setTimeout(() => {
      setRequestedIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [
    display.index,
    requestedIndex,
    paused,
    pageHidden,
    inView,
    slides.length,
  ]);

  // Warm only the NEXT image in the browser cache, after the current slide settles.
  useEffect(() => {
    if (slides.length < 2 || pageHidden || !inView) return;
    const timer = window.setTimeout(() => {
      const next = slides[(display.index + 1) % slides.length];
      if (next) {
        const source = getSource(
          next,
          portrait,
          failedOptimization[next.folderName],
        );
        const image = new Image();
        image.decoding = "async";
        if (source.sizes) image.sizes = source.sizes;
        if (source.srcSet) image.srcSet = source.srcSet;
        image.src = source.src;
        preloadRef.current = image;
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [display.index, slides, portrait, pageHidden, inView, failedOptimization]);

  const change = (direction) => {
    if (slides.length < 2) return;
    setRequestedIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  const active = slides[display.index];
  const previous = display.previous === null ? null : slides[display.previous];
  const activeSource = getSource(
    active,
    portrait,
    active && failedOptimization[active.folderName],
  );
  const previousSource = getSource(
    previous,
    portrait,
    previous && failedOptimization[previous.folderName],
  );
  const playing =
    !paused && !pageHidden && inView && requestedIndex === display.index;

  if (!active) {
    return (
      <section
        ref={heroRef}
        className={`${styles.hero} ${styles.emptyHero}`}
        dir="rtl"
      >
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
      ref={heroRef}
      className={styles.hero}
      dir="rtl"
      aria-label="عرض الألعاب المتوفرة باللغة العربية"
      aria-roledescription="عرض شرائح"
    >
      {previous && (
        <img
          className={styles.previousBackground}
          {...previousSource}
          alt=""
          aria-hidden="true"
        />
      )}
      <img
        key={`${active.folderName}-${activeSource.src}`}
        className={styles.currentBackground}
        {...activeSource}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority={display.index === 0 ? "high" : "auto"}
        onError={() =>
          setFailedOptimization((prev) =>
            prev[active.folderName]
              ? prev
              : { ...prev, [active.folderName]: true },
          )
        }
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
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
              استعراض تعريب اللعبة <span aria-hidden="true">←</span>
            </Link>
            <Link to="/translations" className={styles.secondaryButton}>
              جميع التعريبات
            </Link>
          </div>
        </div>

        {showPoster && (
          <Link
            to={`/translations/${active.folderName}`}
            className={styles.posterLink}
            aria-label={`الانتقال إلى تعريب ${active.title}`}
          >
            <img
              src={active.coverImage}
              alt={`غلاف ${active.title}`}
              className={styles.poster}
              fetchPriority="low"
              loading="lazy"
              decoding="async"
            />
          </Link>
        )}
      </div>

      <div className={styles.navigation}>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => change(-1)}
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
            onClick={() => change(1)}
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
            aria-label={`اللعبة ${display.index + 1} من ${slides.length}`}
          >
            <b>{String(display.index + 1).padStart(2, "0")}</b>
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
