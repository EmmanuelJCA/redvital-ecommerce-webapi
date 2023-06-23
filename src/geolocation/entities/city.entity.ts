import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from './';
import { Address } from 'src/user/entities';

@Entity({ schema: 'geolocation' })
export class City {
  @ApiProperty({
    example: '1',
    uniqueItems: true,
    description: 'City ID',
  })
  @PrimaryGeneratedColumn({
    name: 'city_id',
    comment: 'City primary key',
  })
  cityId: number;

  @ApiProperty({
    example: 'Maracaibo',
    description: 'City name',
  })
  @Column('text', { comment: 'City name' })
  name: string;

  @ManyToOne(() => State, (state) => state.city, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(() => Address, (address) => address.city, {
    cascade: true,
  })
  address?: Address;
}
