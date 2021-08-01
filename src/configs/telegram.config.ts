import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = '1923482131:AAFiPdoxX546wV5PAKcj7xYFOoDKSF11j-k';

  if (!token) {
    throw new Error('TELEGRAM_TOKEN not found');
  }
  return {
    token,
    chatId: '531151352',
  };
};
