import { HhData, TopLevelCategory, TopPageAdvantages } from '../top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HhDataDto {
  @IsNumber()
  @Min(0)
  count: number;

  @IsNumber()
  @Min(0)
  juniorSalary: number;

  @IsNumber()
  @Min(0)
  middleSalary: number;

  @IsNumber()
  @Min(0)
  seniorSalary: number;
}

export class TopPageAdvantagesDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstLevelCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @Type(() => HhDataDto)
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantagesDto)
  advantages: TopPageAdvantages[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}