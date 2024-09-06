"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ImageService = class ImageService {
    constructor(httpService) {
        this.httpService = httpService;
        this.unsplashApiUrl = 'https://api.unsplash.com/search/photos';
        this.unsplashApiKey = 'aXpwes8hsNfBTeJLw9FIVP0BMncGlo0e8V_FW0D2jlQ';
    }
    async fetchImages(keyword, limit) {
        try {
            const url = `${this.unsplashApiUrl}?query=${keyword}&per_page=${Math.min(limit, 30)}&client_id=${this.unsplashApiKey}`;
            return this.httpService.get(url).pipe((0, operators_1.map)(response => response.data.results.map((image) => image.urls.small)));
        }
        catch (error) {
            throw new common_1.NotFoundException('Images not found');
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ImageService);
//# sourceMappingURL=image.service.js.map