import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './';
import { City } from 'src/geolocation/entities';

@Entity({ schema: 'person' })
export class Address {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'Address ID',
  })
  @PrimaryGeneratedColumn('uuid', {
    name: 'address_id',
    comment: 'Address primary key',
  })
  addressId: string;

  @ApiProperty({
    example: '94L Street',
    description: 'Street, avenue or town of the address',
  })
  @Column('text', {
    name: 'address_line1',
    comment: 'Street, avenue or town of the address',
  })
  addressLine1: string;

  @ApiProperty({
    example: 'House 104-1',
    description: 'House or apartment of the address',
  })
  @Column('text', {
    name: 'address_line2',
    comment: 'House or apartment of the address',
  })
  addressLine2: string;

  @ApiProperty()
  @ManyToOne(() => City, (city) => city.address, {
    eager: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
