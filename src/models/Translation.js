export default class Translation {
  constructor({
    id,
    folderName,
    title,
    description,
    releaseYear = "غير محدد",
    translator = "علي العجيلي",
    appVersion = "غير محدد",
    installationSteps = [],
    coverImage,
    screenshots = [],
    technologies = [],
    downloadFile = "patch.zip",
    downloadUrl = null,
    nexusModsUrl = null,
    addedDate,
    isUnique = false,
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
    this.nexusModsUrl = nexusModsUrl;
    this.isUnique = Boolean(isUnique);

    const baseUrl = import.meta.env.BASE_URL;
    const basePath = `${baseUrl}games/${folderName}`;

    this.coverImage = `${basePath}/${coverImage}`;

    this.screenshots = screenshots.map((img) => `${basePath}/${img}`);

    this.downloadUrl = downloadUrl || `${basePath}/${downloadFile}`;
  }
}