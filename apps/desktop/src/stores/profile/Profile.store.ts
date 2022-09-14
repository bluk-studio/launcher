import { writable } from "svelte/store";

// Store interface
export interface IProfileStore {
  isAuthorized: boolean,

  // Launcher-related variables
  launcherSession?: string,

  // Profile-related variables
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

    // Update launcher session
    setLauncherSession(id: string) {
      update((object) => {
        object.launcherSession = id;

        return object
      });
    }
  };
};

// Exporting our initialized store
export const ProfileStore = _initialize();