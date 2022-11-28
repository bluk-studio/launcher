<script lang="ts">
  import { get_binding_group_value } from "svelte/internal";
  import type { IContainerComponent } from ".";
    import { Components, type IComponent } from "..";

    // Generated classes
    $: getDirection = () => {
        switch (direction) {
            case 'horizontal':
                return 'flex-row';
        
            case 'vertical':
                return 'flex-col';
        }
    };

    $: getAlign = () => {
        switch (align) {
            case 'start':
                return 'align-start';
        
            case 'center':
                return 'align-center';

            case 'end':
                return 'align-end';
        }
    };

    $: getJustify = () => {
        switch (justify) {
            case 'start':
                return 'justify-start';
        
            case 'center':
                return 'justify-center';

            case 'between':
                return 'justify-between';
            
            case 'evenly':
                return 'justify-evenly';

            case 'end':
                return 'justify-end';
        }
    };

    $: getPadding = () => {
        switch (padding) {
            case 'none':
                break;
        
            case 'sm':
                return 'p-4';

            case 'md':
                return 'p-8';

            case 'lg':
                return 'p-22';
        }
    };

    $: getGap = () => {
        switch (gap) {
            case 'none':
                break;
        
            case 'sm':
                return 'gap-4';

            case 'md':
                return 'gap-8';
        }
    };

    $: getWidth = () => {
        switch (width) {
            case 'auto':
                return 'w-auto';

            case '1/3':
                return 'w-1/3';

            case '2/3':
                return 'w-2/3';

            case 'full':
                return 'w-full';
        }
    };

    export let gap: IContainerComponent['attributes']['gap'] = 'none';
    export let direction: IContainerComponent['attributes']['direction'] = 'horizontal';
    export let align: IContainerComponent['attributes']['align'] = 'start';
    export let justify: IContainerComponent['attributes']['justify'] = 'start';
    export let padding: IContainerComponent['attributes']['padding'] = 'none';
    export let width: IContainerComponent['attributes']['width'] = 'auto';
    export let childrens: IContainerComponent['attributes']['childrens'] = [];
</script>

<div class="flex { getDirection() } { getAlign() } { getJustify() } { getPadding() } { getGap() } { getWidth() }">
    { #each childrens as children }
        <svelte:component this={Components.get(children.type)} {...children.attributes} />
    { /each }
</div>