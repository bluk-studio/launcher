<script lang="ts">
  import { Components } from "..";
  import type { IComponent } from "../../types";
  import { GameStore } from "../../../../stores";

  $: doSubcomponentsExists = subcomponents.length > 0;

  // Exporting attributes
  export let title: String = "test";
  export let subtitle: String = "hello there";
  export let withGameImage: Boolean = true;

  // Subcomponents configuration
  export let subcomponents: Array<IComponent> = [];
</script>

<!-- Hero component -->
<div class="w-full flex bg-red-500 items-center { doSubcomponentsExists ? "justify-evenly" : "justify-center" } py-32">
  <!-- Title and subtitle -->
  <div class="w-3/4">
    { #if withGameImage }
      <div class="w-20 mb-5" style="background-image: url('{ $GameStore.image }'); background-size: cover;"></div>
    { /if }

    <div>
      <h1 class="text-white text-5xl">{ title }</h1>
      <h2 class="text-sm text-white opacity-80">{ subtitle }</h2>
    </div>
  </div>

  <!-- Subcomponents -->
  { #if doSubcomponentsExists }
    <div class="w-1/4">
      { #each subcomponents as subcomponent }
        <svelte:component this={Components.get(subcomponent.type)} {...subcomponent.atttributes} />
      { /each }
    </div>
  { /if }
</div>