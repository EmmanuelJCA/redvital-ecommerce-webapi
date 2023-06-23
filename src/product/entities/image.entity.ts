import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ schema: 'product' })
export class Image {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Image ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'image_id',
    comment: 'Image ID',
  })
  imageId: string;

  @ApiProperty({
    example: 'https://localhost:1234/image1.jpg',
    description: 'Iamge Link',
  })
  @Column('text', {
    name: 'link',
    comment: 'Image Link',
  })
  link: string;

  @ApiProperty({
    example: 1,
    description: 'Iamge order',
  })
  @Column('smallint', {
    name: 'order',
    comment: 'Image Order',
  })
  order: number;

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
