import { Module } from '@nestjs/common';
import { TrendsController } from './trends.controller';
import { TrendsService } from './trends.service';
import { GoogleTrendsClient } from '../app/lib/googleTrendsClient';

@Module({
  controllers: [TrendsController],
  providers: [TrendsService, GoogleTrendsClient],
})
export class TrendsModule {}