import { useEffect, useState } from "react";
import styles from "./ScrollToTopButton.module.css";

const SHOW_AFTER_PX = 360;

/** One floating button for every route, mounted once from App.jsx. */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateVisibility = () => {
      frameId = 0;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    const onScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateVisibility);
      }
    };

    // Covers refresh / browser scroll restoration on a scrolled page.
    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
      disabled={!visible}
      aria-label="العودة إلى أعلى الصفحة"
      title="العودة إلى أعلى الصفحة"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 12 6-6 6 6" />
        <path d="M12 6v12" />
      </svg>
    </button>
  );
}
