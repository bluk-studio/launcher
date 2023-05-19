<script lang="ts">
  // Importing modules
  import { fade } from 'svelte/transition';
  import { ProfileStore, CurrentRouteStore, GameStore } from 'src/stores';

  // Pages icons
  import MoreIcon from '~icons/ri/more-fill';
  import RiCloseFill from '~icons/ri/close-fill';
  import RiGamepadLine from '~icons/ri/gamepad-line'
  import RiNewspaperLine from '~icons/ri/newspaper-line'
  import RiDiscordLine from '~icons/ri/discord-line'
  import RiDownload2Line from '~icons/ri/download-2-line'
  import RiSettings3Line from '~icons/ri/settings-3-line';
  import CodeFill from '~icons/ri/code-fill';


  import { navigate } from 'svelte-routing';

  // Pages themselves
  let pages = [ 
    {
      icon: RiGamepadLine,
      text: "Играть",
      link: '/library/game/civcraft',
    },
    {
      icon: RiNewspaperLine,
      text: "Новости",
      link: '/news'
    },
    {
      icon: RiDiscordLine,
      text: "Наш дискорд",
      link: '/socials/discord'
    }
  ]

  // Bottom links
  let bottomLinks = [
    {
      icon: RiDownload2Line,
      text: "Загрузки",
      link: '/downloads'
    },
    {
      icon: RiSettings3Line,
      text: "Настройки",
      link: '/settings'
    }
  ]

  let isOpened = false;
</script>

<sidebar class="{ isOpened ? "px-6 w-3/12 xl:w-1/5" : "w-16" } border-r-2 border-light-foreground border-opacity-40 transition-all ease-in-out duration-500 bg-foreground shadow-xl flex flex-col items-center py-6">
  <!-- Logotype -->
  <div class="w-full flex { isOpened ? "items-start" : "items-center" } flex-col">
    <!-- Avatar -->
    <div class="mb-3 w-full flex items-center { isOpened ? "justify-start" : "justify-center" }">
      <span style="background-image: url('{ $ProfileStore.avatar }'); background-size: cover;" class="w-8 h-8 rounded-full"></span>

      { #if isOpened }
        <div class="ml-2">
          <div class="flex items-center">
            <h1 class="text-sm text-white text-opacity-95">{ $ProfileStore.username }</h1>
          
            <!-- Profile icons -->
            <div class="flex items-stretch ml-1.5 text-white text-opacity-95">
              <CodeFill class="w-3 h-3 mt-1" />
            </div>
          </div>

          <p class="text-xs text-white text-opacity-70">{ $ProfileStore.email }</p>
        </div>
      { /if }
    </div>

    <!-- Open sidebar -->
    <button on:click={() => { isOpened = !isOpened; }} class="group transition-all ease-in-out duration-200 { isOpened ? "w-full py-2 px-2 flex items-center" : "p-2" } border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 hover:bg-black hover:bg-opacity-10 rounded-md">
      <svelte:component this={isOpened ? RiCloseFill : MoreIcon} class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" />

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
      { @const isCurrentPage = page.link == $CurrentRouteStore.pageLink }  

      <button on:click={() => {
        navigate(page.link);
      }} class="group transition-all ease-in-out duration-200 { isOpened ? "w-full flex items-center" : "" } { isCurrentPage ? "bg-yellow-200 bg-opacity-20 hover:bg-opacity-30" : "hover:bg-black hover:bg-opacity-10" } mb-4 p-2 border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 rounded-md">
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
    { #each bottomLinks as page }
      { @const isCurrentPage = page.link == $CurrentRouteStore.pageLink }  

      <button on:click={() => {
        navigate(page.link);
      }} class="group transition-all ease-in-out duration-200 { isOpened ? "w-full flex items-center" : "" } { isCurrentPage ? "bg-yellow-200 bg-opacity-20 hover:bg-opacity-30" : "hover:bg-black hover:bg-opacity-10" } mb-4 p-2 border-2 border-transparent hover:border-yellow-500 hover:border-opacity-50 rounded-md">
        <svelte:component this={page.icon} class="w-4 h-4 text-white text-opacity-60 group-hover:text-opacity-100" />

        <!-- Text -->
        { #if isOpened }
          <p in:fade class="text-white opacity-80 group-hover:opacity-100 ml-2 text-sm font-light">{ page.text }</p>
        { /if }
      </button>
    { /each }
  </div>
</sidebar>