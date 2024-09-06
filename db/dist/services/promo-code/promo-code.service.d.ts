import { Model } from 'mongoose';
import { PromoCode } from 'src/interfaces/promoCode.interface';
export declare class PromoCodeService {
    private readonly promoCodeModel;
    constructor(promoCodeModel: Model<PromoCode>);
    createPromoCode(code: string): Promise<PromoCode>;
    findUnusedPromoCode(): Promise<PromoCode | null>;
    validatePromoCode(code: string): Promise<number>;
    generatePromoCode(): Promise<string>;
    markAsUsed(code: string): Promise<PromoCode | null>;
}
