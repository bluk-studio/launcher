<script lang="ts">
  import type { IPage } from "./types";
  import { CustomPageThemeStore } from "src/stores";

  // Importing and mapping all available component
  import { Components } from './components';

  export let page: IPage;
</script>

<div style="background-color: { $CustomPageThemeStore.background }">
  { #each page.components as component }
    { #if [...Components.keys()].includes(component.type) }
      <svelte:component this={Components.get(component.type)} {...component.attributes} />
    { /if }
  {/each }
</div>