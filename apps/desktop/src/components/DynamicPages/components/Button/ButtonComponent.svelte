<script lang="ts">
    import RiExternalLinkLine from '~icons/ri/external-link-line'
    import { CustomPageThemeStore } from 'src/stores';

    export let text: string;
    export let type: "simple" | "pictured" | "link" = "simple";
</script>

{ #if type == "simple" }
    <button style="background-color: { $CustomPageThemeStore.foreground }" class="w-full rounded-md px-6 py-2 flex justify-center items-center">
        <p class="text-white font-medium text-sm">{ text }</p>
    </button>
{ :else if type == "link" }
    <button style="background-color: { $CustomPageThemeStore.foreground }" class="w-full rounded-md px-6 py-2 flex justify-center items-center">
        <p class="text-white font-medium text-sm">{ text }</p>

        <RiExternalLinkLine class="text-white w-4 ml-1.5" />
    </button>
{ :else if type == "pictured" }
    <button class="w-full rounded-md flex items-start bg-foreground h-32" style="background-image: url('https://preview.redd.it/these-are-some-screenshots-of-dynmap-from-our-smp-season-2-v0-lfmgzqgoiby91.png?width=640&crop=smart&auto=webp&s=6e2eb35cae7a0696529e69ff582300cb34b90853'); background-size: cover; background-position: left;">
        <!-- Text -->
        <div class="w-full px-6 py-2 bg-black bg-opacity-60 rounded-t-md flex items-center justify-center">
            <p class="text-white font-medium text-sm">{ text }</p>

            <RiExternalLinkLine class="text-white w-4 ml-1.5" />
        </div>
    </button>
{ /if }