<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { ICounterComponent } from ".";

    let interval;

    onMount(async () => {
        if (fetchOptions) {
            text = "Загрузка...";
            
            // Fetching text from api
            interval = setInterval(async () => {
                text = await fetchFromAPI();
            }, fetchOptions.interval);
        };
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    async function fetchFromAPI(): Promise<string> {
        const response = await fetch(fetchOptions.link);
        
        if (response.status == 200) {
            return response.text();
        } else {
            return "Error while processing request";
        };
    };

    export let fetchOptions: ICounterComponent['attributes']['fetchOptions'] | null = null;
    export let text: String = "";
</script>

<div class="px-6 py-2 flex items-center bg-foreground rounded-md">
    <p class="text-white text-sm">{ text }</p>
</div>