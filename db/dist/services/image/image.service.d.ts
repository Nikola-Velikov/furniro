import { HttpService } from '@nestjs/axios';
export declare class ImageService {
    private readonly httpService;
    private readonly unsplashApiUrl;
    private readonly unsplashApiKey;
    constructor(httpService: HttpService);
    fetchImages(keyword: string, limit: number): Promise<any>;
}
