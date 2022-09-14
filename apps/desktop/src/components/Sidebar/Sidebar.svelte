<script lang="ts">
  // Importing modules
  import { fade } from 'svelte/transition';
  
  // Pages icons
  import HomeIcon from '~icons/ri/home-2-line';
  import MoreIcon from '~icons/ri/more-fill';
  import DocumentationIcon from '~icons/ri/book-open-line';

  import CodeFill from '~icons/ri/code-fill';

  import RiSettings3Line from '~icons/ri/settings-3-line';

  // Pages themselves
  let pages = [
    {
      icon: HomeIcon,
      text: "Главная",
    },
    {
      icon: DocumentationIcon,
      text: "Вики",
    }
  ]

  let isOpened = false;
</script>

<sidebar class="{ isOpened ? "px-6 w-3/12 xl:w-1/5" : "w-16" } border-r-2 border-light-foreground border-opacity-40 transition-all ease-in-out duration-500 bg-foreground shadow-xl flex flex-col items-center py-6">
  <!-- Logotype -->
  <div class="w-full flex items-center justify-between { isOpened ? "" : "flex-col" }">
    <!-- Avatar -->
    <div class="mb-3 w-full flex items-center { isOpened ? "justify-start" : "justify-center" }">
      <span class="w-8 h-8 rounded-full bg-red-500"></span>

      { #if isOpened }
        <div class="ml-2">
          <div class="flex items-center">
            <h1 class="text-sm text-white text-opacity-95">dogleash</h1>
          
            <!-- Profile icons -->
            <div class="flex items-stretch ml-1.5 text-white text-opacity-95">
              <CodeFill class="w-3 h-3 mt-1" />
            </div>
          </div>

          <p class="text-xs text-white text-opacity-70">10 уровень</p>
        </div>
      { /if }
    </div>

    <!-- Open sidebar -->
    <button on:click={() => { isOpened = !isOpened; }} class="group transition-all ease-in-out duration-200 { isOpened ? "py-1 px-2 flex items-center" : "p-2" } border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 hover:bg-black hover:bg-opacity-10 rounded-md">
      <MoreIcon class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" />

      <!-- Text -->
      { #if isOpened }
        <p in:fade class="text-white opacity-80 group-hover:opacity-100 ml-2 text-sm font-light">{ isOpened ? "Закрыть" : "Открыть" }</p>
      { /if }
    </button>
  </div>

  <div class="w-full { isOpened ? "" : "px-3" }">
    <div class="my-4 w-full border-b-2 border-light-foreground"></div>
  </div>

  <!-- Icons -->
  <div class="w-full flex-grow flex flex-col items-center">
    { #each pages as page }
      <button class="group transition-all ease-in-out duration-200 { isOpened ? "w-full flex items-center" : "" } mb-4 p-2 border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 hover:bg-black hover:bg-opacity-10 rounded-md">
        <svelte:component this={page.icon} class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" />

        <!-- Text -->
        { #if isOpened }
          <p in:fade class="text-white opacity-80 group-hover:opacity-100 ml-2 text-sm font-light">{ page.text }</p>
        { /if }
      </button>
    { /each }
  </div>

  <!-- Profile -->
  <div class="w-full flex flex-col items-center">
    <!-- Buttons -->
    <button class="group transition-all ease-in-out duration-200 { isOpened ? "w-full flex items-center" : "" } p-2 border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 hover:bg-black hover:bg-opacity-10 rounded-md">
      <!-- <svelte:component this={page.icon} class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" /> -->
      <RiSettings3Line class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" />

      <!-- Text -->
      { #if isOpened }
        <p in:fade class="text-white opacity-80 group-hover:opacity-100 ml-2 text-sm font-light">Настройки</p>
      { /if }
    </button>
  </div>
</sidebar>