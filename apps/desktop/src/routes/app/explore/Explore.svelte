<script lang="ts">
  // Importing other modules
  import { onMount } from 'svelte';
  import { CurrentRouteStore } from 'src/stores';
  import { PageChangeAnimator } from 'src/components';

  // Importing icons
  import ChevronDown from '~icons/ri/arrow-down-s-line';

  import GridFill from '~icons/ri/grid-fill';
  import ListCheck from '~icons/ri/list-check';
  import { navigate } from 'svelte-routing';

  onMount(() => {
    // Tweaking CurrentRoute settings
    CurrentRouteStore.showSidebar();
    CurrentRouteStore.setApplicationRoute(true);
    CurrentRouteStore.setPageLink("/explore");
  });
</script>

<PageChangeAnimator />

<!-- Filters -->
<section class="w-full py-4 px-4">
  <!-- Filters -->
  <div class="bg-foreground rounded-xl w-full px-4 py-3 flex items-center justify-between">
    <!-- Buttons -->
    <div class="flex items-stretch justify-center">
      { #each ["Тип", "Тематика", "Популярность"] as filterName }
        <button class="bg-light-foreground rounded-md px-3 py-1.5 mx-1.5 flex items-center justify-center text-white text-opacity-80">
          <p class="text-sm">{ filterName }</p>
        
          <ChevronDown class="ml-1 w-4 h-4 mt-1" />
        </button>
      { /each }
    </div>

    <!-- View options -->
    <div class="flex items-center justify-center">
      <button class="bg-amber-400 rounded-md px-3 py-1.5 mx-1.5 flex items-center text-white text-opacity-80">
        <GridFill class="w-4 h-4" />

        <p class="text-sm ml-1">Плитки</p>
      </button>

      <button class="bg-light-foreground rounded-md px-3 py-1.5 mx-1.5 flex items-center text-white text-opacity-80">
        <ListCheck class="w-4 h-4" />

        <p class="text-sm ml-1">Список</p>
      </button>
    </div>
  </div>
</section>

<!-- Games section -->
<section class="w-full pl-4">
  <!-- Games -->
  <div class="flex flex-wrap items-stretch justify-between">
    { #each new Array(6) as _ }
      <div on:click={() => {
        navigate("/library/game/testId");
      }} class="cursor-pointer w-1/3 pr-4 py-2 relative">
        <div class="w-full h-full bg-foreground rounded-xl">
          <!-- Image -->
          <div style="background-image: url('https://www.minecraft.net/content/dam/games/minecraft/key-art/CC-Update-Part-II_600x360.jpg'); background-position: center; background-size: cover;" class="h-48 rounded-t-xl"></div>

          <!-- Information -->
          <div>
            <!-- Title -->
            <div class="px-4 pt-4">
              <h1 class="text-base text-white">Knockback</h1>
              <p class="text-xs text-white opacity-80">Lorem ipsum dolor sit amet.</p>
            </div>

            <!-- Tags -->
            <div class="mt-2 flex flex-wrap pb-4 px-3">
              { #each new Array(3) as _ }
                <div class="px-2 py-0.5 bg-light-foreground rounded-full m-1">
                  <p class="text-xs text-white text-opacity-80">Хардкор</p>
                </div>
              { /each }
            </div>
          </div>
        </div>
      </div>
    { /each }
  </div>
</section>