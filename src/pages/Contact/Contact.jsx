import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.header}>
                <h1>تواصل معي</h1>
                <p>نرحب بجميع استفساراتكم وملاحظاتكم</p>
            </div>

            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </div>

                <h2>عبر البريد الإلكتروني</h2>
                <p>
                    حالياً، وسيلة التواصل الأساسية المتاحة هي عبر البريد الإلكتروني. أقوم بمتابعة الرسائل بشكل دوري للرد على استفساراتكم، المساعدة في مشاكل التثبيت، أو استقبال اقتراحاتكم للألعاب القادمة.
                </p>

                <a href="mailto:alialojeely@gmail.com" className={styles.contactButton}>
                    إرسال رسالة (Gmail)
                </a>

                <div className={styles.futureNotice}>
                    <span className={styles.badge}>قريباً</span>
                    <p>بإذن الله، سيتم التوسع وتوفير قنوات تواصل إضافية وحسابات مخصصة على منصات التواصل الاجتماعي مستقبلاً لتسهيل التفاعل المباشر.</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;