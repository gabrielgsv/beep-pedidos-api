import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetByUrlDto {
  @ApiProperty()
  @IsEmail()
  url: string;
}
