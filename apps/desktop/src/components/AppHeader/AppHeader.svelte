<script lang="ts">
  // Importing modules
  import { appWindow } from '@tauri-apps/api/window';

  // Importing icons
  import IcBaselineMinus from '~icons/ic/baseline-minus'
  import RiCloseLine from '~icons/ri/close-line'
</script>

<div data-tauri-drag-region class="w-full bg-dark-background py-1.5 flex items-center justify-between relative">
  <!-- "Loading" bottom border -->
  <div class="absolute bottom-0 w-full bg-light-foreground opacity-40 h-0.5">
    <!-- <div class="absolute bottom-0 w-1/2 bg-yellow-400 h-0.5"></div> -->
  </div>

  <!-- Window name -->
  <div class="px-4 flex items-center">
    <img class="w-4 opacity-70" src="https://res.cloudinary.com/lococovu-cdn/image/upload/v1636815887/bluk-studio-white.svg" alt="">

    <p class="text-sm text-white text-opacity-70 ml-1.5">Bluk</p>
  </div>

  <!-- App controls -->
  <div class="flex text-white text-opacity-80 px-2">
    <!-- # Hide -->
    <button on:click={() => appWindow.hide()} class="mx-1 p-2">
      <IcBaselineMinus class="w-4 h-4" />
    </button>

    <!-- # Close -->
    <button on:click={() => appWindow.close()} class="mx-1 p-2">
      <RiCloseLine class="w-4 h-4" />
    </button>
  </div>
</div>