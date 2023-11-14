import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto, QueryParams } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileProductDto } from './dto/file-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: number) {
    return this.productsService.findByUser(+userId);
  }

  @Patch()
  update(
    @Query() query: QueryParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(query, updateProductDto);
  }

  @Delete()
  remove(@Query() query: QueryParams) {
    return this.productsService.remove(query);
  }

  @Post('image-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: FileProductDto,
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
      return this.productsService.uploadImage(file, body.user_url);
    }
  }
}
