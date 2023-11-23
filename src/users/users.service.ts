import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileUserDto } from './dto/file-user.dto';
import axios from 'axios';

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

  async uploadImage(file: FileUserDto, user_url: string) {
    const body = new FormData();
    body.set('key', process.env.IMGBB_KEY);
    body.append('image', file.buffer.toString('base64'));
    body.append('name', `${user_url}-${file.originalname}`);

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body,
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('error', error);
        throw new HttpException('Erro ao enviar imagem', 500);
      });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
