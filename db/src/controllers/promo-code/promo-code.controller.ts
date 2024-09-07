import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromoCodeService } from 'src/services/promo-code/promo-code.service';

@ApiTags('Promo Codes')
@Controller('promo-codes')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @ApiOperation({ summary: 'Create a new promo code' })
  @ApiBody({ description: 'Promo code to create', type: String })
  @ApiResponse({
    status: 201,
    description: 'Promo code created successfully',
  })
  @Post('create')
  async createPromoCode(@Body('code') code: string): Promise<any> {
    return this.promoCodeService.createPromoCode(code);
  }
  
  @ApiOperation({ summary: 'Mark a promo code as used' })
  @ApiBody({ description: 'Promo code to mark as used', type: String })
  @ApiResponse({
    status: 200,
    description: 'Promo code marked as used',
  })
  @Post('mark-used')
  async markPromoCodeAsUsed(@Body('code') code: string): Promise<any> {
    return this.promoCodeService.markAsUsed(code);
  }
}
