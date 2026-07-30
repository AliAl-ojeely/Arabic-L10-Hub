
export default class Translation {
    constructor({ id, folderName, title, description, coverImage, screenshots = [], technologies = [], downloadFile = 'patch.zip' }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.technologies = technologies;

        const basePath = `/games/${folderName}`;

        this.coverImage = `${basePath}/${coverImage}`;
        this.screenshots = screenshots.map(img => `${basePath}/${img}`);
        this.downloadUrl = `${basePath}/${downloadFile}`;
    }
}