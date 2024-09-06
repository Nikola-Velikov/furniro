import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PromoCode } from 'src/interfaces/promoCode.interface';

@Injectable()
export class PromoCodeService {
  constructor(@InjectModel('PromoCode') private readonly promoCodeModel: Model<PromoCode>) {}

  async createPromoCode(code: string): Promise<PromoCode> {
    const promoCode = new this.promoCodeModel({ code });
    return promoCode.save();
  }

  async findUnusedPromoCode(): Promise<PromoCode | null> {
    return this.promoCodeModel.findOne({ used: false }).exec();
  }

  async validatePromoCode(code: string): Promise<number> {
    const promoCode = await this.promoCodeModel.findOne({ code, used: false }).exec();
    if (!promoCode) {
      return 0; // No discount if promo code is invalid or used
    }else{
        await this.promoCodeModel.findOneAndUpdate({ code, used: true }).exec();
    }
    return promoCode.percentage; 
  }

  async generatePromoCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let promoCode = '';
    for (let i = 0; i < 10; i++) {
      promoCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return promoCode;
  }

  async markAsUsed(code: string): Promise<PromoCode | null> {
    return this.promoCodeModel.findOneAndUpdate(
      { code },
      { used: true },
      { new: true }
    ).exec();
  }
}
