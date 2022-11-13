<script lang="ts">
  import { Page, PageChangeAnimator } from "src/components";
  import { CurrentRouteStore, GameStore } from "src/stores";
  import { onMount, onDestroy } from "svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { fade } from "svelte/transition";

  onMount(() => {
    CurrentRouteStore.showSidebar();
    CurrentRouteStore.setApplicationRoute(true);
    CurrentRouteStore.setPageLink(`/${ pageType }/game/${ id }`);

    // Using GameStore to fetch information about this game
    GameStore.load(id);
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