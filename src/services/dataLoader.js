import Translation from '../models/Translation';

export const fetchTranslationsData = async () => {
    const data = [
        {
            id: 1,
            folderName: 'Partisans 1941',
            title: 'Partisans 1941',
            releaseYear: '2020',
            translator: 'علي العجيلي', // المُعرّب
            appVersion: '1.1.05', // ضع النسخة المتوافقة هنا
            description: 'لعبة تخفي وتكتيك في الوقت الفعلي تدور أحداثها في الجبهة الشرقية خلال الحرب العالمية الثانية. التعريب يشمل ترجمة شاملة للقوائم، المهام، وحوارات الشخصيات لضمان تجربة لعب متكاملة ومفهومة باللغة العربية.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج WinRAR أو 7-Zip لفك الضغط عن الملف.',
                'انسخ جميع الملفات الناتجة والصقها داخل مجلد اللعبة الرئيسي.',
                'وافق على استبدال الملفات عند ظهور النافذة.',
                'شغل اللعبة واستمتع بالتجربة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp'],
            technologies: ['توطين النصوص', 'تعديل الخطوط'],
            downloadFile: 'Partisans1941-Arabic-Patch.7z',
            addedDate: '2026-07-29',
        },
        {
            id: 2,
            folderName: 'Hollow Knight Silksong',
            title: 'Hollow Knight: Silksong',
            releaseYear: '2025',
            translator: 'علي العجيلي', // المُعرّب
            appVersion: '1.0.29909', // أخذت رقم النسخة من اسم ملف الـ rar الذي أرفقته
            description: 'تعريب شامل للعبة المنتظرة Hollow Knight: Silksong. تم العمل على ترجمة الحوارات، القوائم، والأوصاف بدقة عالية مع الحفاظ على روح القصة والأسماء لتناسب سياق عالم اللعبة الساحر.',
            installationSteps: [
                'قم بتحميل ملف التعريب (rar) من الزر أدناه.',
                'قم بفك الضغط عن الملف باستخدام برنامج WinRAR.',
                'تأكد من تواجد بيئة BepInEx الأساسية في مجلد اللعبة.',
                'انسخ ملفات التعريب المستخرجة والصقها داخل مسار اللعبة الرئيسي.',
                'شغل اللعبة واستمتع بالمغامرة باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'],
            technologies: ['BepInEx', 'Harmony', 'توطين النصوص'],
            downloadFile: 'Hollow-Knight-Silksong-v1.5-Arabic-Patch.rar',
            addedDate: '2026-07-11'
        },
        {
            id: 3,
            folderName: 'Gothic 1 Remake',
            title: 'Gothic 1 Remake',
            releaseYear: '2026', // يمكنك تعديل السنة إذا لزم الأمر
            translator: 'علي العجيلي',
            appVersion: 'v170775', // قم بتعديلها لنسخة اللعبة المتوافقة معك
            description: 'تعريب شامل للعبة تقمص الأدوار الكلاسيكية المنتظرة Gothic 1 Remake. تم التركيز على ترجمة الحوارات العميقة، واجهة المستخدم، ووصف العناصر بدقة لضمان اندماجك الكامل في عالم اللعبة المظلم وتفاصيله.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج 7-Zip أو WinRAR لفك الضغط عن الملف.',
                'انسخ جميع الملفات المستخرجة والصقها داخل المسار الرئيسي لتثبيت اللعبة.',
                'وافق على استبدال الملفات عند ظهور نافذة التأكيد.',
                'شغل اللعبة واستمتع بتجربة الـ RPG باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'], // 6 صور كما في المجلد
            technologies: ['توطين النصوص', 'تعديل الخطوط'],
            downloadFile: 'Gothic 1 Remake-Arabic-Patch.7z',
            addedDate: '2026-07-22'
        },
        {
            id: 4,
            folderName: 'SpongeBob SquarePants Titans of the Tide',
            title: 'SpongeBob SquarePants: Titans of the Tide',
            releaseYear: '2025',
            translator: 'علي العجيلي',
            appVersion: 'v1.4',
            description: 'تعريب كامل وشامل للعبة المغامرات الممتعة SpongeBob SquarePants: Titans of the Tide. تم ترجمة الحوارات، القوائم، والنصوص بالكامل لضمان تجربة ممتعة ومفهومة لعشاق سبونج بوب بجميع الأعمار.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج 7-Zip أو WinRAR لفك الضغط عن الملف.',
                'انسخ جميع الملفات الناتجة والصقها داخل مجلد تثبيت اللعبة الرئيسي.',
                'وافق على استبدال الملفات عند ظهور نافذة التأكيد.',
                'شغل اللعبة واستمتع بالمغامرة باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'],
            technologies: ['توطين النصوص', 'تعديل الواجهة'],
            downloadFile: 'SpongeBob SquarePants Titans of the Tide-Arabic-Patch.7z',
            addedDate: '2026-07-24'
        },
        {
            id: 5,
            folderName: 'The Mound - Omen of Cthulhu',
            title: 'The Mound - Omen of Cthulhu',
            releaseYear: '2026',
            translator: 'علي العجيلي',
            appVersion: 'v34308',
            description: 'تعريب احترافي وشامل للعبة الرعب والغموض The Mound - Omen of Cthulhu. تم ترجمة القصة، الحوارات، والمستندات بدقة عالية لتعيش أجواء الرعب النفسي والقصص الغامضة بكل تفاصيلها بالعربية.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج 7-Zip أو WinRAR لفك الضغط عن الملف.',
                'انسخ جميع الملفات الناتجة والصقها داخل مجلد تثبيت اللعبة الرئيسي.',
                'وافق على استبدال الملفات عند ظهور نافذة التأكيد.',
                'شغل اللعبة واستمتع بتجربة الرعب باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'],
            technologies: ['توطين النصوص', 'تعديل الواجهة'],
            downloadFile: 'The Mound Omen of Cthulhu-Arabic-Patch.7z',
            addedDate: '2026-07-29'
        },
        {
            id: 6,
            folderName: 'Eriksholm - The Stolen Dream',
            title: 'Eriksholm: The Stolen Dream',
            releaseYear: '2026',
            translator: 'علي العجيلي',
            appVersion: 'v1.4',
            description: 'تعريب شامل للعبة التخفي والمغامرة Eriksholm: The Stolen Dream. يشمل التعريب ترجمة دقيقة للحوارات، القوائم، والنصوص لضمان اندماجك الكامل في عالم اللعبة وكشف أسرار مدينة إريكشهولم.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج 7-Zip أو WinRAR لفك الضغط عن الملف.',
                'انسخ جميع الملفات المستخرجة والصقها داخل المسار الرئيسي لتثبيت اللعبة.',
                'وافق على استبدال الملفات عند ظهور نافذة التأكيد.',
                'شغل اللعبة واستمتع بالتجربة باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'],
            technologies: ['توطين النصوص', 'تعديل الخطوط'],
            downloadFile: 'Eriksholm - The Stolen Dream-Arabic-Patch.7z',
            addedDate: '2026-07-18'
        },
        {
            id: 7,
            folderName: 'This Bed We Made',
            title: 'This Bed We Made',
            releaseYear: '2023',
            translator: 'علي العجيلي',
            appVersion: 'v1.5.2',
            description: 'تعريب احترافي وشامل للعبة التحقيق والغموض This Bed We Made. تدور أحداث القصة في خمسينيات القرن الماضي حول خادمة في فندق ترتدي ثوب التحقيق لكشف الأسرار، والتعريب يغطي الحوارات، القوائم، والمستندات بالكامل.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخدم برنامج 7-Zip أو WinRAR لفك الضغط عن الملف.',
                'انسخ جميع الملفات الناتجة والصقها داخل مجلد تثبيت اللعبة الرئيسي.',
                'وافق على استبدال الملفات عند ظهور نافذة التأكيد.',
                'شغل اللعبة واستمتع بتجربة التحقيق باللغة العربية!'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp'],
            technologies: ['توطين النصوص', 'تعديل الواجهة'],
            downloadFile: 'This Bed We Made - Arabic.7z',
            addedDate: '2026-07-28'
        },
        {
            id: 8, // تأكد من تعديل الرقم ليكون التسلسل الصحيح في مصفوفتك
            folderName: 'The Relic First Guardian',
            title: 'The Relic: First Guardian',
            releaseYear: '2026', // يمكنك تحديث السنة إذا كانت متوفرة
            translator: 'علي العجيلي',
            appVersion: 'v1.0', // يمكنك كتابة رقم النسخة المتوافقة لاحقاً
            description: 'لعبة The Relic: First Guardian هي لعبة تقمص أدوار وأكشن (ARPG) مظلمة ومحمومة تأخذ اللاعبين في رحلة ملحمية مليئة بالتحديات. تم تطويرها بواسطة استوديو Project Cloud Games ونشرها بواسطة Perp Games. التعريب يشمل ترجمة كاملة لجميع جداول النصوص (النطاقات، العناصر، الأسماء، المهام، الرونز والمهارات) لتوفير تجربة ممتعة وواضحة.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (rar) من الزر أدناه.',
                'استخدم برنامج WinRAR لفك الضغط واستخراج الملفات: zArabic_P.pak و zArabic_P.ucas و zArabic_P.utoc.',
                'توجه إلى مسار تثبيت اللعبة الأساسي، وادخل إلى المسار التالي: ProjectCloudGame\\Content\\Paks\\',
                'قم بإنشاء مجلد جديد باسم "~mods" داخل مجلد الـ Paks (إذا لم يكن موجوداً مسبقاً).',
                'انسخ ملفات التعريب الثلاثة والصقها داخل مجلد "~mods".',
                'شغل اللعبة واستمتع! (ملاحظة: لإلغاء التعريب والعودة للغة الأصلية، فقط قم بحذف هذه الملفات من المجلد).'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp'],
            technologies: ['توطين النصوص', 'تعديل الواجهة'],
            downloadFile: 'The Relic First Guardian (Arabic).rar',
            addedDate: '2026-08-05'
        },
        {
            id: 9, // تأكد من تعديل الرقم التسلسلي ليكون التالي في مصفوفتك
            folderName: 'Beast of Reincarnation',
            title: 'Beast of Reincarnation',
            releaseYear: '2026',
            translator: 'علي العجيلي',
            appVersion: 'v1.0.5.0',
            description: 'تعريب شامل للعبة Beast of Reincarnation، يغطي ترجمة القوائم، الحوارات، والنصوص الداخلية بالكامل لتوفير تجربة استثنائية وممتعة للاعب العربي.',
            installationSteps: [
                'قم بتحميل ملف التعريب المضغوط (7z) من الزر أدناه.',
                'استخرج الملفات باستخدام أحد برامج فك الضغط (مثل 7-Zip أو WinRAR).',
                'توجه إلى مسار تثبيت اللعبة الأساسي وضع ملفات التعريب في المجلد المخصص للمودز (Mods) الخاص باللعبة.',
                'شغل اللعبة واستمتع بالتعريب بالكامل.'
            ],
            coverImage: 'poster.webp',
            screenshots: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp'],
            technologies: ['توطين النصوص', 'تعريب القوائم'],
            downloadFile: 'Beast of Reincarnation-(Arabic).7z',
            addedDate: '2026-08-06'
        }
    ];

    return data.map(item => new Translation(item));
};