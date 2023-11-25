import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User | string> {
    const data: Prisma.userCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      password: await bcrypt.hash(createUserDto.password, 10),
      url: createUserDto.url,
    };

    const createUser = await this.prisma.user.create({ data });

    return {
      ...createUser,
      password: undefined,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return user;
  }

  async findByUrl(url: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        url: true,
        phone: true,
        cpf_cnpj: true,
        created_at: true,
        cep: true,
        address: true,
        address_number: true,
        neighborhood: true,
        city: true,
        state: true,
        delivery_fee: true,
        delivery_time: true,
        complement: true,
        image_url: true,
        products: true,
        password: false,
        timetables: false,
        updated_at: false,
      },
      where: {
        url,
      },
    });

    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const data: Prisma.userUpdateInput = {
      ...updateUserDto,
    };

    try {
      const updateUser = await this.prisma.user.update({
        where: {
          id: updateUserDto.id,
        },
        data,
      });
      return updateUser;
    } catch (error) {
      debugger;
      if (error.code === 'P2002' && error.meta?.target?.includes('url')) {
        throw new HttpException(
          'A URL já está em uso. Por favor, escolha outra URL.',
          500,
        );
      } else {
        throw error;
      }
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
