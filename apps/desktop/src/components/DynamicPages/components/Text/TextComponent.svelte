<script lang="ts">
  import type { ITextComponent } from ".";


    $: textSize = () => {
        switch (size) {
            case 'sm':
                return 'text-sm';
            case 'normal':
                return 'text-base';
            case 'medium':
                return 'text-md';
            case 'huge':
                return 'text-2xl font-medium';
        }
    };

    export let size: ITextComponent['attributes']['size'] = 'normal';
    export let text: String;
    export let color: String = "text-white";
</script>

<p class="{ color } { textSize() }">{ text }</p>