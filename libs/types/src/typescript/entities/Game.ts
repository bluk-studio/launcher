import type { IPage } from './Page';

export interface IGame {
    id: string,
    title: string,
    image: string,
    
    pages: {
        // In-Store Game Page
        library: IPage,

        // In-Library Game Page
        store: IPage,
    }
};