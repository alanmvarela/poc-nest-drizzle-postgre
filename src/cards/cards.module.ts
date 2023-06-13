import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { DrizzleProvider } from 'src/db/drizzle.provider';

@Module({
  controllers: [CardsController],
  providers: [CardsService, DrizzleProvider],
  imports: [],
})
export class CardsModule {}
