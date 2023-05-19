export interface IDownloadAsset {
    path: string,
    url: string,
    size: number,
    hash: string,
};

export interface IDownloadManifest {
    gameId: string,
    version: string,
    assets: Array<IDownloadAsset>,
};