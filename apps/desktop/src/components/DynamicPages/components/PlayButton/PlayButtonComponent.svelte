<script lang="ts">
  import { GameStore, GamesLibraryStore, DownloadManagerStore } from 'src/stores';
  import { Circle } from 'svelte-loading-spinners';
  import { navigate } from 'svelte-routing';

  import RiDownload2Line from '~icons/ri/download-2-line'
  import RiSettings3Line from '~icons/ri/settings-3-line'

  $: isInstalled = Boolean($GamesLibraryStore.games.find((x) => x.id == $GameStore.id));
  $: ongoingDownload = $DownloadManagerStore.find((x) => x.getGameId() == $GameStore.id);

  // Install game function
  function installGame() {
    // Downloading this game
    GamesLibraryStore.add($GameStore.id);
  };
</script>

<div class="flex items-stretch gap-4">
  <button on:click={() => {
    if (!isInstalled) {
      // Downloading
      installGame();
    } else {
      if (ongoingDownload) {
        // Redirecting to Download page
        navigate("/downloads");
      } else {
        // Starting this game
      };
    };
  }} class="bg-yellow-400 rounded-md px-6 py-2 flex items-center gap-2">
    { #if isInstalled }
      <!-- Are we currently downloading this game? -->
      { #if ongoingDownload != null }
        <!-- Loading spinner -->
        <Circle color="#fff" size={15} />

        <p class="text-white font-medium text-sm">Загружаем</p>
        <p class="text-white text-sm text-opacity-70">{ ongoingDownload.getProgress() }/100%</p>
      { :else }
        <p class="text-white font-medium text-sm">Играть</p>
      { /if }
    { :else }
      <RiDownload2Line class="text-white w-4" />

      <p class="text-white font-medium text-sm">Установить</p>
      <p class="text-white text-sm text-opacity-70">Размер: 356.5мб</p>
    { /if }
  </button>

  { #if isInstalled }
    <!-- Settings -->
    <button on:click={() => {
      navigate("/settings/game/" + $GameStore.id);
    }} class="bg-foreground px-3 rounded-md">
      <RiSettings3Line class="text-white w-4" />
    </button>
  { /if }
</div>