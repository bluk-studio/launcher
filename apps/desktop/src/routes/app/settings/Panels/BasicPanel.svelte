<script lang="ts">
    import { ProfileStore } from 'src/stores';
</script>

<!-- Category title -->
<div class="mt-5 w-2/3 px-3">
    <h1 class="text-xl text-white">Базовые настройки</h1>
    <p class="text-sm text-white opacity-70">Всё самое базовое - начиная от имени пользователя и заканчивая аватаркой.</p>
</div>

<div class="w-full px-3">
    <div class="mt-4 w-full border-b-2 border-light-foreground"></div>
</div>

<!-- Username -->
<div class="w-full flex items-start px-3 my-8">
    <!-- Field title -->
    <div class="w-1/3">
        <h1 class="text-md text-white font-medium">Имя пользователя</h1>
        <p class="text-xs text-white opacity-70 w-2/3">Данное имя будет отображаться только в лаунчере.</p>
    </div>

    <!-- Field itself -->
    <div class="w-2/3 rounded-lg px-4 py-1.5 bg-background border-2 border-light-foreground">
        <input class="text-white bg-background" type="text" value={$ProfileStore.username}>
    </div>
</div>

<div class="w-full flex items-start px-3 my-8">
    <!-- Field title -->
    <div class="w-1/3 pr-6">
        <h1 class="text-md text-white font-medium">Запускать лаунчер при старте системы?</h1>
        <p class="text-xs text-white opacity-70 w-2/3">Наш лаунчер автоматически запустится как только вы включите ваш компьютер.</p>
    </div>

    <!-- Field itself -->
    <div class="w-2/3">
        <div class="w-min rounded-md flex items-center bg-background">
        <div class="rounded-l-md px-4 py-1.5 bg-green-400">
            <p class="text-white">Да</p>
        </div>
        
        <div class="rounded-r-md px-4 py-1.5">
            <p class="text-white opacity-70">Нет</p>
        </div>
        </div>
    </div>
</div>

<!-- Odzi.dog link -->
<div class="w-full py-32 flex items-center justify-center">
    <div class="w-2/3 py-6 px-6 rounded-xl bg-background">
        <h1 class="text-xl text-white">Хотите изменить что-то другое?</h1>
        <p class="text-sm text-white opacity-70">Другие базовые настройки вашего аккаунта - такие как <span class="border-b-2 border-light-foreground">аватарка</span>, <span class="border-b-2 border-light-foreground">почта</span> или <span class="border-b-2 border-light-foreground">ник в лаунчере</span> - можно изменить только на сервисе odzi.dog.<br /><br />Для того, что бы это сделать, нажмите на кнопку ниже.</p>
    </div>
</div>