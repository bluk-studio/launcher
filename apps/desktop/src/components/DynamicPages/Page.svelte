<script lang="ts">
  import type { IPage } from "./types";

  // Importing and mapping all available component
  import { Components } from './components';

  export let page: IPage;
</script>

<div class="bg-background">
  { #each page.components as component }
    { #if [...Components.keys()].includes(component.type) }
      <svelte:component this={Components.get(component.type)} {...component.attributes} />
    { /if }
  {/each }
</div>