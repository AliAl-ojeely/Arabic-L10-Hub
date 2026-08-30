export default class Translation {
    constructor({
        id,
        folderName,
        title,
        description,
        releaseYear = 'غير محدد',
        translator = 'علي العجيلي',
        appVersion = 'غير محدد',
        installationSteps = [],
        coverImage,
        screenshots = [],
        technologies = [],
        downloadFile = 'patch.zip',
        downloadUrl = null,
        addedDate
    }) {
        this.id = id;
        this.folderName = folderName;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.translator = translator;
        this.appVersion = appVersion;
        this.installationSteps = installationSteps;
        this.technologies = technologies;
        this.addedDate = addedDate;

        const baseUrl = import.meta.env.BASE_URL;
        const basePath = `${baseUrl}games/${folderName}`;

        this.coverImage = `${basePath}/${coverImage}`;
        this.screenshots = screenshots.map(img => `${basePath}/${img}`);

        // إذا تم توفير رابط خارجي، مثل GitHub Releases، استخدمه مباشرة.
        // وإلا استخدم نظام الملفات المحلي القديم.
        this.downloadUrl = downloadUrl || `${basePath}/${downloadFile}`;
    }
} 