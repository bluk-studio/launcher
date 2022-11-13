<script lang="ts">
  import { CurrentRouteStore } from "src/stores";
  import { onMount } from "svelte";

  onMount(() => {
    // Updating CurrentRouteStore settings
    CurrentRouteStore.showSidebar();
    CurrentRouteStore.setApplicationRoute(true);
    CurrentRouteStore.setPageLink("/news");
  })
</script>