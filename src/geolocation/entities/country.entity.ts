import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { State } from './';

@Entity({ schema: 'geolocation' })
export class Country {
  @ApiProperty({
    example: '1',
    uniqueItems: true,
    description: 'Country ID',
  })
  @Column({
    name: 'country_id',
    primary: true,
    comment: 'Country primary key',
  })
  countryId: number;

  @ApiProperty({
    example: 'Venezuela',
    uniqueItems: true,
    description: 'Country name',
  })
  @Column('text', { comment: 'Country name', unique: true })
  name: string;

  @ApiProperty({
    example: 'VEN',
    description: 'Country name',
    uniqueItems: true,
  })
  @Column('text', { comment: 'Country iso 3', unique: true })
  iso: string;

  @ApiProperty({
    example: '58',
    description: 'Country name',
    nullable: true,
  })
  @Column('text', {
    name: 'phone_code',
    comment: 'Country phone code',
    nullable: true,
  })
  phoneCode?: string;

  @ApiProperty({ type: [State], nullable: true })
  @OneToMany(() => State, (state) => state.country, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  state?: State[];
}
