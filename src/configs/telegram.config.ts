import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  // const configService = new ConfigService();

  return {
    chatId: '',
    token: ''
  };
};