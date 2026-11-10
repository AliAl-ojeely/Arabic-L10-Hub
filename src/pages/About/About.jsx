import styles from "./About.module.css";

const About = () => {
  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>عن المشروع</h1>

          <p className={styles.heroDescription}>
            تعرف على القصة والرؤية والأهداف التي تقف خلف
            <span className={styles.inlineBrand}>
              Arabic L10 <strong>Hub</strong>
            </span>
            ، والمنهج الذي أتبعه في تعريب الألعاب وحفظ مشاريع المجتمع العربي.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <strong>100%</strong>
              <span>مشروع مجاني</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <strong>0</strong>
              <span>إعلانات</span>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <strong>∞</strong>
              <span>طموح مستمر</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.sectionInner}>
          <div className={styles.introGrid}>
            <article className={styles.profileCard}>
              <div className={styles.profileIcon}>
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

              <h2>من هو علي العجيلي؟</h2>

              <p>
                مطور برمجيات متخصص في تطوير واجهات المستخدم وتطبيقات سطح المكتب،
                وحاصل على درجة البكالوريوس في تقنية المعلومات من جامعة العلوم
                والتكنولوجيا.
              </p>

              <p>
                أمتلك شغفًا كبيرًا بهندسة الألعاب، وتعديلها واستخراج أصولها
                البرمجية وتحليل بنيتها، مع التركيز بشكل خاص على تعريب وتوطين
                الألعاب لتقديم تجربة أفضل وأكثر قربًا للاعب العربي.
              </p>

              <div className={styles.skillTags}>
                <span>Software Development</span>
                <span>Game Modding</span>
                <span>Localization</span>
                <span>Reverse Engineering</span>
              </div>
            </article>

            <div className={styles.introAside}>
              <div className={styles.quoteCard}>
                <svg
                  className={styles.quoteIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h7v-7H5.08A2.08 2.08 0 0 1 7.17 9H10V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V18h7v-7h-3.92A2.08 2.08 0 0 1 17.17 9H20V6h-2.83Z" />
                </svg>

                <p>
                  الهدف ليس ترجمة الكلمات فقط، بل تقديم تجربة عربية تحافظ على
                  روح اللعبة وسياقها وتكون مريحة للاعب قدر الإمكان.
                </p>
              </div>

              <div className={styles.miniCards}>
                <div className={styles.miniCard}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3v18" />
                    <path d="m17 8-5-5-5 5" />
                  </svg>

                  <div>
                    <strong>تطوير مستمر</strong>
                    <span>أدوات وأساليب جديدة مع كل مشروع.</span>
                  </div>
                </div>

                <div className={styles.miniCard}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>

                  <div>
                    <strong>استقلالية كاملة</strong>
                    <span>
                      حفظ المشاريع بعيدًا عن الاعتماد الكامل على المنصات
                      الخارجية.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2>من أرشيف شخصي إلى منصة مستقلة</h2>

            <p>
              جاءت فكرة المنصة من حاجة حقيقية إلى مكان موثوق يحفظ مشاريع التعريب
              ويجعلها متاحة لفترة طويلة دون الاعتماد الكامل على خدمة خارجية
              واحدة.
            </p>
          </div>

          <div className={styles.storyGrid}>
            <article className={styles.storyCard}>
              <div className={styles.storyNumber}>01</div>

              <div className={styles.storyIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                </svg>
              </div>

              <h3>حفظ التعريبات</h3>

              <p>
                توفير أرشيف منظم يساعد على إبقاء ملفات التعريب والمعلومات
                المرتبطة بها متاحة حتى مع تغير أو توقف خدمات الاستضافة الخارجية.
              </p>
            </article>

            <article className={styles.storyCard}>
              <div className={styles.storyNumber}>02</div>

              <div className={styles.storyIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
                </svg>
              </div>

              <h3>مساحة مستقلة</h3>

              <p>
                عدم ربط مستقبل المشروع بالكامل بمنصة واحدة مثل Nexus Mods أو
                غيرها، مع الاستمرار في الاستفادة منها كقنوات إضافية للنشر.
              </p>
            </article>

            <article className={styles.storyCard}>
              <div className={styles.storyNumber}>03</div>

              <div className={styles.storyIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <h3>خدمة المجتمع</h3>

              <p>
                بناء مساحة يمكن أن تتوسع مستقبلًا لدعم معربين مستقلين آخرين،
                وتسهيل الوصول إلى أعمالهم وحفظ جهودهم.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.visionSection}>
        <div className={styles.sectionInner}>
          <div className={styles.visionGrid}>
            <div className={styles.visionContent}>
              <h2>أكثر من مجرد مكتبة تحميل</h2>

              <p>
                أطمح أن تتطور
                <span className={styles.inlineBrand}>
                  Arabic L10 <strong>Hub</strong>
                </span>
                إلى بيئة تعاونية تجمع المعربين المستقلين والمطورين والمهتمين
                بهندسة الألعاب.
              </p>

              <p>
                الهدف هو الوصول إلى مشاريع تعريب أكثر احترافية، تعتمد على صياغة
                عربية طبيعية وفهم سياق اللعبة بدل الترجمة الحرفية، مع تطوير
                أدوات تساعد على تسريع عملية التعريب وتحسين جودتها.
              </p>
            </div>

            <div className={styles.visionList}>
              <div className={styles.visionItem}>
                <span>01</span>

                <div>
                  <strong>تعاون بين المعربين</strong>

                  <p>تبادل الخبرات والأدوات والتجارب بين أفراد المجتمع.</p>
                </div>
              </div>

              <div className={styles.visionItem}>
                <span>02</span>

                <div>
                  <strong>أدوات أفضل</strong>

                  <p>تطوير أدوات تسهل استخراج النصوص وترجمتها وإعادة دمجها.</p>
                </div>
              </div>

              <div className={styles.visionItem}>
                <span>03</span>

                <div>
                  <strong>تثبيت أبسط</strong>

                  <p>توفير حزم Mods واضحة وسهلة التثبيت قدر الإمكان.</p>
                </div>
              </div>

              <div className={styles.visionItem}>
                <span>04</span>

                <div>
                  <strong>جودة لغوية أعلى</strong>

                  <p>
                    التركيز على السياق والصياغة وتجربة اللاعب بدل النقل الحرفي.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.transparencySection}>
        <div className={styles.sectionInner}>
          <div className={styles.transparencyCard}>
            <div className={styles.transparencyIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div className={styles.transparencyContent}>
              <h2>المشروع مجاني وغير ربحي بالكامل</h2>

              <p>
                لا توجد إعلانات مزعجة، ولا روابط تحميل ربحية مختصرة، ولا بوابات
                دفع. الهدف الأساسي من المنصة هو خدمة مجتمع اللاعبين العرب
                والحفاظ على مشاريع التعريب.
              </p>

              <p>
                تم تصميم الموقع ليكون خفيفًا ويعمل كموقع ثابت، ويتم استضافته عبر
                <strong> GitHub Pages</strong>، مما يقلل تكاليف التشغيل ويساعد
                على استمرار المنصة دون الحاجة إلى خادم شهري مدفوع.
              </p>
            </div>

            <div className={styles.transparencyFacts}>
              <div>
                <strong>0</strong>
                <span>إعلانات</span>
              </div>

              <div>
                <strong>0</strong>
                <span>روابط ربحية</span>
              </div>

              <div>
                <strong>Free</strong>
                <span>الوصول للمحتوى</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.verificationSection}
        id="ma3rab-verification"
        aria-labelledby="ma3rab-verification-title"
      >
        <div className={styles.sectionInner}>
          <article className={styles.verificationCard}>
            <div className={styles.verificationHeader}>
              <div className={styles.verificationIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div className={styles.verificationHeading}>
                <h2 id="ma3rab-verification-title">
                  إثبات الهوية وتوثيق الحساب
                </h2>
              </div>
            </div>

            <p className={styles.verificationDescription}>
              أنا <strong>علي العجيلي</strong>، مؤسس وصاحب مشروع{" "}
              <span className={styles.inlineBrand}>
                Arabic L10 <strong>Hub</strong>
              </span>
              ، أؤكد أن حسابي على منصة «معرب» يمثل المشروع رسميًا، وأنني المسؤول
              عن إدارة أعماله والمخوّل بالرد على المراجعات والتعليقات المتعلقة
              بمشاريع التعريب المنشورة باسمه.
            </p>

            <div className={styles.verificationDetails}>
              <div className={styles.verificationDetail}>
                <span>صاحب المشروع</span>
                <strong>علي العجيلي</strong>
              </div>

              <div className={styles.verificationDetail}>
                <span>اسم المشروع</span>
                <span className={styles.inlineBrand}>
                  Arabic L10 <strong>Hub</strong>
                </span>
              </div>

              <div className={styles.verificationDetail}>
                <span>منصة التوثيق</span>
                <strong>معرب (Ma3rab)</strong>
              </div>
            </div>

            <div className={styles.verificationCodeBox}>
              <span className={styles.verificationCodeLabel}>
                رمز التحقق الرسمي
              </span>

              <p className={styles.verificationCode} dir="auto">
                معرب-6CFR-Q82E
              </p>

              <p className={styles.verificationNote}>
                نُشر هذا الرمز على الموقع الرسمي لمشروع{" "}
                <span className={styles.inlineBrand}>
                  Arabic L10 <strong>Hub</strong>
                </span>{" "}
                لغرض إثبات ارتباط الحساب بالمشروع لدى منصة «معرب»، والتحقق من
                صلاحية تمثيله والرد على المراجعات باسمه.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default About;
