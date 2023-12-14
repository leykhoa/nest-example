import { Transform, Type } from '@nestjs/class-transformer';

export class CreateProductDto {
  name: string;
  description: string;
  @Transform(({ value }) => Number(value))
  price: number;
  imageUrl: string;
}
