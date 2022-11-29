import { writable } from 'svelte/store';

export interface ICustomPageThemeStore {
    darkBackground: string,
    background: string,
    foreground: string,
    lightForeground: string,
    accent: string,
    
    text: string,
};

function _initialize() {
    const _default: ICustomPageThemeStore = {
        darkBackground: "#101213",
        background: "#131517",
        foreground: "#1a1c20",
        lightForeground: "#2d2f33",
        accent: "#fab100",
        text: "#fff",
    };

    const { subscribe, update } = writable<ICustomPageThemeStore>(_default);

    return {
        subscribe,
        
        // Methods
        update(theme: ICustomPageThemeStore) {
            update(() => {
                return theme;
            });
        },
    };
};

export const CustomPageThemeStore = _initialize();