import { IsString, IsOptional, IsDateString, IsArray, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class TrendsQueryDto {
  @IsString()
  @IsOptional()
  readonly keyword?: string;

  @IsOptional()
  @IsDateString()
  readonly startTime?: string;

  @IsString()
  @IsOptional()
  readonly geo?: string = 'US';
}

export class BatchRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly keywords!: string[];
}