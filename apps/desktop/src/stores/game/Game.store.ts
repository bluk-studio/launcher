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
          image: "https://i.pinimg.com/originals/cc/40/6a/cc406a8382d8df7eb5f395ec884d3c95.png",

          pages: {
            library: [
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
                        text: "Игроков: 10/200"
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
                            }
                          },
                          {
                            type: "Button",
                            attributes: {
                              type: "simple",
                            }
                          },
                          {
                            type: "Button",
                            attributes: {
                              type: "simple",
                            }
                          }
                        ]
                      }
                    }
                  ]
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