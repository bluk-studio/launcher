import { IDownloadAsset, IDownloadManifest } from "$types/entities/DownloadManifest";
import { ApiProperty } from "@nestjs/swagger";

export class DownloadAssetResponse implements IDownloadAsset {
    @ApiProperty({
        description: "Относительное местоположение файла"
    })
    path: string;
    
    @ApiProperty({
        description: "Прямая ссылка на файл, который нужно скачать."
    })
    url: string;

    @ApiProperty({
        description: "Хэш данного файла для проверки"
    })
    hash: string;

    @ApiProperty({
        description: "Размер данного файла в килобайтах"
    })
    size: number;
};

export class DownloadManifestResponse implements IDownloadManifest {
    @ApiProperty({
        description: "ID игры, к которому привязан данный манифест."
    })
    gameId: string;

    @ApiProperty({
        description: "Версия данного манифеста"
    })
    version: string;

    @ApiProperty({
        description: "Массив с файлами, которые нужно скачать"
    })
    assets: IDownloadAsset[];
};