<script lang="ts">
  import { Page, PageChangeAnimator } from "src/components";
  import { CurrentRouteStore, GameStore } from "src/stores";
  import { onMount, onDestroy } from "svelte";
  import { BarLoader } from "svelte-loading-spinners";
  import { navigate } from "svelte-routing";
  import { fade } from "svelte/transition";

  // Variables
  let isNotFound = false;

  onMount(async () => {
    // CurrentRoute Settings
    CurrentRouteStore.setPage({
      isSidebarHidden: false,
      isApplicationRoute: true,

      pageLink: `/${ pageType }/game/${ id }`,
    });

    // Using GameStore to fetch information about this game
    isNotFound = !(await GameStore.load(id));
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
  { #if isNotFound }
    <div class="z-50 w-full h-screen flex flex-col items-center justify-center">
      <div class="text-center w-1/3 my-4">
        <h1 class="text-2xl text-white font-medium">Игра не найдена</h1>
        <p class="text-sm text-white text-opacity-70">Нам очень жаль, но мы не смогли найти игру, которую вы искали. Вы можете попробывать перейти обратно в { pageType == "library" ? "Библиотеку" : "Магазин" } и попробывать найти эту игру заново.</p>
      </div>

      <!-- Go to library button (or to store) -->
      <button on:click={() => {
        navigate(pageType == "library" ? "/library" : "/store");
      }} class="px-5 py-1.5 flex items-center justify-center rounded-md bg-foreground hover:bg-dark-background">
        <p class="text-sm text-white">{ pageType == "library" ? "В библиотеку" : "В магазин" }</p>
      </button>
    </div>
  { :else }
    <!-- Loading screen -->
    <div out:fade class="z-50 w-full h-screen flex items-center justify-center">
      <BarLoader color="#292a33" size={60} />
    </div>
  { /if }
{ :else }
  <!-- Default game layout -->
  <Page page={$GameStore.pages[pageType]} />
{ /if }