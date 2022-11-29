import { writable } from "svelte/store";
import { exists, readTextFile } from '@tauri-apps/api/fs';
import { ConfigStore, type IConfigStore } from "../config";
import { getStore } from "../StoreHelpers";
import { AES, enc } from 'crypto-js';

import { BaseDirectory } from '@tauri-apps/api/path';
import { writeTextFile } from '@tauri-apps/api/fs';

import type { Token } from "$types/entities/Token";
import type { Profile } from "$types/entities/Profile";

// Store interface
export interface IProfileStore {
  isAuthorized: boolean,

  // Profile-related variables
  id?: string,
  email?: string,
  username?: string,
  avatar?: string,
};

// Funciton, that'll initialize our store
function _initialize() {
  // Default store
  const _default: IProfileStore = {
    isAuthorized: false,
  };

  const { subscribe, update } = writable(_default);

  return { 
    subscribe,

    // Fetch user from storage
    async fetchFromStorage(): Promise<boolean> {
      if (await exists("token.json", { dir: BaseDirectory.AppLocalData })) {
        // Reading this file
        const contents = await readTextFile("token.json", { dir: BaseDirectory.AppLocalData });

        // Parsing as json
        try {
          const config = await getStore<IConfigStore>(ConfigStore);
          const token = AES.decrypt(contents, config.encryption.key).toString(enc.Utf8);

          // Trying to fetch this user by token
          return await ProfileStore.fetchByToken(token);
        } catch {};
      };
      
      return false;
    },

    // Fetch by token
    async fetchByToken(tokenId: String): Promise<boolean> {
      const config = await getStore<IConfigStore>(ConfigStore);

      try {
        // Fetching token information
        const token: Token = await (async () => {
          const response = await fetch(`${config.launcherApiUrl}/token/${tokenId}`);
          
          if (response.status != 200) throw new Error("Error fetching user token");
          return await response.json();
        })();

        // Fetching user
        const profile: Profile = await (async () => {
          const response = await fetch(`${config.launcherApiUrl}/profile/${token.profileId}`);
          
          if (response.status != 200) throw new Error("Error fetching user profile");
          return await response.json();
        })();

        // Saving token
        await ProfileStore.saveToken(token.id);

        // Updating store
        update((object) => {
          object.isAuthorized = true;
          
          object.id = profile.id;
          object.email = profile.email;
          object.avatar = profile.avatar;
          object.username = profile.username;

          return object;
        });

        return true;
      } catch(error) {
        console.log(error);
        return false;
      };
    },

    // Save token
    async saveToken(token: string) {
      const config = await getStore<IConfigStore>(ConfigStore);
      await writeTextFile('token.json', AES.encrypt(token, config.encryption.key).toString(), { dir: BaseDirectory.AppLocalData });
    },
  };
};

// Exporting our initialized store
export const ProfileStore = _initialize();