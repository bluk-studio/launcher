import { writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api';
import type { IPage } from 'src/components';
import { getStore } from '../StoreHelpers';
import { ConfigStore, type IConfigStore } from '../config';
import type { IGame } from '$types/entities/Game';

// Store interface
export type IGameStore = IUnloadedGame | ILoadedGame;

export interface IUnloadedGame {
  isLoaded: false,
};

// > Loaded game information
export type ILoadedGame = IGame & { isLoaded: true };

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
    async load(id: string): Promise<boolean> {
      // Fetching config store
      const config = await getStore<IConfigStore>(ConfigStore);

      // Fetching game info from bluk launcher api
      const response = await fetch(`${ config.launcherApiUrl }/game/${ id }`);
      if (response.status != 200) return false;

      // Updating our current store
      const json = await response.json() as IGame;
      update(() => {
        return {
          isLoaded: true,

          ...json
        } as ILoadedGame;
      });

      // Game has been loaded succesfully
      return true;

      // Getting game info from Rust backend
      update(() => {
        return {
          isLoaded: true,

          id,
          title: "CivCraft",
          image: "https://media.discordapp.net/attachments/650727274743726090/1046751986214772746/Artboard_1.png?width=427&height=427",

          pages: {
            library: {
              components: [
                {
                  type: "Hero",
                  attributes: {
                    title: "CivCraft",
                    subtitle: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
                    withGameImage: true,
                    subcomponents: [
                      {
                        type: "Counter",
                        attributes: {
                          fetchOptions: {
                            interval: 1500,
                            link: "https://api.civcraft.ru/statistics/players?returnType=inLauncher"
                          }
                        }
                      },
                      {
                        type: "PlayButton",
                        attributes: {}
                      }
                    ],
                  }
                },

                {
                  type: 'Container',
                  attributes: {
                    padding: 'sm',
                    gap: 'md',
                    childrens: [
                      {
                        type: 'Container',
                        attributes: {
                          width: '2/3',
                          direction: 'vertical',
                          childrens: [
                            {
                              type: 'Container',
                              attributes: {
                                direction: 'vertical',
                                childrens: [
                                  {
                                    type: 'Text',
                                    attributes: {
                                      text: 'Новости',
                                      size: 'huge'
                                    }
                                  },
                                  {
                                    type: 'Text',
                                    attributes: {
                                      text: 'Все самые важные новости на данном проекте',
                                      color: 'text-white text-opacity-70',
                                      size: 'sm'
                                    }
                                  },
                                ]
                              }
                            },
                            {
                              type: 'Post',
                              attributes: {}
                            },
                            {
                              type: 'Post',
                              attributes: {}
                            },
                            {
                              type: 'Post',
                              attributes: {}
                            }
                          ]
                        }
                      },
                      {
                        type: 'Container',
                        attributes: {
                          direction: 'vertical',
                          gap: 'sm',
                          width: '1/3',
                          childrens: [
                            {
                              type: "Button",
                              attributes: {
                                type: "pictured",
                                text: "Карта"
                              }
                            },
                            {
                              type: "Container",
                              attributes: {
                                direction: "horizontal",
                                gap: "sm",
                                childrens: [
                                  {
                                    type: "Button", 
                                    attributes: {
                                      type: "link",
                                      text: "Дискорд",
                                      link: "google.com",
                                    }
                                  },
                                  {
                                    type: "Button", 
                                    attributes: {
                                      type: "link",
                                      text: "Наш ВК",
                                      link: "google.com",
                                    }
                                  },            
                                ]
                              }
                            },
                            {
                              type: "PlayerTop",
                              attributes: {}
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ],
            },
            store: {
              components: []
            },
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