import { PromoCodeService } from 'src/services/promo-code/promo-code.service';
export declare class PromoCodeController {
    private readonly promoCodeService;
    constructor(promoCodeService: PromoCodeService);
    createPromoCode(code: string): Promise<any>;
    markPromoCodeAsUsed(code: string): Promise<any>;
}
