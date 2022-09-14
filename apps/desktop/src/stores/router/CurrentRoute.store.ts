import { writable } from "svelte/store";

// Store interface
export interface ICurrentRouteStore {
  isSidebarHidden?: boolean,
};

// Function that'll create our store
function _initialize() {
  // Default store
  const _default: ICurrentRouteStore = {
    isSidebarHidden: true,
  };

  // Initializing
  const { subscribe, update } = writable(_default);

  // Returning our initialized store
  return {
    subscribe,

    // Sidebar manipulation function
    // to hide sidebar...
    hideSidebar() { 
      update((object) => {
        object.isSidebarHidden = true;

        return object;
      }) 
    },

    // ...and to show our sidebar
    showSidebar() {
      update((object) => {
        object.isSidebarHidden = false;

        return object;
      });
    },
  };
};

export const CurrentRouteStore = _initialize();