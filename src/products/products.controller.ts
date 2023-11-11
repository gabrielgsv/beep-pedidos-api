import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto, QueryParams } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';

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
}
