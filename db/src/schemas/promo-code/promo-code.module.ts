import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoCodeSchema } from './promoCode';
import { PromoCodeController } from 'src/controllers/promo-code/promo-code.controller';
import { PromoCodeService } from 'src/services/promo-code/promo-code.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'PromoCode', schema: PromoCodeSchema }])],
  controllers: [PromoCodeController],
  providers: [PromoCodeService],
  exports: [PromoCodeService]
})
export class PromoCodeModule {}
