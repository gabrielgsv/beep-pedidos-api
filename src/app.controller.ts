import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: FileDto,
    @Body() body: { user_url: string },
  ) {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg'
    ) {
      throw new HttpException(
        'Formato do arquivo invalido, permitido apenas png, jpg ou jpeg',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (file.size > 4000000) {
      throw new HttpException(
        'Arquivo muito grande, permitido até 4MB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return this.appService.uploadImage(file, body.user_url);
    }
  }
}
