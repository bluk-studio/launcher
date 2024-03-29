<script lang="ts">
  // PostCSS
  import './app.postcss';

  // Router configuration
  import { Router, Route, navigate } from 'svelte-routing';
  import { Explore, Login, Homepage, Game, News, Settings, Downloads, WelcomeSlides } from 'src/routes';

  // Component imports
  import { Sidebar, AppHeader } from 'src/components';
  import { BarLoader } from 'svelte-loading-spinners';
  
  // Importing other modules...
  import { onMount } from 'svelte';
  import { ConfigStore, CurrentRouteStore, ProfileStore, DownloadManagerStore, GamesLibraryStore, getStore } from 'src/stores';
  import type { IDownloadsManagerStore } from 'src/stores';
  import { invoke } from '@tauri-apps/api';
  import { BaseDirectory, createDir, exists } from '@tauri-apps/api/fs';
  import { appLocalDataDir, localDataDir, normalize } from '@tauri-apps/api/path';

  // Variables
  let loading = true;

  async function checkAppDataDir() {
    if (!await exists('org.bluk.launcher', { dir: BaseDirectory.LocalData })) {
      await createDir('org.bluk.launcher', { dir: BaseDirectory.LocalData });
    };
  };

  // OnMount hook to load application configuration
  onMount(async () => {
    // Showing this window
    // await invoke("show_window");

    // We need to create appdata directory for our application.
    await checkAppDataDir();

    // Getting application configuration from it's backend...
    await ConfigStore.fetchFromBackend();

    // Fetching game informations from GameLibrary
    await GamesLibraryStore.fetchFromStorage();

    // Fetching downloads from storage
    await DownloadManagerStore.fetchFromStorage();

    if ((await getStore<IDownloadsManagerStore>(DownloadManagerStore)).length >= 0) {
      // Starting all downloads
      DownloadManagerStore.startAll();
    };

    // Getting user information
    if (await ProfileStore.fetchFromStorage()) {
      // User is logged in
      navigate($ConfigStore.defaultPage);
    } else {
      // User is not logged in - sending user to login page
      navigate("/login");
    };

    loading = false;
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
    { #if $CurrentRouteStore.isApplicationRoute && !$ProfileStore.isAuthorized }
      <div class="w-full flex-grow flex flex-col items-center justify-center bg-background">
        <!-- Loading spinner -->
        <BarLoader color="#292a33" size={60} />
      </div>
    { :else }
      <div class="w-full flex-grow flex overflow-y-hidden">
        <Router url="/welcome">
          <!-- Sidebar -->
          { #if !$CurrentRouteStore.isSidebarHidden }
            <Sidebar />
          { /if }

          <!-- Router content itself -->
          <main class="w-full overflow-y-auto relative">
            <!-- Routes -->
            <Route path="/homepage" component={Homepage} />
            <Route path="/explore" component={Explore} />
            <Route path="/welcome" component={WelcomeSlides} />
            <Route path="/login" component={Login} />
            <Route path="/settings" component={Settings} />
            <Route path="/news" component={News} />
            <Route path="/downloads" component={Downloads} />
            
            <!-- > Game-related routes -->
            <Route path="/store/game/:id" let:params>
              <Game pageType="store" id={params.id} />
            </Route>

            <Route path="/library/game/:id" let:params>
              <Game pageType="library" id={params.id} />
            </Route>
            </main>
        </Router>
      </div>
    { /if }
  { /if }
</div>