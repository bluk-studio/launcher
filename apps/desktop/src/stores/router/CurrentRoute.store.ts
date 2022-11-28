import { writable } from "svelte/store";

// Store interface
export interface ICurrentRouteStore {
  isSidebarHidden?: boolean,
  isApplicationRoute?: boolean,

  pageLink: string,
};

// Function that'll create our store
function _initialize() {
  // Default store
  const _default: ICurrentRouteStore = {
    isSidebarHidden: true,
    isApplicationRoute: false,

    pageLink: '/login'
  };

  // Initializing
  const { subscribe, update } = writable(_default);

  // Returning our initialized store
  return {
    subscribe,

    setPage(settings = {
      isSidebarHidden: true,
      isApplicationRoute: false,

      pageLink: '/login',
    }) {
      update(() => {
        return settings;
      });
    },
  };
};

export const CurrentRouteStore = _initialize();