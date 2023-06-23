import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { City } from 'src/geolocation/entities';

export class AddressDto {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    description: 'Address ID',
  })
  @IsString()
  addressId: string;

  @ApiProperty({
    example: '94L Street',
    description: 'Street, avenue or town of the address',
  })
  @IsString()
  @MinLength(10)
  addressLine1: string;

  @ApiProperty({
    example: 'House 104-1',
    description: 'House or apartment of the address',
  })
  @IsString()
  @MinLength(10)
  addressLine2: string;

  @ApiProperty()
  @Type(() => City)
  city: City;
}
