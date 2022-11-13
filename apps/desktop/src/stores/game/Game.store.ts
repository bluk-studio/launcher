import { writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api';
import type { IPage } from 'src/components';

// Store interface
export type IGameStore = IUnloadedGame | ILoadedGame;

export interface IUnloadedGame {
  isLoaded: false,
};

// > Loaded game information
export interface ILoadedGame {
  isLoaded: true,

  // Game-related info
  id: String,
  title: String,
  image: String,
  colors?: {

  },
  
  pages: {
    store: IPage,
    library: IPage,
  },

  sidebarLinks?: Array<{ title: String, href: String }>
};

// Function, that'll initialize our store
function _initialize() {
  // Creating default store and getting subscribe and update
  // functions from svelte
  const { subscribe, update } = writable<IGameStore>({
    isLoaded: false,
  });

  return {
    subscribe,

    // Load game information
    load(id: string,) {
      // Getting game info from Rust backend
      update(() => {
        return {
          isLoaded: true,

          id,
          title: "CivCraft",
          image: "https://uploads.turbologo.com/uploads/design/preview_image/4473925/preview_image20210508-28981-14u73rt.png",

          pages: {
            library: [
              {
                type: "Hero",
                atttributes: {
                  title: "Test title!",
                  subtitle: "Test subtitle!",
                  withGameImage: true,
                  subcomponents: [
                    {
                      type: "PlayButton",
                      attributes: {}
                    }
                  ],
                }
              }
            ],
            store: []
          }
        } as ILoadedGame;
      });
    },

    // Unload game
    unload() {
      update(() => {
        return {
          isLoaded: false
        } as IUnloadedGame;
      });
    },
  }
};

export const GameStore = _initialize();