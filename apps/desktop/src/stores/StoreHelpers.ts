import type { Readable } from 'svelte/store';

export function getStore<T>(store: Readable<T>): Promise<T> {
    return new Promise((resolve) => {
        store.subscribe((object) => resolve(object));
    });
};