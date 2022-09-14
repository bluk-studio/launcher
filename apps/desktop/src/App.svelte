<script lang="ts">
  // PostCSS
  import './app.postcss';

  // Router configuration
  import { Router, Route } from 'svelte-routing';
  import { Explore, Login } from 'src/routes';

  // Component imports
  import { Sidebar, AppHeader } from 'src/components';
  import { BarLoader } from 'svelte-loading-spinners';
  
  // Importing other modules...
  import { onMount } from 'svelte';
  import { ConfigStore, CurrentRouteStore, ProfileStore } from 'src/stores';

  // Variables
  let loading = true;

  // OnMount hook to load application configuration
  onMount(async () => {
    // todo
    // Getting application configuration from it's backend...
    await ConfigStore.fetchFromBackend();

    // todo
    // Getting user information
    
    setTimeout(() => {
      loading = false;
    }, 500);
  });
</script>

<div class="w-full h-screen flex flex-col relative bg-background">
  <!-- App header -->
  <AppHeader />

  { #if loading }
    <!-- Loading screen -->
    <main class="w-full flex-grow flex flex-col items-center justify-center">
      <!-- Logotype -->
      <!-- <img class="w-12 mb-6 opacity-60" src="{ $ConfigStore.theme.logotype }" alt=""> -->

      <!-- Loading spinner -->
      <BarLoader color="#292a33" size={60} />
    </main>
  { :else }
    <div class="w-full flex-grow flex overflow-y-hidden">
      <Router url={ $ProfileStore.isAuthorized ? "/explore" : "/login" }>
        <!-- Sidebar -->
        { #if !$CurrentRouteStore.isSidebarHidden }
          <Sidebar />
        { /if }

        <!-- Router content itself -->
        <main class="w-full overflow-y-auto relative">
          <Route path="/explore" component={Explore} />
          <Route path="/login" component={Login} />
        </main>
      </Router>
    </div>
  { /if }
</div>