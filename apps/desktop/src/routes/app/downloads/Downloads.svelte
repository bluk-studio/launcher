<script lang="ts">
    import { onMount } from 'svelte';
    import { CurrentRouteStore, DownloadManagerStore } from 'src/stores';
    
    import RiStopCircleLine from '~icons/ri/stop-circle-line'
    import RiExternalLinkLine from '~icons/ri/external-link-line'
    import RiDeleteBin2Line from '~icons/ri/delete-bin-2-line'

    // Updating CurrentRouteStore
    onMount(() => {
        CurrentRouteStore.setPage({
            isApplicationRoute: true,
            isSidebarHidden: false,
            pageLink: "/downloads",
        });
    });
</script>

<div class="w-full h-full p-3">
    <!-- Header -->
    <div class="mt-5 w-2/3 px-3">
        <h1 class="text-xl text-white">Загрузки</h1>
        <p class="text-sm text-white opacity-70">Наблюдайте и управляйте текущими загрузками</p>
    </div>

    <!-- Divider -->
    <div class="w-full px-3">
        <div class="mt-4 w-full border-b-2 border-light-foreground"></div>
    </div>

    <!-- Downloads themselves -->
    <div class="px-2">
        { #each $DownloadManagerStore as download }
            <div class="w-full bg-foreground my-4 p-6 rounded-xl">
                <!-- Game information (and download controls) -->
                <div class="flex items-center justify-between">
                    <!-- Game information -->
                    <div class="flex items-center">
                        { #await download.getGameInformation() }
                            <!-- Loading placeholders -->
                            <div class="w-12 h-12 rounded-full bg-background"></div>
                        
                            <!-- Game title -->
                            <div class="ml-2">
                                <div class="flex gap-2">
                                    <div class="w-24 h-6 rounded-full bg-background"></div>
                                    <div class="w-8 h-6 rounded-full bg-background"></div>
                                </div>

                                <div class="w-24 h-4 mt-2 rounded-full bg-background"></div>
                            </div>
                        { :then game }
                            <div class="w-12 h-12 rounded-full" style="background-image: url('{ game.image }'); background-size: cover;"></div>
                    
                            <div class="ml-2">
                                <h1 class="text-white text-lg">{ game.title }</h1>
                                
                                <button class="flex items-center text-white text-opacity-80">
                                    <p class="text-xs">Перейти на страницу игры</p>
                                
                                    <RiExternalLinkLine class="w-4 ml-1.5" />
                                </button>
                            </div>
                        { /await }
                    </div>

                    <!-- Download controls -->
                    <div class="flex items-stretch gap-3">
                        <!-- Stop -->
                        <button class="px-5 py-1.5 rounded-md flex items-center justify-center bg-background">
                            <p class="text-xs text-white">Приостановить</p>

                            <RiStopCircleLine class="w-4 text-white ml-1.5" />
                        </button>

                        <!-- Cancel -->
                        <button class="px-5 py-1.5 rounded-md flex items-center justify-center bg-red-500 bg-opacity-60">
                            <p class="text-xs text-white">Отменить</p>
                            
                            <RiDeleteBin2Line class="w-4 text-white ml-1.5" />
                        </button>
                    </div>
                </div>

                <!-- Download progress -->
                <div class="mt-5">
                    <p class="text-white opacity-70">{ download.getProgress() }/100% <span class="text-xs opacity-60">(осталось 20 минут)</span></p>
                    { #if download.currentlyDownloading }
                        <p class="text-white opacity-70 text-xs">Скачиваем: { download.currentlyDownloading.path }</p>
                    { /if }

                    <div class="mt-2 w-full rounded-full h-2 relative bg-background">
                        <div style="width: { download.getProgress() }%;" class="rounded-full h-2 bg-yellow-400"></div>
                    </div>
                </div>
            </div>
        { /each }

        <!-- No more downloads card -->
        <div class="w-full flex flex-col items-center justify-center my-4 p-6 opacity-50">
            <h1 class="text-md text-white">Вы достигли конца списка</h1>
            <p class="text-sm text-white text-opacity-80">Да-да, это конец! Больше активных загрузок нет.</p>
        </div>
    </div>
</div>