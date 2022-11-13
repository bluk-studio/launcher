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

    // Set isApplicationRoute
    setApplicationRoute(value: boolean) {
      update((object) => {
        object.isApplicationRoute = value;

        return object;
      });
    },

    // Set pageLink
    setPageLink(link: string) {
      update((object) => {
        object.pageLink = link;
        
        return object;
      });
    }
  };
};

export const CurrentRouteStore = _initialize();