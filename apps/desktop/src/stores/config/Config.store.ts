import { writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/tauri";
import type { FetchConfigResponse } from "$types/backend_to_frontend/config/FetchConfigResponse";
import { ProfileStore } from "../profile";

// Store interface
export interface IConfigStore {
  // Theme-related configuration
  theme: {
    logotype: string,
  }
};

// Function, that'll initialize our store
function _initialize() {
  // Default store
  const _default: IConfigStore = {
    theme: {
      logotype: "https://res.cloudinary.com/lococovu-cdn/image/upload/v1636815887/bluk-studio-white.svg"
    }
  };

  // Initializing store
  const { subscribe, update } = writable(_default);

  return {
    subscribe,

    // fetchFromBackend
    // To fetch configuration from Rust backend
    async fetchFromBackend() {
      // Calling Rust function, that'll return our
      // saved configuration file
      const response: FetchConfigResponse = await invoke("fetch_config");

      // Updating our store
      update((object) => {
        object.theme.logotype = response.logotype;

        return object;
      });
    },
  };
};

// Exporting our initialized store
export const ConfigStore = _initialize();