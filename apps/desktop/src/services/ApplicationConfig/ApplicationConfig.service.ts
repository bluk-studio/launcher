


// 
// TODO
// Move all configs (downloads.json, games.json, profile.json)
// and their logic to this service
// 



import { BaseDirectory, exists, readTextFile } from "@tauri-apps/api/fs";
import type { ILibraryGame, IOngoingDownload } from "src/stores";

interface SavableConfig {
    games?: {
        downloads: Array<IOngoingDownload>,
        library: Array<ILibraryGame>
    },
    profileToken?: string,
};

class ApplicationConfigServiceClass {
    private config: SavableConfig;
    
    // Fetch config
    async fetchConfig(): Promise<Boolean> {
        // Checking if we have config.json file in our app directory
        if (await exists("config.json", { dir: BaseDirectory.AppLocalData })) {
            // Reading this file
            const contents = await readTextFile("config.json", { dir: BaseDirectory.AppLocalData });

            // Parsing as json
            try {
            } catch {
                return false;
            };
        };

        return true;
    };
};

export const ApplicationConfigService = new ApplicationConfigServiceClass();