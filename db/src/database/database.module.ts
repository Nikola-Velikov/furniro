import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://mongo:YLOVgMCukgXMaJtBhUaxUHaZlbfzFeJs@autorack.proxy.rlwy.net:36381')
  ],
})
export class DatabaseModule {}
