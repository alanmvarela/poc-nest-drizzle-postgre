import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { CardsModule } from './cards/cards.module';
import { DrizzleProvider } from './db/drizzle.provider';

@Module({
  imports: [
    CardsModule,
  ],
  providers: [
    DrizzleProvider,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
