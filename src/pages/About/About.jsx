import styles from "./About.module.css";

const About = () => {
  return (
    <main className={styles.page} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.heroGlowOne} />
        <div className={styles.heroGlowTwo} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            مشروع عربي مستقل وغير ربحي
          </div>

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

              <span className={styles.cardEyebrow}>صاحب المشروع</span>

              <h2>من هو علي العجيلي؟</h2>

              <p>
                أنا علي العجيلي، مطور برمجيات متخصص في تطوير واجهات المستخدم
                وتطبيقات سطح المكتب، وحاصل على درجة البكالوريوس في تقنية
                المعلومات من جامعة العلوم والتكنولوجيا.
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
            <span className={styles.sectionEyebrow}>لماذا بدأت؟</span>

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
              <span className={styles.sectionEyebrow}>الرؤية المستقبلية</span>

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
              <span className={styles.sectionEyebrow}>شفافية تامة</span>

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

      <section className={styles.discordSection}>
        <div className={styles.discordGlow} />

        <div className={styles.discordContent}>
          <div className={styles.discordIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698A19.7913 19.7913 0 0015.885 3a13.687 13.687 0 00-.566 1.169 18.27 18.27 0 00-5.658 0A12.594 12.594 0 009.089 3a19.736 19.736 0 00-4.432 1.373C1.854 8.57 1.095 12.661 1.475 16.692a17.992 17.992 0 005.431 2.743 13.953 13.953 0 001.307-1.676 11.46 11.46 0 01-2.056-.988c.173-.126.342-.257.506-.391a14.223 14.223 0 0012.454 0c.166.135.335.266.506.391a11.66 11.66 0 01-2.06.989 13.961 13.961 0 001.307 1.675 17.977 17.977 0 005.433-2.742c.446-4.673-.762-8.727-3.986-12.323zM8.02 14.222c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419s.955-2.428 2.157-2.428 2.176 1.094 2.157 2.428c0 1.334-.955 2.419-2.157 2.419z" />
            </svg>
          </div>

          <div className={styles.discordText}>
            <span>Arabic L10 Hub Community</span>

            <h2>كن جزءًا من المجتمع</h2>

            <p>
              انضم إلى سيرفر Discord لمتابعة آخر أخبار التعريبات، تقديم
              الاقتراحات، الإبلاغ عن المشاكل والمشاركة في النقاشات.
            </p>
          </div>

          <a
            href="https://discord.gg/THPYXggyz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordButton}
          >
            الانضمام إلى Discord
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
