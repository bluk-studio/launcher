import { IDownloadManifest } from '$types/entities/DownloadManifest';

// Todo
// Move to database
export const DownloadsStorage: Array<IDownloadManifest> = [
    {
        gameId: "civcraft",
        version: "0",
        assets: [
            {
                path: "/large.zip",
                url: "http://212.183.159.230/512MB.zip",
                size: 512000,
                hash: "unknown"
            },
            {
                path: "/large2.zip",
                url: "http://212.183.159.230/512MB.zip",
                size: 512000,
                hash: "unknown"
            },
            {
                path: "/large3.zip",
                url: "http://212.183.159.230/512MB.zip",
                size: 512000,
                hash: "unknown"
            }
        ]
    }
];