import { Controller, Get, Post, Query, Body, BadRequestException, ValidationPipe } from '@nestjs/common';
import { TrendsService } from './trends.service';
import { TrendsQueryDto, BatchRequestDto } from './dto/trends.dto';

// Update the response interface to include error
interface TrendsResponse<T> {
  data: T | null;
  keyword?: string;
  term?: string;
  geo?: string;
  error?: string;
}

@Controller('trends')
export class TrendsController {
  constructor(private readonly trendsService: TrendsService) {}

  @Get('autocomplete')
  async getAutoComplete(
    @Query('term', new ValidationPipe({ transform: true })) term: string
  ): Promise<TrendsResponse<any>> {
    if (!term) {
      throw new BadRequestException('Please provide a valid term for autocomplete');
    }
    const data = await this.trendsService.fetchAutoComplete(term);
    return { term, data };
  }

  @Get('daily')
  async getDailyTrends(
    @Query('geo', new ValidationPipe({ transform: true })) geo: string = 'US'
  ): Promise<TrendsResponse<any>> {
    const data = await this.trendsService.fetchDailyTrends(geo);
    return { geo, data };
  }

  @Get('interestOverTime')
  async getInterestOverTime(
    @Query() query: TrendsQueryDto
  ): Promise<TrendsResponse<any>> {
    if (!query.keyword) {
      throw new BadRequestException('Please provide a valid keyword');
    }
    const startDate = query.startTime ? new Date(query.startTime) : undefined;
    const data = await this.trendsService.fetchInterestOverTime(query.keyword, startDate);
    return { keyword: query.keyword, data };
  }

  @Get('interestByRegion')
  async getInterestByRegion(
    @Query(new ValidationPipe({ transform: true })) query: TrendsQueryDto
  ): Promise<TrendsResponse<any>> {
    if (!query.keyword) {
      throw new BadRequestException('Please provide a valid keyword');
    }
    const startDate = query.startTime ? new Date(query.startTime) : undefined;
    const data = await this.trendsService.fetchInterestByRegion(
      query.keyword,
      startDate,
      query.geo
    );
    return { keyword: query.keyword, geo: query.geo, data };
  }

  @Get('realTime')
  async getRealTimeTrends(
    @Query('geo', new ValidationPipe({ transform: true })) geo: string = 'US'
  ): Promise<TrendsResponse<any>> {
    const data = await this.trendsService.fetchRealTimeTrends(geo);
    return { geo, data };
  }

  @Get('relatedQueries')
  async getRelatedQueries(
    @Query('keyword', new ValidationPipe({ transform: true })) keyword: string
  ): Promise<TrendsResponse<any>> {
    if (!keyword) {
      throw new BadRequestException('Please provide a valid keyword');
    }
    const data = await this.trendsService.fetchRelatedQueries(keyword);
    return { keyword, data };
  }

  @Get('relatedTopics')
  async getRelatedTopics(
    @Query('keyword', new ValidationPipe({ transform: true })) keyword: string
  ): Promise<TrendsResponse<any>> {
    if (!keyword) {
      throw new BadRequestException('Please provide a valid keyword');
    }
    const data = await this.trendsService.fetchRelatedTopics(keyword);
    return { keyword, data };
  }

  @Post('batch')
  async getBatchTrends(
    @Body() batchRequest: BatchRequestDto
  ): Promise<{ results: TrendsResponse<any>[] }> {
    if (!batchRequest.keywords?.length) {
      throw new BadRequestException('Please provide an array of keywords');
    }

    const results = await Promise.all(
      batchRequest.keywords.map(async (keyword): Promise<TrendsResponse<any>> => {
        try {
          const data = await this.trendsService.fetchInterestOverTime(keyword);
          return { keyword, data };
        } catch (error) {
          return { keyword, data: null, error: 'Error fetching trend data' };
        }
      })
    );

    return { results };
  }
}