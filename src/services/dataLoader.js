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
            downloadFile: 'Partisans1941-Arabic-Patch.7z'
        },
        {
            id: 2,
            folderName: 'Hollow Knight Silksong',
            title: 'Hollow Knight: Silksong',
            releaseYear: '2026',
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
            downloadFile: 'Hollow-Knight-Silksong-v1.5-Arabic-Patch.rar'
        }
    ];

    return data.map(item => new Translation(item));
};