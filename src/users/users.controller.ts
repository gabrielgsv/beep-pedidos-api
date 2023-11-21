import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GetByIdDto, GetByUrlDto } from './dto/by-url';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUserDto } from './dto/file-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @IsPublic()
  @Get('by-url')
  findByUrl(@Query() query: GetByUrlDto) {
    return this.usersService.findByUrl(query.url);
  }

  @Get('by-id')
  findById(@Query() query: GetByIdDto) {
    return this.usersService.findById(query.id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: FileUserDto,
    @Body() body: { user_url: string },
  ) {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/jpg'
    ) {
      throw new HttpException(
        'Formato do arquivo invalido, permitido apenas png, jpg ou jpeg',
        500,
      );
    } else if (file.size > 4000000) {
      throw new HttpException('Arquivo muito grande, permitido até 4MB', 500);
    } else {
      return this.usersService.uploadImage(file, body.user_url);
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
