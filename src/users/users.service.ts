import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  async findByUrl(url: string) {
    console.log('url', url);
    const user = await this.prisma.user.findUnique({
      select: {
        name: true,
        address: true,
        neighborhood: true,
        address_number: true,
        city: true,
        state: true,
      },
      where: {
        url,
      },
    });

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
