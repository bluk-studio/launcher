<script lang="ts">
  import { Page, PageChangeAnimator } from "src/components";
  import { CurrentRouteStore, CustomPageThemeStore, GameStore } from "src/stores";
  import { onMount, onDestroy } from "svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { fade } from "svelte/transition";

  onMount(() => {
    // CurrentRoute Settings
    CurrentRouteStore.setPage({
      isSidebarHidden: false,
      isApplicationRoute: true,

      pageLink: `/${ pageType }/game/${ id }`,
    });

    // Using GameStore to fetch information about this game
    GameStore.load(id);

    GameStore.subscribe((object) => {
      if (object.isLoaded) {
        // Library page
        if (pageType == 'library' && object.pages.library.theme) {
          // Updating theme
          CustomPageThemeStore.update(object.pages.library.theme);
        };

        if (pageType == 'store' && object.pages.store.theme) {
          // Updating theme
          CustomPageThemeStore.update(object.pages.store.theme);
        };
      }
    });
  });

  onDestroy(() => {
    // Unloading current game information
    GameStore.unload();
  });

  // Exporting attributes
  export let pageType: "library" | "store";
  export let id: string;
</script>

<PageChangeAnimator />

{ #if !$GameStore.isLoaded }
  <!-- Loading screen -->
  <div out:fade class="z-50 w-full h-screen flex items-center justify-center">
    <BarLoader color="#292a33" size={60} />
  </div>
{ :else }
  <!-- Default game layout -->
  <Page page={$GameStore.pages[pageType]} />
{ /if }