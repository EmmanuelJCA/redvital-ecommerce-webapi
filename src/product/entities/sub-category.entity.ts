import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';

@Entity({ schema: 'product' })
export class SubCategory {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Sub Category ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'sub_category_id',
    comment: 'Sub Category ID',
  })
  subCategoryId: string;

  @ApiProperty({
    example: 'vitamine',
    description: 'Sub Category name',
  })
  @Column('text', {
    name: 'name',
    comment: 'Sub Category name',
  })
  name: string;

  @ApiProperty({
    example: true,
    default: true,
    description: 'Sub Category status',
  })
  @Column('bool', {
    name: 'is_active',
    default: true,
    comment: 'Sub Category status',
  })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.subCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({ type: [Product], nullable: true })
  @OneToMany(() => Product, (product) => product.subCategory, {
    cascade: true,
  })
  products?: Product[];
}
