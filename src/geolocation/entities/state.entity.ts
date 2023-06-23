import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country, City } from './';

@Entity({ schema: 'geolocation' })
export class State {
  @ApiProperty({
    example: '1',
    uniqueItems: true,
    description: 'State ID',
  })
  @PrimaryGeneratedColumn({
    name: 'state_id',
    comment: 'State primary key',
  })
  stateId: number;

  @ApiProperty({
    example: 'Zulia',
    description: 'State name',
  })
  @Column('text', { comment: 'State name' })
  name: string;

  @ManyToOne(() => Country, (country) => country.state, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ApiProperty({ type: [City], nullable: true })
  @OneToMany(() => City, (city) => city.state, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  city?: City[];
}
