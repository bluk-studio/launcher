<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { fade, fly } from "svelte/transition";
    import { ProfileStore, ConfigStore } from "src/stores";

    onMount(() => {
        // If user is authorized - send him to default page
        if ($ProfileStore.isAuthorized) {
            navigate($ConfigStore.defaultPage);
        };
    });

    // Helper functions
    function nextSlide() {
        // Getting current slide information
        const slide = slides[currentSlideIndex];
        if (!slide) return;

        // Next slide action
        if (slide.buttonAction == 'next-slide') {
            // Checking if we have another slide (and updating currentSlideIndex if yes)
            if (slides.length >= currentSlideIndex + 1) currentSlideIndex++;
        // Authorization action
        } else if (slide.buttonAction == 'authorize') {
            // Redirecting user to authorization page
            navigate("/login");
        };

        // Triggering svelte transition and anmating background
        // animateBackground();
        uniqueSlideId = {};
    };

    function previousSlide() {
        // Checking if we can switch to previous slide
        if (currentSlideIndex > 0) currentSlideIndex--;

        // Triggering svelte transition and animating background
        // animateBackground();
        uniqueSlideId = {};
    };

    function animateBackground() {
        // Getting container component
        const component = document.getElementById("welcome-page");

        const positions = [
            "top",
            "bottom",
            "left",
            "top left",
            "bottom left",
            "right",
            "top right",
            "bottom right",
            "center"
        ];

        // Updating it's background-position
        component.style.backgroundPosition = positions[Math.floor(Math.random() * positions.length)];
    };

    // Slide interface
    interface ISlide {
        image?: string,
        title: string,
        text: string,
        buttonAction: 'next-slide' | 'authorize',
    };

    // Variables
    let currentSlideIndex: number = 0;
    let uniqueSlideId = {};
    $: currentSlide = slides[currentSlideIndex];

    const slides: Array<ISlide> = [
        {
            image: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/319/warning_26a0-fe0f.png",
            title: "Дисклеймер",
            text: `Сразу хотим вас предупредить - данное приложение находится <span class="border-b-2 border-yellow-400 border-opacity-70">в стадии раннего тестирования</span>, поэтому тут может быть большое количеств багов и лагов.<br/><br/>Пожалуйста, сообщайте о всех таких багах в наш Дискорд.`,
            buttonAction: 'next-slide'
        },
        {
            title: "Кстати, у нас же есть соц. сети!",
            text: `Самое главное тут - это наш <a href="" class="border-b-2 border-yellow-400 border-opacity-70">Дискорд</a>, в котором вы сможете найти новых друзей, сокомандников и просто пообщаться!`,
            buttonAction: 'authorize'
        }
    ];
</script>

<style>
    #welcome-page {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1000' height='600' preserveAspectRatio='none' viewBox='0 0 1000 600'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1010%26quot%3b)' fill='none'%3e%3cpath d='M37.5 150C96.91 100.1 94.41 96.11 150 40.91C169.95 21.11 163.42 6.86 188.57 0C238.42 -13.6 244.28 0 300 0C339.79 0 356.27 -24.67 379.59 0C427.16 50.33 414.46 73.9 441.78 150C449.67 171.97 431.16 190.76 450 196.15C510.27 213.4 527.82 208.6 600 195.28C652.82 185.53 700 172.64 700 150C700 127.36 642.35 137.72 600 104.72C546.1 62.72 507.5 31.5 507.5 0C507.5 -20.86 553.75 0 600 0C675 0 675 0 750 0C816.66 0 863.67 -34.4 883.33 0C906.53 40.6 829.84 91.81 835.71 150C838.17 174.43 870.6 165.25 900 165.25C908.51 165.25 904.23 156.12 911.54 150C979.23 93.39 1007.34 39.8 1050 39.8C1076.57 39.8 1050 94.9 1050 150C1050 225 1050 225 1050 300C1050 375 1050 375 1050 450C1050 525 1087.5 562.5 1050 600C1012.5 637.5 975 600 900 600C825 600 825 600 750 600C675 600 675 600 600 600C525 600 525 600 450 600C375 600 375 600 300 600C225 600 225 600 150 600C75 600 37.5 637.5 0 600C-37.5 562.5 0 525 0 450C0 375 0 375 0 300C0 233.45 -14.32 224.19 0 166.9C4.43 149.19 21.91 163.1 37.5 150' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M300 297.86C298.54 297.86 297.97 298.47 297.76 300C287.38 374.54 277.89 378.31 278.82 450C279.01 464.85 288.77 473.08 300 473.08C312.59 473.08 325.05 466.38 326.47 450C332.55 379.84 327.02 369.11 315 300C313.79 293.04 307.16 297.86 300 297.86' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M750 210C733.64 210 718.47 252.88 713.27 300C705.23 372.88 708.16 381.99 723.53 450C726.52 463.24 737.28 462.5 750 462.5C759.52 462.5 766.24 460.34 768 450C780.08 379.09 783.22 373.78 777.69 300C774.22 253.78 765.85 210 750 210' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M153.33 150C224.5 74.99 223.87 73.48 295.71 0C297.2 -1.52 297.86 0 300 0C301.53 0 302.28 -1.3 303.06 0C347.48 73.7 391.28 80.31 390.41 150C389.75 202.45 345.96 197.9 300 244.29C271.65 272.9 253.19 264.08 241.79 300C220.54 366.94 217 382.7 234.71 450C246.1 493.28 265.37 521.15 300 521.15C338.83 521.15 346.09 490.29 381.62 450C421.09 405.25 407.89 392.05 450 351.06C484.93 317.05 492.33 324.59 535.71 300C567.33 282.08 570.08 266.04 600 266.04C620.59 266.04 636.73 279.43 636.73 300C636.73 335.54 619.53 339.72 600 378.26C581.52 414.72 560.71 417.4 560.71 450C560.71 471.2 577.48 471.99 600 485.87C672.12 530.32 675.86 524.81 750 566.67C776.94 581.88 802.17 590.96 802.17 600C802.17 607.62 776.09 600 750 600C675 600 675 600 600 600C525 600 525 600 450 600C375 600 375 600 300 600C225 600 225 600 150 600C93.75 600 64.96 632.04 37.5 600C0.68 557.04 36.75 521.94 21.43 450C18 433.9 2.29 439.97 0 423.91C-8.42 364.97 0 361.96 0 300C0 259.86 -24.65 243.79 0 219.72C50.35 170.57 75.55 187.42 150 153.57C152.22 152.56 151.65 151.77 153.33 150' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M600 33.96C580.39 23.41 570 10.22 570 0C570 -6.76 585 0 600 0C675 0 675 0 750 0C786.9 0 823.81 -18.28 823.81 0C823.81 30.16 797.91 89.6 750 96.87C686.01 106.58 670.39 71.84 600 33.96' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M959.62 150C1000.04 109.38 1022.15 78.06 1050 78.06C1067.34 78.06 1050 114.03 1050 150C1050 225 1050 225 1050 300C1050 375 1050 375 1050 450C1050 525 1080.38 555.38 1050 600C1029.32 630.38 973.85 630.08 947.87 600C909.08 555.08 941 520.64 920.45 450C917.07 438.38 906.09 446.22 900 435.48C863.55 371.22 835.38 362.99 835.38 300C835.38 259.65 869.37 265.8 900 228.81C931.49 190.8 925.04 184.75 959.62 150' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M236.67 150C236.67 120.63 272.17 83.72 300 83.72C323.35 83.72 339.04 119.14 339.04 150C339.04 172.63 321.92 190.71 300 190.71C270.74 190.71 236.67 174.12 236.67 150' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M750 18.75C728.92 18.75 702.63 4.86 702.63 0C702.63 -4.52 726.32 0 750 0C757.14 0 764.29 -3.54 764.29 0C764.29 5.84 759.75 18.75 750 18.75' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1007.69 150C1007.69 127.15 1036.96 116.33 1050 116.33C1058.12 116.33 1050 133.16 1050 150C1050 208.93 1060.26 267.86 1050 267.86C1039.1 267.86 1007.69 202.92 1007.69 150' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M0 272.54C63.58 248.32 85.53 233.33 150 242.86C178.44 247.06 179.53 267.89 185.82 300C199.82 371.46 163.12 385.23 190.59 450C220.21 519.84 241.97 569.23 300 569.23C365.06 569.23 370.29 511.32 436.76 450C445.29 442.13 442.24 430.85 450 430.85C459.58 430.85 460.8 440.33 471.43 450C535.8 508.6 532.8 512.65 600 567.39C624.87 587.65 655.56 591.25 655.56 600C655.56 607.55 627.78 600 600 600C525 600 525 600 450 600C375 600 375 600 300 600C225 600 225 600 150 600C129.81 600 116.1 615.78 109.62 600C85.3 540.78 116.95 517.11 88.39 450C62.14 388.31 33.88 399.89 0 342.39C-10.31 324.89 0 321.19 0 300C0 286.27 -11.42 276.89 0 272.54' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M893.08 300C893.08 295.68 895.18 292.37 900 292.37C923.64 292.37 950 294.54 950 300C950 305.62 921.74 314.52 900 314.52C893.28 314.52 893.08 306.75 893.08 300' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1027.66 600C1027.66 568.11 1044.31 519.23 1050 519.23C1055.48 519.23 1058.75 568.36 1050 600C1047.58 608.75 1027.66 608.5 1027.66 600' stroke='rgba(45%2c 47%2c 51%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1010'%3e%3crect width='1000' height='600' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: cover;
        /* background-position: top; */

        /* Transition */
        /* transition: background-position .5s ease-in-out; */
    }
</style>

<main id="welcome-page" class="overflow-hidden w-full h-full bg-background flex items-center justify-center">
    <!-- Card -->
    { #key uniqueSlideId }
        <div in:fade class="w-5/12 lg:w-1/3 rounded-xl flex flex-col items-center justify-center px-6 py-8 bg-foreground">
            <!-- Slide image -->
            { #if currentSlide.image }
                <img src={ currentSlide.image } alt="">
            { /if }

            <!-- Slide title with text -->
            <h1 class="text-lg text-white">{ currentSlide.title }</h1>
            
            <div class="my-4 flex-grow text-center">
                <p class="text-xs text-white text-opacity-80">{ @html currentSlide.text }</p>
            </div>

            <div class="w-full flex gap-4">
                <!-- Previous slide button -->
                { #if currentSlideIndex > 0 }
                    <button on:click={() => {
                        previousSlide();
                    }} class="w-full px-3 py-1.5 mt-4 bg-light-foreground transition ease-it-out duration-200 hover:bg-background rounded-lg text-white text-opacity-60 flex items-center justify-center disabled:cursor-not-allowed">
                        <p class="text-sm">Назад</p>
                    </button>
                { /if }

                <!-- Next slide button -->
                <button on:click={() => {
                    nextSlide();
                }} class="w-full px-3 py-1.5 mt-4 bg-light-foreground transition ease-it-out duration-200 hover:bg-background rounded-lg text-white text-opacity-60 flex items-center justify-center disabled:cursor-not-allowed">
                    <p class="text-sm">Продолжить</p>
                </button>
            </div>
        </div>
    { /key }
</main>