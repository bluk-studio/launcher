import { IGame } from "$types/entities/Game";

export const GamesStorage: Array<IGame> = [
    {
        id: "civcraft",

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
    }
];