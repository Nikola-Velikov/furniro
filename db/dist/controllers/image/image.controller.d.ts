import { ImageService } from 'src/services/image/image.service';
export declare class ImageController {
    private readonly imagesService;
    constructor(imagesService: ImageService);
    generateImages(limit: number, keyword: string): Promise<any>;
}
