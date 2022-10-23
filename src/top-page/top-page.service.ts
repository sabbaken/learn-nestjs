import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { FindTopPageDto } from './dto/find-top-page.dto';


@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {
  }

  async create(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }

  async getById(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async patchById(id: string, dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>[] | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto);
  }

  async find(dto: FindTopPageDto) {
    return this.topPageModel.find({ alias: dto.firstCategory });
  }

  async findByText(text: string) {
    return this.topPageModel.find({
      $text: {
        $search: text,
        $caseSensitive: false
      }
    });
  }
}
