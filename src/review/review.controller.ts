import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './rview.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {
  }

  @Post('')
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    console.log(productId);
    return this.reviewService.findByProductId(productId);
  }

  @Delete('byProduct/:productId')
  async deleteByProduct(@Param('productId') productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
