import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Prisma } from '@prisma/client';

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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
