import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  payment_type: string;

  @ApiProperty()
  @IsString()
  change?: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @IsNumber()
  @ApiProperty()
  total: number;

  @ApiProperty()
  products_orders: {
    additional: {
      count: number;
      name: string;
      value: number;
    }[];
    price: number;
    productId: number;
    productName: string;
    subtotal: number;
  };

  @ApiProperty()
  @IsString()
  address?: string;

  @IsNumber()
  @ApiProperty()
  address_number?: string;

  @ApiProperty()
  @IsString()
  neighborhood?: string;

  @ApiProperty()
  @IsString()
  complement?: string;

  @ApiProperty()
  @IsString()
  cep?: string;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsString()
  state?: string;
}
