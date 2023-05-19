<script lang="ts">
    const news = [
        {
            title: "Карта сервера",
            subtitle: "Мы немного обновили онайлн карту сервера. Она теперь доступна по адресу ...",
            image: "https://preview.redd.it/these-are-some-screenshots-of-dynmap-from-our-smp-season-2-v0-lfmgzqgoiby91.png?width=640&crop=smart&auto=webp&s=6e2eb35cae7a0696529e69ff582300cb34b90853"
        },
        {
            title: "Первый тестовый бета-запуск",
            subtitle: "Наконец-то! Совсем скоро пройдёт первый тестовый запуск данного сервера, на который может попасть любой желающий!",
        },
        {
            title: "Q&A с командой",
            subtitle: "Совсем скоро пройдёт первый Q&A с командой данного проекта, на котором вы сможете назадавать всеразличных вопросов.",
            image: ""
        }
    ];

    $: randomNews = news[Math.floor(Math.random() * news.length)];
    $: hasImage = Boolean(randomNews.image);
</script>

<div class="bg-foreground rounded-md w-full flex items-stretch my-2">
    <!-- Title and text -->
    <div class="{ hasImage ? "w-1/2" : "w-full" } p-4">
        <!-- Title -->
        <h1 class="text-white text-lg font-medium">{ randomNews.title }</h1>
        <p class="text-white text-xs text-opacity-80">{ randomNews.subtitle }</p>
    
        <button class="bg-background rounded-md px-3 py-1.5 mt-3">
            <p class="text-white text-sm">Перейти</p>
        </button>
    </div>

    <!-- Image -->
    { #if hasImage }
        <div class="w-1/2 relative rounded-r-md">
            <div class="w-full h-full rounded-r-md" style="background-image: url('{ randomNews.image }'); background-size: cover;"></div>

            <!-- <img src="https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/master/pass/BlackForest-Germany-GettyImages-147180370.jpg" /> -->
        </div>
    { /if }
</div>