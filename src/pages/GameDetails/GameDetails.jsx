import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { fetchTranslationsData } from "../../services/dataLoader";
import styles from "./GameDetails.module.css";

const MIN_SWIPE_DISTANCE = 50;

const GameDetails = () => {
  const { folderName } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadGameDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const allGames = await fetchTranslationsData();

        const foundGame = allGames.find(
          (item) => item.folderName === folderName,
        );

        if (!cancelled) {
          setGame(foundGame ?? null);
        }
      } catch (err) {
        console.error("Failed to load game details:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadGameDetails();

    return () => {
      cancelled = true;
    };
  }, [folderName]);

  const screenshots = game?.screenshots ?? [];

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsPlaying(false);
    setTouchStart(null);
    setTouchEnd(null);
  }, []);

  const nextImage = useCallback(() => {
    if (screenshots.length === 0) {
      return;
    }

    setCurrentIndex((current) =>
      current >= screenshots.length - 1 ? 0 : current + 1,
    );
  }, [screenshots.length]);

  const prevImage = useCallback(() => {
    if (screenshots.length === 0) {
      return;
    }

    setCurrentIndex((current) =>
      current <= 0 ? screenshots.length - 1 : current - 1,
    );
  }, [screenshots.length]);

  const onTouchStart = (event) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      return;
    }

    const distance = touchStart - touchEnd;

    if (distance > MIN_SWIPE_DISTANCE) {
      nextImage();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isPlaying || !isModalOpen || screenshots.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, isModalOpen, screenshots.length, nextImage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) {
        return;
      }

      if (event.key === "ArrowLeft") {
        nextImage();
      }

      if (event.key === "ArrowRight") {
        prevImage();
      }

      if (event.key === "Escape") {
        closeModal();
      }

      if (event.key === " ") {
        event.preventDefault();

        if (screenshots.length > 1) {
          setIsPlaying((current) => !current);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, screenshots.length, nextImage, prevImage, closeModal]);

  if (loading) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.loadingPage}>
          <div className={styles.loadingPoster} />

          <div className={styles.loadingContent}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.stateContainer}>
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

          <h1>تعذر تحميل بيانات اللعبة</h1>

          <p>حدث خطأ أثناء قراءة بيانات التعريب. حاول تحديث الصفحة مرة أخرى.</p>

          <button
            type="button"
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </button>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.stateContainer}>
          <div className={styles.stateIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 9a3 3 0 1 1 5.2 2c-.9.8-2.2 1.4-2.2 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          <h1>اللعبة غير موجودة</h1>

          <p>لم نتمكن من العثور على صفحة التعريب المطلوبة.</p>

          <Link to="/translations" className={styles.retryButton}>
            العودة إلى التعريبات
          </Link>
        </div>
      </main>
    );
  }

  const {
    title,
    description,
    releaseYear,
    translator,
    appVersion,
    installationSteps = [],
    downloadUrl,
    nexusModsUrl,
    coverImage,
  } = game;

  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />

        <div className={styles.heroInner}>
          <div className={styles.topNavigation}>
            <Link to="/translations" className={styles.backLink}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>

              <span>العودة إلى مكتبة التعريبات</span>
            </Link>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.posterColumn}>
              <div className={styles.posterWrapper}>
                <img
                  src={coverImage}
                  alt={`غلاف لعبة ${title}`}
                  className={styles.posterImage}
                />

                <div className={styles.posterShine} />

                <span className={styles.posterBadge}>تعريب عربي</span>
              </div>

              {screenshots.length > 0 && (
                <button
                  type="button"
                  className={styles.galleryShortcut}
                  onClick={() => openModal(0)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>

                  <span>{screenshots.length} صور من داخل التعريب</span>
                </button>
              )}
            </div>

            <div className={styles.heroContent}>
              <div className={styles.heroEyebrow}>
                <span className={styles.statusDot} />
                متوفر للتحميل
              </div>

              <div className={styles.titleRow}>
                <h1 className={styles.gameTitle}>{title}</h1>

                {releaseYear && (
                  <span className={styles.releaseYear}>{releaseYear}</span>
                )}
              </div>

              <p className={styles.description}>{description}</p>

              <div className={styles.metaGrid}>
                <div className={styles.metaCard}>
                  <div className={styles.metaIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>

                  <div>
                    <span>المُعرّب</span>

                    <strong>{translator || "غير محدد"}</strong>
                  </div>
                </div>

                <div className={styles.metaCard}>
                  <div className={styles.metaIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M3 10h18" />
                    </svg>
                  </div>

                  <div>
                    <span>سنة الإصدار</span>

                    <strong>{releaseYear || "غير محدد"}</strong>
                  </div>
                </div>

                <div className={styles.metaCard}>
                  <div className={styles.metaIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="m16 5 3 3" />
                      <path d="M14 10 21 3" />
                    </svg>
                  </div>

                  <div>
                    <span>النسخة المتوافقة</span>

                    <strong dir="ltr">{appVersion || "—"}</strong>
                  </div>
                </div>
              </div>

              {(downloadUrl || nexusModsUrl) && (
                <div className={styles.actionButtons}>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadButton}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 3v12" />
                        <path d="m7 10 5 5 5-5" />
                        <path d="M5 21h14" />
                      </svg>

                      <span>تحميل التعريب</span>
                    </a>
                  )}

                  {nexusModsUrl && (
                    <a
                      href={nexusModsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.nexusButton}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 3h7v7" />
                        <path d="M10 14 21 3" />
                        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                      </svg>

                      <span>صفحة Nexus Mods</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <div className={styles.contentHeader}>
            <span className={styles.sectionEyebrow}>دليل الاستخدام</span>

            <h2>عن التعريب والتثبيت</h2>

            <p>
              اقرأ معلومات التعريب وخطوات التثبيت قبل تحميل الملفات وتشغيلها.
            </p>
          </div>

          <div className={styles.detailsGrid}>
            <article className={styles.infoPanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>

                <div>
                  <span>معلومات</span>
                  <h3>عن اللعبة والتعريب</h3>
                </div>
              </div>

              <p>{description}</p>
            </article>

            {installationSteps.length > 0 && (
              <article className={styles.installPanel}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelIcon}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>

                  <div>
                    <span>خطوة بخطوة</span>

                    <h3>طريقة التثبيت</h3>
                  </div>
                </div>

                <ol className={styles.installList}>
                  {installationSteps.map((step, index) => (
                    <li key={`${index}-${step}`}>
                      <span className={styles.stepNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </article>
            )}
          </div>
        </div>
      </section>

      {screenshots.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryInner}>
            <div className={styles.galleryHeader}>
              <div>
                <span className={styles.sectionEyebrow}>معرض الصور</span>

                <h2>صور من داخل التعريب</h2>

                <p>اضغط على أي صورة لعرضها بالحجم الكامل والتنقل بين الصور.</p>
              </div>

              <div className={styles.galleryCount}>
                <strong>{screenshots.length}</strong>
                <span>صور</span>
              </div>
            </div>

            <div className={styles.thumbnailsGrid}>
              {screenshots.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={styles.thumbnailWrapper}
                  onClick={() => openModal(index)}
                  aria-label={`فتح الصورة ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`صورة من تعريب ${title} رقم ${index + 1}`}
                    loading="lazy"
                  />

                  <div className={styles.thumbnailOverlay}>
                    <div className={styles.zoomButton}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                        <path d="M11 8v6" />
                        <path d="M8 11h6" />
                      </svg>
                    </div>

                    <span>عرض الصورة</span>
                  </div>

                  <span className={styles.thumbnailNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {isModalOpen &&
        createPortal(
          <div
            className={styles.modalOverlay}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`معرض صور ${title}`}
          >
            <div
              className={styles.modalTopBar}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.modalTitle}>
                <strong>{title}</strong>

                <span>
                  {currentIndex + 1} من {screenshots.length}
                </span>
              </div>

              <div className={styles.modalActions}>
                {screenshots.length > 1 && (
                  <button
                    type="button"
                    className={`${styles.modalActionButton} ${
                      isPlaying ? styles.activePlay : ""
                    }`}
                    onClick={() => setIsPlaying((current) => !current)}
                    title="تشغيل تلقائي"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="m8 5 11 7-11 7Z" />
                      </svg>
                    )}

                    <span>{isPlaying ? "إيقاف" : "تلقائي"}</span>
                  </button>
                )}

                <button
                  type="button"
                  className={styles.modalCloseButton}
                  onClick={closeModal}
                  aria-label="إغلاق"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.rightButton}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    prevImage();
                  }}
                  aria-label="الصورة السابقة"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`${styles.navButton} ${styles.leftButton}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    nextImage();
                  }}
                  aria-label="الصورة التالية"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              </>
            )}

            <div
              className={styles.modalImageContainer}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={screenshots[currentIndex]}
                alt={`عرض مكبر لصورة ${currentIndex + 1} من ${title}`}
                className={styles.fullImage}
                draggable="false"
              />

              {screenshots.length > 1 && (
                <div className={styles.mobileSwipeHint}>
                  اسحب للتنقل بين الصور
                </div>
              )}
            </div>

            <div
              className={styles.modalProgress}
              onClick={(event) => event.stopPropagation()}
            >
              {screenshots.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${styles.progressDot} ${
                    index === currentIndex ? styles.activeProgressDot : ""
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsPlaying(false);
                  }}
                  aria-label={`الانتقال إلى الصورة ${index + 1}`}
                />
              ))}
            </div>
          </div>,
          document.body,
        )}
    </main>
  );
};

export default GameDetails;
