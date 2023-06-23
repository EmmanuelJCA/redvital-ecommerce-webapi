import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Gender } from '../interfaces';
import { User } from './';

@Entity({ schema: 'person' })
export class Profile {
  @Exclude()
  @PrimaryGeneratedColumn('uuid', {
    name: 'profile_id',
    comment: 'User primary key',
  })
  profileId: string;

  @ApiProperty({
    example: 'V-12345678',
    uniqueItems: true,
    description: 'Person dni',
  })
  @Column('text', {
    unique: true,
    comment: 'Person dni',
  })
  identification: string;

  @ApiProperty({
    example: 'John',
    description: 'Person first name',
  })
  @Column('text', {
    name: 'first_name',
    comment: 'User first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Due',
    description: 'User last name',
  })
  @Column('text', { name: 'last_name', comment: 'User last name' })
  lastName: string;

  @ApiProperty({
    example: 'M',
    description: 'User gender',
    enum: Gender,
  })
  @Column('enum', {
    enum: Gender,
    comment: 'User gender enum "M" or "F"',
  })
  gender: Gender;

  @ApiProperty({
    example: '2002-08-20T00:00:00.000Z',
    description: 'User birthdate',
  })
  @Column('date', { comment: 'User birthdate' })
  birthdate: Date;

  @ApiPropertyOptional({
    example: '+584146380056',
    description: 'User phone with telephone suffix',
  })
  @Column('text', {
    nullable: true,
    unique: true,
    comment: 'User phone with telephone suffix',
  })
  phone?: string;

  @Exclude()
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;
}
