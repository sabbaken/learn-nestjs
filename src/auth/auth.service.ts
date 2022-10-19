import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>
  ) {
  }

  async createUser(dto: AuthDto): Promise<DocumentType<UserModel>> {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: hashSync(dto.password, salt)
    });

    return newUser.save();
  }

  async findUser(email: string): Promise<DocumentType<UserModel> | null> {
    return this.userModel.findOne({ email: email }).exec();
  }
}
