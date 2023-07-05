import { Module } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { CardsModule } from './cards/cards.module';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';

@Module({
  imports: [
    CardsModule,
    ConfigModule.forRoot({
      load: configs,
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
