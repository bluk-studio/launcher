<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // Variables
  let isShown = true;

  onMount(() => {
    setTimeout(() => {
      isShown = false;
    }, 25);
  });
</script>

{ #if isShown }
  <div out:fade class="absolute z-50 w-full h-screen bg-background"></div>
{ /if }