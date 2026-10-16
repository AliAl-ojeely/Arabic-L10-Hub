import { useEffect, useState } from "react";
import styles from "./TrailerPlayer.module.css";

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function getYoutubeVideoId(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "https:") {
      return null;
    }

    const host = url.hostname.toLowerCase();
    let id = null;

    if (host === "youtu.be" || host === "www.youtu.be") {
      id = url.pathname.split("/")[1];
    } else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "www.youtube-nocookie.com",
        "youtube-nocookie.com",
      ].includes(host)
    ) {
      const parts = url.pathname.split("/").filter(Boolean);

      if (parts[0] === "watch") {
        id = url.searchParams.get("v");
      } else if (["embed", "shorts", "live"].includes(parts[0])) {
        id = parts[1];
      }
    }

    return id && VIDEO_ID_PATTERN.test(id) ? id : null;
  } catch {
    return null;
  }
}

export default function TrailerPlayer({ title, url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(url);
  
  
const fallbackThumbnail = (img) => {
  if (img.src.includes("/maxresdefault.jpg")) {
    img.src = `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
  } else if (img.src.includes("/sddefault.jpg")) {
    img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
};


  useEffect(() => {
    setIsPlaying(false);
  }, [videoId]);

  if (!videoId) {
    return null;
  }

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    "?autoplay=1&playsinline=1&rel=0";

  return (
    <section
      className={styles.section}
      aria-labelledby="game-trailer-title"
      dir="rtl"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="game-trailer-title">المقطع الدعائي للعبة</h2>
          <p>شاهد العرض الرسمي للعبة {title} مباشرة من YouTube.</p>
        </div>

        <div className={styles.player}>
          {isPlaying ? (
            <iframe
              className={styles.iframe}
              src={embedUrl}
              title={`المقطع الدعائي للعبة ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className={styles.previewButton}
              onClick={() => setIsPlaying(true)}
              aria-label={`تشغيل المقطع الدعائي للعبة ${title}`}
            >
              <img
                className={styles.thumbnail}
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                onError={(e) => {
                  fallbackThumbnail(e.currentTarget);
                }}
                onLoad={(e) => {
                  const img = e.currentTarget;

                  if (
                    img.src.includes("/maxresdefault.jpg") &&
                    img.naturalWidth < 640
                  ) {
                    fallbackThumbnail(img);
                  } else if (
                    img.src.includes("/sddefault.jpg") &&
                    img.naturalWidth < 320
                  ) {
                    fallbackThumbnail(img);
                  }
                }}
              />

              <span className={styles.playCircle}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
              </span>

              <span className={styles.playLabel}>تشغيل المقطع الدعائي</span>
            </button>
          )}
        </div>

        <a
          className={styles.youtubeLink}
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          مشاهدة المقطع على YouTube
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
      </div>
    </section>
  );
}
