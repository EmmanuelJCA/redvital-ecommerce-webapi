import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, Category, Image, Product, SubCategory } from './entities';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Brand, Category, Image, Product, SubCategory]),
  ],
})
export class ProductModule {}
