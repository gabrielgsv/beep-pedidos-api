import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  image_url?: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @ApiProperty()
  additional?: { name: string; value: string }[];

  @IsNumber()
  @ApiProperty()
  user_id: number;
}

export class QueryParams {
  @IsNumber()
  @ApiProperty()
  user_id: number;

  @IsNumber()
  @ApiProperty()
  id: number;
}
