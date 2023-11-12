import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, QueryParams } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto): Promise<Product | string> {
    const data = {
      user_id: createProductDto.user_id,
      name: createProductDto.name,
      image_url: createProductDto.image_url,
      description: createProductDto.description,
      price: createProductDto.price,
      additional: createProductDto.additional as Prisma.JsonArray,
    };
    const createProducts = await this.prisma.products.create({
      data,
    });
    return createProducts;
  }

  async findByUser(userId: number): Promise<Product[] | string> {
    const products = await this.prisma.products.findMany({
      where: {
        user_id: userId,
      },
    });
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(query: QueryParams, updateProductDto: UpdateProductDto) {
    const data = {
      name: updateProductDto.name,
      image_url: updateProductDto.image_url,
      description: updateProductDto.description,
      price: updateProductDto.price,
      additional: updateProductDto.additional as Prisma.JsonArray,
    };
    const updateProducts = await this.prisma.products.updateMany({
      where: {
        id: Number(query.id),
        user_id: Number(query.user_id),
      },
      data,
    });
    return updateProducts;
  }

  async remove(query: QueryParams) {
    const removeProducts = await this.prisma.products.delete({
      where: {
        id: Number(query.id),
        user_id: Number(query.user_id),
      },
    });
    return removeProducts;
  }
}
