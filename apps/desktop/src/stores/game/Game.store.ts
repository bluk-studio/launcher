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
                                      text: '??????????????',
                                      size: 'huge'
                                    }
                                  },
                                  {
                                    type: 'Text',
                                    attributes: {
                                      text: '?????? ?????????? ???????????? ?????????????? ???? ???????????? ??????????????',
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
                                text: "??????????"
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
                                      text: "??????????????",
                                      link: "google.com",
                                    }
                                  },
                                  {
                                    type: "Button", 
                                    attributes: {
                                      type: "link",
                                      text: "?????? ????",
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