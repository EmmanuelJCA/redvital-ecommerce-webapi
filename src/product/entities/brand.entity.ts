import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ schema: 'product' })
export class Brand {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Brand ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'brand_id',
    comment: 'Brand ID',
  })
  brandId: string;

  @ApiProperty({
    example: 'Vitamaze',
    description: 'Brand name',
  })
  @Column('text', {
    name: 'name',
    comment: 'Brand name',
  })
  name: string;

  @ApiProperty({
    example: true,
    default: true,
    description: 'Brand status',
  })
  @Column('bool', {
    name: 'is_active',
    default: true,
    comment: 'Brand status',
  })
  isActive: boolean;

  @ApiProperty({ type: [Product], nullable: true })
  @OneToMany(() => Product, (product) => product.brand, {
    cascade: true,
  })
  products?: Product[];
}
