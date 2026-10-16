import { useEffect, useRef, useState } from "react";
import styles from "./CommunityCinematic.module.css";

const SLIDE_DURATION = 7500;

export default function CommunityCinematic({ sites = [] }) {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  const [isPaused, setIsPaused] = useState(() => {
    if (typeof window === "undefined") return true;

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const count = sites.length;

  const isAutoplaying =
    count > 1 &&
    !isPaused &&
    !isHovered &&
    !hasFocus &&
    isInView &&
    isPageVisible;

  // Pause when the browser tab is not visible.
  useEffect(() => {
    const updateVisibility = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  // Pause automatic changes when the section is offscreen.
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Single timer; reset after every manual or automatic change.
  useEffect(() => {
    if (!isAutoplaying) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeIndex, count, isAutoplaying]);

  // Functional state updates prevent stale-index navigation.
  const next = () => {
    if (count < 2) return;

    setActiveIndex((current) => (current + 1) % count);
  };

  const previous = () => {
    if (count < 2) return;

    setActiveIndex((current) => (current - 1 + count) % count);
  };

  const select = (index) => {
    if (index < 0 || index >= count) return;
    setActiveIndex(index);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHasFocus(false);
    }
  };

  if (count === 0) return null;

  const currentIndex = Math.min(activeIndex, count - 1);
  const active = sites[currentIndex];

  return (
    <div className={styles.root}>
      <section
        ref={sectionRef}
        className={styles.showcase}
        dir="rtl"
        aria-label="معرض مواقع التعريب العربي"
        aria-roledescription="عرض شرائح"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            setIsHovered(true);
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setIsHovered(false);
          }
        }}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={handleBlur}
      >
        {/* Stable background layers: no remount on navigation */}
        <div className={styles.backdrops} aria-hidden="true">
          {sites.map((site, index) => (
            <img
              key={site.id}
              src={site.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={`${styles.backdrop} ${
                index === currentIndex ? styles.visibleBackdrop : ""
              }`}
            />
          ))}
        </div>

        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.main}>
          <div
            className={styles.content}
            aria-live={isAutoplaying ? "off" : "polite"}
            aria-atomic="true"
          >
            <h3 className={styles.name}>{active.name}</h3>

            <p className={styles.description}>{active.description}</p>

            <a
              className={styles.visitButton}
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              زيارة الموقع
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          </div>

          {/* Logos stay mounted and crossfade safely */}
          <a
            className={styles.artworkLink}
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`زيارة موقع ${active.name}`}
          >
            <div className={styles.artworkFrame}>
              {sites.map((site, index) => (
                <img
                  key={site.id}
                  src={site.image}
                  alt={index === currentIndex ? `شعار ${site.name}` : ""}
                  loading="lazy"
                  decoding="async"
                  className={`${styles.artwork} ${
                    index === currentIndex ? styles.visibleArtwork : ""
                  }`}
                />
              ))}
            </div>
          </a>
        </div>

        <div className={styles.bottomBar}>
          <div
            className={styles.controls}
            role="group"
            aria-label="التحكم في المواقع"
          >
            <button
              type="button"
              onClick={previous}
              disabled={count < 2}
              aria-label="الموقع السابق"
              title="السابق"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              disabled={count < 2}
              aria-label="الموقع التالي"
              title="التالي"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((value) => !value)}
              disabled={count < 2}
              aria-label={
                isPaused ? "تشغيل التنقل التلقائي" : "إيقاف التنقل التلقائي"
              }
              aria-pressed={isPaused}
              title={isPaused ? "تشغيل تلقائي" : "إيقاف مؤقت"}
            >
              {isPaused ? (
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

          <div className={styles.progressTrack} aria-hidden="true">
            <span
              key={active.id}
              className={styles.progressFill}
              style={{
                animationDuration: `${SLIDE_DURATION}ms`,
                animationPlayState: isAutoplaying ? "running" : "paused",
              }}
            />
          </div>
        </div>
      </section>

      {/* Direct site selection without transition locks */}
      <nav
        className={styles.sitePicker}
        aria-label="اختر أحد مواقع التعريب"
        dir="rtl"
      >
        {sites.map((site, index) => (
          <button
            key={site.id}
            type="button"
            className={`${styles.siteTab} ${
              index === currentIndex ? styles.activeTab : ""
            }`}
            onClick={() => select(index)}
            aria-pressed={index === currentIndex}
          >
            {site.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
