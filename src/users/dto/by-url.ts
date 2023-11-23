import { ApiProperty } from '@nestjs/swagger';

export class GetByUrlDto {
  @ApiProperty()
  url: string;
}

export class GetByIdDto {
  @ApiProperty()
  id: string;
}
