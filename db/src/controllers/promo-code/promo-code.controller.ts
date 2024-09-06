import { Controller, Post, Body } from '@nestjs/common';
import { PromoCodeService } from 'src/services/promo-code/promo-code.service';

@Controller('promo-codes')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post('create')
  async createPromoCode(@Body('code') code: string): Promise<any> {
    return this.promoCodeService.createPromoCode(code);
  }

  @Post('mark-used')
  async markPromoCodeAsUsed(@Body('code') code: string): Promise<any> {
    return this.promoCodeService.markAsUsed(code);
  }
}
