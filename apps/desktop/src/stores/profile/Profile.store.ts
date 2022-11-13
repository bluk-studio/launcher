import { writable } from "svelte/store";
import { emit, listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import type { Event } from '@tauri-apps/api/event';
import type { ProfileUpdatedEventPayload } from '$types/backend_to_frontend/events/ProfileUpdatedEventPayload';

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

    // listenToProfileUpdates
    listenToProfileUpdates() {
      listen("profile_updated", ({ payload }: Event<ProfileUpdatedEventPayload>) => {
        // Updating profile
        
        update((object) => {
          object.isAuthorized = true;
          
          object.id = payload.id;
          object.email = payload.email;
          object.avatar = payload.avatar;
          object.username = payload.username;

          return object;
        });
      });
    },
  };
};

// Exporting our initialized store
export const ProfileStore = _initialize();