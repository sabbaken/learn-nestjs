import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './rview.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  notify(@Body() dto: CreateReviewDto) {
    const message = `Имя: ${dto.name}\n`
      + `Заголовок: ${dto.title}\n`
      + `Описание: ${dto.description}`;

    return this.telegramService.sendMessage(message);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.deleteById(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProduct/:productId')
  async deleteByProduct(@Param('productId', IdValidationPipe) productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
