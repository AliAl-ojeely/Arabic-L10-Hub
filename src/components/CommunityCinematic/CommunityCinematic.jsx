import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CommunityCinematic.module.css";

const SLIDE_DURATION = 7500;
const TRANSITION_DURATION = 900;
const imageCache = new Map();

// A failed image must never block slide navigation.
function prepareImage(src) {
  if (!src) return Promise.resolve(false);
  if (imageCache.has(src)) return imageCache.get(src);

  const image = new Image();
  image.decoding = "async";

  let promise;
  if (typeof image.decode === "function") {
    image.src = src;
    promise = image.decode().then(
      () => true,
      () => false,
    );
  } else {
    promise = new Promise((resolve) => {
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = src;
    });
  }

  imageCache.set(src, promise);
  promise.then((ok) => {
    if (!ok) imageCache.delete(src);
  });
  return promise;
}

export default function CommunityCinematic({ sites = [] }) {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const requestedRef = useRef(0);
  const requestIdRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState(null);
  const [pendingIndex, setPendingIndex] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );
  const [isPaused, setIsPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const count = sites.length;
  const currentIndex = Math.min(activeIndex, Math.max(0, count - 1));
  const active = sites[currentIndex];
  const outgoing = outgoingIndex === null ? null : sites[outgoingIndex];

  const isAutoplaying =
    count > 1 &&
    isInView &&
    isPageVisible &&
    !isPaused &&
    pendingIndex === null;

  useEffect(() => {
    requestIdRef.current += 1;
    activeRef.current = 0;
    requestedRef.current = 0;
    setActiveIndex(0);
    setOutgoingIndex(null);
    setPendingIndex(null);
    setImageFailed(false);
  }, [sites]);

  useEffect(() => {
    const update = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [count]);

  const select = useCallback(
    (index) => {
      if (count < 2) return;
      const target = ((index % count) + count) % count;
      const requestId = ++requestIdRef.current;
      requestedRef.current = target;

      if (target === activeRef.current) {
        setPendingIndex(null);
        return;
      }

      // Highlight the requested tab immediately. Keep the displayed content
      // consistent until the next image is decoded.
      setPendingIndex(target);
      prepareImage(sites[target].image).then((success) => {
        if (requestId !== requestIdRef.current) return;
        const old = activeRef.current;
        activeRef.current = target;
        setOutgoingIndex(old);
        setActiveIndex(target);
        setImageFailed(!success);
        setPendingIndex(null);
      });
    },
    [count, sites],
  );

  const next = () => select(requestedRef.current + 1);
  const previous = () => select(requestedRef.current - 1);

  useEffect(() => {
    if (!isAutoplaying) return undefined;
    const timer = window.setTimeout(
      () => select(activeRef.current + 1),
      SLIDE_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, isAutoplaying, select]);

  useEffect(() => {
    if (outgoingIndex === null) return undefined;
    const timer = window.setTimeout(
      () => setOutgoingIndex(null),
      TRANSITION_DURATION + 80,
    );
    return () => window.clearTimeout(timer);
  }, [activeIndex, outgoingIndex]);

  // Preload just the next site, and only when the section is near the viewport.
  useEffect(() => {
    if (!isInView || count < 2) return;
    prepareImage(sites[(currentIndex + 1) % count].image);
  }, [isInView, count, currentIndex, sites]);

  // Prevent late image requests from updating an unmounted component.
  useEffect(
    () => () => {
      requestIdRef.current += 1;
    },
    [],
  );

  if (!active) return null;

  const shownSelection = pendingIndex ?? currentIndex;

  return (
    <div className={styles.root} dir="rtl">
      <section
        ref={sectionRef}
        className={styles.showcase}
        aria-label="معرض مواقع التعريب العربي"
        aria-roledescription="عرض شرائح"
        aria-busy={pendingIndex !== null}
      >
        <div className={styles.backdrops} aria-hidden="true">
          {outgoing && (
            <img
              className={styles.previousBackdrop}
              src={outgoing.image}
              alt=""
              decoding="async"
            />
          )}
          {!imageFailed && (
            <img
              key={active.id}
              className={styles.currentBackdrop}
              src={active.image}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.main}>
          {/* Keep both descriptions briefly so their motion crossfades too. */}
          <div className={styles.contentStage}>
            {outgoing && (
              <div
                key={`outgoing-${outgoing.id}`}
                className={`${styles.content} ${styles.previousContent}`}
                aria-hidden="true"
              >
                <h3 className={styles.name}>{outgoing.name}</h3>
                <p className={styles.description}>{outgoing.description}</p>
                <span className={styles.visitButton}>
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
                </span>
              </div>
            )}
            <div
              key={`current-${active.id}`}
              className={`${styles.content} ${styles.currentContent}`}
              aria-live="off"
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
          </div>

          <a
            className={styles.artworkLink}
            href={active.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`زيارة موقع ${active.name}`}
          >
            <div className={styles.artworkFrame}>
              <span className={styles.artworkFallback}>{active.name}</span>
              {outgoing && (
                <img
                  className={styles.previousArtwork}
                  src={outgoing.image}
                  alt=""
                  decoding="async"
                />
              )}
              {!imageFailed && (
                <img
                  key={active.id}
                  className={styles.currentArtwork}
                  src={active.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    if (activeRef.current === currentIndex)
                      setImageFailed(true);
                  }}
                />
              )}
              {pendingIndex !== null && (
                <span className={styles.loadingHint} role="status">
                  جارٍ تجهيز الصورة…
                </span>
              )}
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
              aria-pressed={isPaused}
              aria-label={
                isPaused ? "تشغيل التنقل التلقائي" : "إيقاف التنقل التلقائي"
              }
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

      <nav className={styles.sitePicker} aria-label="اختر أحد مواقع التعريب">
        {sites.map((site, index) => (
          <button
            key={site.id}
            type="button"
            className={`${styles.siteTab} ${index === shownSelection ? styles.activeTab : ""}`}
            onClick={() => select(index)}
            aria-pressed={index === shownSelection}
          >
            {site.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
