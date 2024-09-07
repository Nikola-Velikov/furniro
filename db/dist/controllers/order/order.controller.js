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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const order_1 = require("../../dto/order");
const validate_object_id_pipe_1 = require("../../pipes/validate-object-id.pipe");
const gateway_service_1 = require("../../services/gateway/gateway.service");
const order_service_1 = require("../../services/order/order.service");
const products_service_1 = require("../../services/products/products.service");
const promo_code_service_1 = require("../../services/promo-code/promo-code.service");
const stripe_1 = require("stripe");
let OrderController = class OrderController {
    constructor(orderService, productService, gatewayService, promoCodeService) {
        this.orderService = orderService;
        this.productService = productService;
        this.gatewayService = gatewayService;
        this.promoCodeService = promoCodeService;
        this.stripe = new stripe_1.default('sk_test_51NmgFuKfIAbVTk5mD0KYAAWCdRfPkb14ViemJ6ZbojShgpm17Zge1D8KelnoeNohSsG4cUxquvfOMVoxnkKmzQ8n00YI3fbhqs', {
            apiVersion: "2024-06-20",
        });
    }
    async createCheckoutSession(order, promoCode) {
        await this.orderService.create(order);
        if (!order || !order.products || order.products.length === 0) {
            throw new common_1.NotFoundException('Order details are missing');
        }
        if (!order.email) {
            throw new common_1.NotFoundException('Email is required');
        }
        const lineItems = [];
        for (const product of order.products) {
            const productDetails = await this.productService.findOne(product.productId);
            if (!productDetails) {
                throw new common_1.NotFoundException(`Product with ID ${product.productId} not found`);
            }
            if (productDetails.quantity < product.quantity) {
                throw new common_1.NotFoundException(`Too much quantity for product ${productDetails.name}`);
            }
            const discountPercentage = promoCode ? await this.promoCodeService.validatePromoCode(promoCode) : 0;
            const unitAmount = productDetails.discountedPrice;
            const discountedPrice = discountPercentage > 0 ? (unitAmount - (unitAmount * discountPercentage / 100)).toFixed(2) : unitAmount;
            lineItems.push({
                price_data: {
                    currency: 'bgn',
                    product_data: {
                        name: product.name,
                        images: ['http://localhost:3000/uploads/' + productDetails.coverPhoto],
                    },
                    unit_amount: discountedPrice * 100,
                },
                quantity: product.quantity,
            });
        }
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card',],
            line_items: lineItems,
            mode: 'payment',
            customer_email: order.email,
            success_url: 'http://localhost:3000/orders/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel',
        });
        const url = { checkoutUrl: session.url };
        return url;
    }
    async handleSuccess(sessionId, res) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const payload = { customer_email: session.customer_email };
            this.gatewayService.sendEmailPayloadToClients(payload);
            const promoCode = await this.promoCodeService.generatePromoCode();
            await this.promoCodeService.createPromoCode(promoCode);
            const observable$ = this.client.emit('payment.success', { customer_email: session.customer_email, promoCode: promoCode });
            await (0, rxjs_1.lastValueFrom)(observable$);
            return res.redirect('http://localhost:3000/success-page');
        }
        else {
            throw new common_1.NotFoundException('Payment not completed');
        }
    }
    async handleCancel(res) {
        return res.redirect('http://localhost:3000/cancel-page');
    }
    async findAll() {
        return this.orderService.findAll();
    }
    async findOne(id) {
        return this.orderService.findOne(id);
    }
    async update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    async delete(id) {
        return this.orderService.delete(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3001,
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], OrderController.prototype, "client", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new checkout session' }),
    (0, swagger_1.ApiBody)({ type: order_1.OrderDTO, description: 'Order details' }),
    (0, swagger_1.ApiQuery)({ name: 'promoCode', required: false, description: 'Optional promo code for discount' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Checkout session created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order or product details missing' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('promoCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_1.OrderDTO, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createCheckoutSession", null);
__decorate([
    (0, common_1.Get)('success'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle successful payment' }),
    (0, swagger_1.ApiQuery)({ name: 'session_id', description: 'Stripe session ID' }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'Redirects to success page' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not completed' }),
    __param(0, (0, common_1.Query)('session_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "handleSuccess", null);
__decorate([
    (0, common_1.Get)('cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Handle payment cancellation' }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'Redirects to cancel page' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "handleCancel", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all orders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Orders retrieved successfully', type: [order_1.OrderDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a specific order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order retrieved successfully', type: order_1.OrderDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiBody)({ type: order_1.OrderDTO, description: 'Updated order details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order updated successfully', type: order_1.OrderDTO }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_1.OrderDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an order' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order deleted successfully', type: order_1.OrderDTO }),
    __param(0, (0, common_1.Param)('id', validate_object_id_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService, products_service_1.ProductsService, gateway_service_1.GatewayService, promo_code_service_1.PromoCodeService])
], OrderController);
//# sourceMappingURL=order.controller.js.map