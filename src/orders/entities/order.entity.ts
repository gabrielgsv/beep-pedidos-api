import { JsonValue } from '@prisma/client/runtime/library';

export class Order {
  id: number;
  name: string;
  payment_type: string;
  change?: string;
  phone: string;
  total: number;
  products_orders: JsonValue;
  address?: string;
  address_number?: string;
  neighborhood?: string;
  complement?: string;
  cep?: string;
  city?: string;
  state?: string;
}
