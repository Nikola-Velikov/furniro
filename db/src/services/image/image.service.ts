import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import {  map } from 'rxjs/operators';

@Injectable()
export class ImageService {
  private readonly unsplashApiUrl = 'https://api.unsplash.com/search/photos';
  private readonly unsplashApiKey = 'aXpwes8hsNfBTeJLw9FIVP0BMncGlo0e8V_FW0D2jlQ'; // Replace with your Unsplash API key

  constructor(private readonly httpService: HttpService) {}

  async fetchImages(keyword: string, limit: number): Promise<any> {
    try {
      
        const url = `${this.unsplashApiUrl}?query=${keyword}&per_page=${Math.min(limit, 30)}&client_id=${this.unsplashApiKey}`;
    
        return this.httpService.get(url).pipe(
            map(response => response.data.results.map((image: any) => image.urls.small)), // Extract only the URLs
          );
      }
      
     catch (error) {
      throw new NotFoundException('Images not found');
    }
  }
}
