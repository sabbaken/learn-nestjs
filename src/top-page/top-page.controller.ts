import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post, UseGuards,
  UsePipes, ValidationPipe
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPages = await this.topPageService.deleteById(id);

    if (!deletedPages) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
    const updatedPages = await this.topPageService.patchById(id, dto);

    if (!updatedPages) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }

    return updatedPages.length;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.find(dto);
  }
}
