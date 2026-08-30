import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.header}>
        <h1>تواصل معي</h1>
        <p>
          للاستفسارات، الدعم الفني، اقتراحات التعريب، أو متابعة أحدث المشاريع
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
          </svg>
        </div>

        <h2>سيرفر Discord</h2>

        <p>
          انضم إلى سيرفر Discord للتواصل المباشر، متابعة أخبار التعريبات،
          الإبلاغ عن المشاكل، طلب المساعدة في التثبيت، ومناقشة مشاريع التعريب
          القادمة.
        </p>

        <a
          href="https://discord.gg/THPYXggyz"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          الانضمام إلى سيرفر Discord
        </a>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <h2>البريد الإلكتروني</h2>

        <p>
          يمكنك أيضًا التواصل عبر البريد الإلكتروني للاستفسارات الرسمية، الإبلاغ
          عن المشاكل، أو إرسال المقترحات المتعلقة بالموقع ومشاريع التعريب.
        </p>

        <a href="mailto:alialojeely@gmail.com" className={styles.contactButton}>
          إرسال رسالة عبر Gmail
        </a>
      </div>
    </div>
  );
};

export default Contact;
