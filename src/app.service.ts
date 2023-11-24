import { Injectable } from '@nestjs/common';
import { ImgurClient } from 'imgur';
import { FileDto } from './dto/file.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World!`;
  }

  async uploadImage(file: FileDto, user_url: string) {
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENT_ID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });

    const response = await client.upload({
      album: process.env.IMGUR_ALBUM_ID,
      image: file.buffer,
      title: `${user_url}-${file.originalname}`,
    });

    return response;
  }
}
