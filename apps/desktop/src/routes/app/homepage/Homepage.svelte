<script lang="ts">
  // Importing other modules
  import { onMount } from 'svelte';
  import { CurrentRouteStore } from 'src/stores';

  // Icons
  import ExternalLink from '~icons/ri/external-link-line';

  import CalendarLine from '~icons/ri/calendar-line';
  import TrophyLine from '~icons/ri/trophy-line';

  import NewspaperLine from '~icons/ri/newspaper-line';

  // onMount function to load and setup everything
  onMount(() => {
    // CurrenRoute setup
    // > Enabling sidebar
    CurrentRouteStore.showSidebar(); 
  });
</script>

<!-- Hero -->
<section class="w-full h-full relative">
  <!-- background -->
  <div class="z-1 absolute w-full h-full" style="background-image: url('https://images6.alphacoders.com/108/thumb-1920-1082090.jpg'); background-size: cover;"></div>

  <!-- Content -->
  <div class="z-10 absolute w-full h-full flex flex-col" style="background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(23,24,31,1) 85%);">
    <!-- Hero header -->
    <div class="w-full px-6 py-4 flex items-center justify-between">
      <!-- Title -->
      <div>
        <h1 class="text-lg text-white">New competition</h1>
        <p class="text-xs text-white text-opacity-80">Lorem ipsum dolor sit amet.</p>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-center">
        <button class="px-4 py-2 bg-amber-400 text-white text-opacity-80 flex items-center justify-center">
          <p>Узнать больше</p>

          <ExternalLink class="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>

    <!-- Hero content -->
    <div class="w-full flex-grow flex items-center justify-center">
      <!-- <h1 class="w-1/3 text-center text-7xl text-white">Lorem ipsum dolor sit amet.</h1> -->
    </div>

    <!-- Hero footer -->
    <div class="w-full px-6 py-4 flex items-center justify-center">
      <!-- Start -->
      <div class="px-6 mx-2 py-2 border-2 border-foreground rounded-full text-white">
        <!-- Text -->
        <h1 class="text-md">Начало сессии</h1>

        <div class="flex items-center text-white text-opacity-80">
          <CalendarLine class="w-4 h-4 mr-1" />

          <p class="text-xs">12.02.2022 в 10:00 по МСК</p>
        </div>
      </div>

      <!-- Prize -->
      <div class="px-6 py-2 mx-2 border-2 border-foreground rounded-full text-white">
        <!-- Text -->
        <h1 class="text-md">Призовой фонд</h1>

        <div class="flex items-center text-white text-opacity-80">
          <TrophyLine class="w-4 h-4 mr-1" />

          <p class="text-xs">100$</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- News section -->
<section class="my-6 p-6">
  <!-- Title -->
  <div class="w-full flex items-center justify-between">
    <!-- Title -->
    <div class="flex items-start text-white">
      <NewspaperLine class="w-8 h-8" />

      <div class="ml-2">
        <h1 class="text-xl">Новости</h1>
        <p class="text-xs text-white text-opacity-80">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>

    <!-- Social networks -->
    <!-- <div class="flex items-center">
      { #each [ { icon: RiDiscordLine, text: "Discord" }, { icon: RiTwitterFill, text: "Twitter" } ] as social }
        <a href="/" class="opacity-80 mx-2 px-2 py-1.5 flex items-center text-white">
          <svelte:component this={social.icon} class="w-4 h-4" />
        
          <p class="ml-1.5">{ social.text }</p>
        </a>
      { /each }
    </div> -->
  </div>

  <!-- News themselves -->
</section>