<script lang="ts">
  import { CustomPageThemeStore, GameStore, GamesLibraryStore } from 'src/stores';
  import RiDownload2Line from '~icons/ri/download-2-line'

  $: isInstalled = Boolean($GamesLibraryStore.games.find((x) => x.id == $GameStore.id));
</script>

<button style="background-color: { $CustomPageThemeStore.accent }" class="rounded-md px-6 py-2 flex items-center">
  { #if isInstalled }
    <p style="color: { $CustomPageThemeStore.text }" class="font-medium text-sm">Играть</p>
  { :else }
    <RiDownload2Line class="text-white w-4" />

    <p style="color: { $CustomPageThemeStore.text }" class="mx-2 font-medium text-sm">Установить</p>
    <p style="color: { $CustomPageThemeStore.text }" class="text-sm opacity-70">Размер: 20мб</p>
  { /if }
</button>