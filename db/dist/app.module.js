"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./schemas/products/products.module");
const database_module_1 = require("./database/database.module");
const category_module_1 = require("./schemas/category/category.module");
const reviews_module_1 = require("./schemas/reviews/reviews.module");
const feedbacks_module_1 = require("./schemas/feedbacks/feedbacks.module");
const mail_list_module_1 = require("./schemas/mail-list/mail-list.module");
const schedule_1 = require("@nestjs/schedule");
const orders_module_1 = require("./schemas/orders/orders.module");
const gateway_websockets_module_1 = require("./services/gateway/gateway.websockets.module");
const gateway_service_1 = require("./services/gateway/gateway.service");
const promo_code_module_1 = require("./schemas/promo-code/promo-code.module");
const image_controller_1 = require("./controllers/image/image.controller");
const image_service_1 = require("./services/image/image.service");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, products_module_1.ProductsModule, category_module_1.CategoryModule, reviews_module_1.ReviewModule, feedbacks_module_1.FeedbacksModule, mail_list_module_1.MailListModule, orders_module_1.OrderModule, gateway_websockets_module_1.GatewayModule, promo_code_module_1.PromoCodeModule, axios_1.HttpModule, schedule_1.ScheduleModule.forRoot(),],
        controllers: [app_controller_1.AppController, image_controller_1.ImageController],
        providers: [app_service_1.AppService, gateway_service_1.GatewayService, image_service_1.ImageService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map