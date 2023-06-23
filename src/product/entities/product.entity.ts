import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Brand } from './brand.entity';
import { SubCategory } from './sub-category.entity';
import { Image } from './image.entity';

@Entity({ schema: 'product' })
export class Product {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Product ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'product_id',
    comment: 'Product ID',
  })
  productId: string;

  @ApiProperty({
    example: 'vitamin C',
    description: 'Product name',
  })
  @Column('text', {
    name: 'name',
    comment: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 'help to protect cells against damage caused by free radicals.',
    description: 'Product description',
  })
  @Column('text', {
    name: 'description',
    comment: 'Product description',
  })
  description: string;

  @ApiProperty({
    example: 5,
    description: 'Product price',
  })
  @Column('money', {
    name: 'price',
    comment: 'Product price',
  })
  price: number;

  @ApiProperty({
    example: 'help to protect cells against damage caused by free radicals.',
    description: 'Product description',
  })
  @Column('text', {
    name: 'image',
    comment: 'Product description',
  })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;

  @ApiProperty({ type: [Image], nullable: true })
  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
  })
  images?: Image[];
}
