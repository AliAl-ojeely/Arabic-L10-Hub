import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>تواصل معي</h1>

          <p className={styles.heroDescription}>
            للاستفسارات، الدعم الفني، الإبلاغ عن المشاكل، اقتراحات التعريب أو
            متابعة أحدث المشاريع.
          </p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2>اختر الطريقة المناسبة لك</h2>

            <p>
              إذا كنت تحتاج إلى دعم سريع أو ترغب في مناقشة مشروع تعريب، فإن
              Discord هو الخيار الأفضل. أما الرسائل الرسمية والمقترحات الطويلة
              فيمكن إرسالها عبر البريد الإلكتروني.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <article className={`${styles.contactCard} ${styles.discordCard}`}>
              <div className={styles.cardTop}>
                <div className={`${styles.iconWrapper} ${styles.discordIcon}`}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
                  </svg>
                </div>

                <span className={styles.recommendedBadge}>الخيار المفضل</span>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardEyebrow}>تواصل مباشر</span>

                <h2>سيرفر Discord</h2>

                <p>
                  انضم إلى سيرفر Discord للتواصل المباشر، متابعة أخبار
                  التعريبات، الإبلاغ عن المشاكل، طلب المساعدة في التثبيت ومناقشة
                  المشاريع القادمة.
                </p>
              </div>

              <div className={styles.featureList}>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>دعم ومساعدة مباشرة</span>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>آخر أخبار التعريبات</span>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>اقتراح ألعاب ومشاريع جديدة</span>
                </div>
              </div>

              <a
                href="https://discord.gg/THPYXggyz"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactButton} ${styles.discordButton}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
                </svg>

                <span>الانضمام إلى Discord</span>

                <svg
                  className={styles.buttonArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </a>
            </article>

            <article className={styles.contactCard}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
              </div>

              <div className={styles.cardContent}>
                <span className={styles.cardEyebrow}>تواصل رسمي</span>

                <h2>البريد الإلكتروني</h2>

                <p>
                  مناسب للرسائل الطويلة، المقترحات التفصيلية، الاستفسارات
                  الرسمية أو إرسال معلومات تتعلق بمشكلة تحتاج إلى شرح أكبر.
                </p>
              </div>

              <div className={styles.featureList}>
                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>المقترحات التفصيلية</span>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>الاستفسارات الرسمية</span>
                </div>

                <div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                  <span>إرسال تفاصيل المشاكل</span>
                </div>
              </div>

              <a
                href="mailto:alialojeely@gmail.com"
                className={styles.contactButton}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>

                <span>إرسال رسالة عبر Gmail</span>

                <svg
                  className={styles.buttonArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
              </a>
            </article>
          </div>

          <div className={styles.helpPanel}>
            <div className={styles.helpIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />

                <path d="M9.1 9a3 3 0 1 1 5.8 1c-.8 1.1-2.9 1.6-2.9 3" />

                <path d="M12 17h.01" />
              </svg>
            </div>

            <div>
              <span className={styles.helpEyebrow}>قبل التواصل</span>

              <h3>عند الإبلاغ عن مشكلة في أحد التعريبات</h3>

              <p>
                حاول ذكر اسم اللعبة، إصدار اللعبة المستخدم، وصف المشكلة، وأرفق
                صورة للخطأ إن أمكن. هذه المعلومات تساعد كثيرًا في الوصول إلى سبب
                المشكلة بصورة أسرع.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
