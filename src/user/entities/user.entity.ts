import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';
import { Address, Profile } from './';
import { Role } from '../interfaces';

@Entity({ schema: 'person' })
export class User {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'User ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    comment: 'User ID',
  })
  userId: string;

  @ApiProperty({
    example: 'admin@admin.com',
    uniqueItems: true,
    description: 'User email',
  })
  @Column('text', {
    unique: true,
    comment: 'User email',
  })
  email: string;

  @Exclude()
  @Column('text', {
    select: false,
    comment: 'User password hashed',
  })
  password: string;

  @ApiProperty({
    example: true,
    default: true,
    description: 'User status',
  })
  @Column('bool', {
    name: 'is_active',
    default: true,
    comment: 'User status',
  })
  isActive: boolean;

  @ApiProperty({
    enum: Role,
    isArray: true,
    description: 'User roles',
  })
  @Column('text', {
    array: true,
    default: [Role.user],
  })
  roles: Role[];

  @ApiProperty({ type: () => Profile })
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @ApiProperty({ type: [Address], nullable: true })
  @OneToMany(() => Address, (address) => address.user, {
    eager: true,
    cascade: true,
  })
  address?: Address[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
