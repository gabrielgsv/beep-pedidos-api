import { JsonValue } from '@prisma/client/runtime/library';

export class Product {
  id: number;
  name: string;
  image_url: string;
  description: string;
  price: number;
  additional: JsonValue;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
