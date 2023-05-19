<script lang="ts">
    // Importing components and icons
    import RiTrophyLine from '~icons/ri/trophy-line'
    import RiArrowDownSLine from '~icons/ri/arrow-down-s-line'

    // Exporting component settings
    export let players: Array<{ nickname: string, avatar?: string, kills: number }> = [
        { nickname: "dogleash", kills: 15, avatar: "https://cdn.discordapp.com/avatars/155749532615966720/01498f65baee72cda3dba58febaf9eb6.webp?size=128" },
        { nickname: "kys", kills: 10 },
        { nickname: "wimp", kills: 8 },
        { nickname: "dick", kills: 4 }
    ]
</script>

<div class="w-full rounded-md bg-foreground p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <!-- Title -->
        <div class="flex items-center">
            <RiTrophyLine class="w-5 text-white" />

            <h1 class="text-white text-base font-medium ml-1.5">Топ игроков</h1>
        </div>

        <!-- Info -->
        <div class="flex items-center text-white text-opacity-60">
            <p class="text-xs mr-1">по убийствам</p>
            
            <RiArrowDownSLine class="w-4" />
        </div>
    </div>

    <!-- Top itself -->
    <div class="mt-4">
        { #each players as player }
            { @const position = players.findIndex((x) => x == player) + 1 }

            <div class="flex items-stretch my-5">
                <!-- Position -->
                <div class="{ position <= 3 ? `text-md bg-yellow-500` : "text-sm text-opacity-70 bg-light-foreground" } text-white rounded-md p-2">
                    <h1>{ position }.</h1>
                </div>

                <!-- Account -->
                <div class="ml-2 flex items-center">
                    <!-- Avatar -->
                    <div class="w-8 h-8 rounded-full" style="background-image: url('{ player.avatar ?? "https://res.cloudinary.com/lococovu-cdn/image/upload/b_rgb:000000,bo_120px_solid_rgb:000000/v1662642325/bluk-logotype-white_tkmmqp.png" }'); background-size: cover; background-position: center;"></div>
                
                    <!-- Account info -->
                    <div class="ml-2">
                        <h1 class="text-white font-medium">{ player.nickname }</h1>
                        <p class="text-white text-opacity-70 text-xs">{ player.kills } убийств</p>
                    </div>
                </div>
            </div>
        { /each }
    </div>
</div>