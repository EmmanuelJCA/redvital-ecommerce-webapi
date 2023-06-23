import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub-category.entity';

@Entity({ schema: 'product' })
export class Category {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Category ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'category_id',
    comment: 'Category ID',
  })
  categoryId: string;

  @ApiProperty({
    example: 'naturist medicine',
    description: 'Category name',
  })
  @Column('text', {
    name: 'name',
    comment: 'Category name',
  })
  name: string;

  @ApiProperty({
    example: true,
    default: true,
    description: 'Category status',
  })
  @Column('bool', {
    name: 'is_active',
    default: true,
    comment: 'Category status',
  })
  isActive: boolean;

  @ApiProperty({ type: [SubCategory], nullable: true })
  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    cascade: true,
  })
  subCategories?: SubCategory[];
}
