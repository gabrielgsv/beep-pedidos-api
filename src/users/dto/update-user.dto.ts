import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNumber()
  phone: string;

  @ApiProperty()
  @IsString()
  cpf_cnpj: string;

  @ApiProperty()
  @IsString()
  cep: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumber()
  address_number: number;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  delivery_fee: number;

  @ApiProperty()
  @IsNumber()
  delivery_time: number;

  @ApiProperty()
  @IsString()
  complement: string;

  @ApiProperty()
  timetables?: {
    name: string;
    open: string;
    close: string;
    isOpen: boolean;
  }[];

  @ApiProperty()
  @IsString()
  image_url?: string;
}
