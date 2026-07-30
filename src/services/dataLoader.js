import Translation from '../models/Translation';

export const fetchTranslationsData = async () => {

    const data = [
        {
            id: 1,
            folderName: 'eriksholm',
            title: 'Eriksholm: The Stolen Dream',
            description: 'تعريب كامل للقوائم والنصوص داخل اللعبة. الباتش متوافق بالكامل مع إصدار اللعبة v1.4 وتم ضغطه لسهولة التثبيت.',
            coverImage: 'cover.webp',
            screenshots: ['screen1.webp', 'screen2.webp', 'screen3.webp'],
            technologies: ['BepInEx', 'Harmony'],
            downloadFile: 'Eriksholm-Arabic-Patch-v1.4.zip'
        },
        {
            id: 2,
            folderName: 'hollow-knight-silksong',
            title: 'Hollow Knight: Silksong',
            description: 'باتش تعريب شامل يغطي كافة الحوارات، القوائم، وتفاصيل العناصر والقدرات داخل اللعبة.',
            coverImage: 'cover.webp',
            screenshots: ['screen1.webp', 'screen2.webp'],
            technologies: ['Unity Mod Manager'],
            downloadFile: 'Silksong-Arabic-Patch.zip'
        },
        {
            id: 3,
            folderName: 'total-war-three-kingdoms',
            title: 'Total War: Three Kingdoms',
            description: 'توطين كامل للعبة الاستراتيجية، يشمل واجهة المستخدم الدبلوماسية وأسماء الوحدات العسكرية.',
            coverImage: 'cover.webp',
            screenshots: ['screen1.webp'],
            technologies: ['Pack File Manager'],
            downloadFile: 'TW-3K-Arabic-Loc.zip'
        }
    ];
    return data.map(item => new Translation(item));
};