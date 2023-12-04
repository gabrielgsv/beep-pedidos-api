import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order | string> {
    const data = {
      name: createOrderDto.name,
      payment_type: createOrderDto.payment_type,
      change: createOrderDto.change,
      phone: createOrderDto.phone,
      total: createOrderDto.total,
      products_orders: createOrderDto.products_orders,
      address: createOrderDto.address,
      address_number: createOrderDto.address_number,
      neighborhood: createOrderDto.neighborhood,
      complement: createOrderDto.complement,
      cep: createOrderDto.cep,
      city: createOrderDto.city,
      state: createOrderDto.state,
    };
    const createOrders = await this.prisma.orders.create({
      data: {
        ...data,
        user: { connect: { id: createOrderDto.user_id } },
      },
    });

    return createOrders;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
