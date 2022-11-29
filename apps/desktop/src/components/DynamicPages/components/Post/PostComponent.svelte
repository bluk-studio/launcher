<script lang="ts">
    import { CustomPageThemeStore } from "src/stores";
</script>

<div style="background-color: { $CustomPageThemeStore.foreground }" class="rounded-md w-full flex items-stretch my-2">
    <!-- Title and text -->
    <div class="w-1/2 p-4">
        <!-- Title -->
        <h1 style="color: { $CustomPageThemeStore.text }" class="text-lg font-medium">Lorem ipsum dolor sit.</h1>
        <p style="color: { $CustomPageThemeStore.text }" class="text-xs opacity-80">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed libero tempora beatae.</p>
    
        <button style="background-color: { $CustomPageThemeStore.background }" class="rounded-md px-3 py-1.5 mt-3">
            <p style="color: { $CustomPageThemeStore.text }" class="text-sm">Перейти</p>
        </button>
    </div>

    <!-- Image -->
    <div class="w-1/2 relative rounded-r-md">
        <div class="w-full h-full rounded-r-md" style="background-image: url('https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg'); background-size: cover;"></div>

        <!-- <img src="https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg" /> -->
    </div>
</div>