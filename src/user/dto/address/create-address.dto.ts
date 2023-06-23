import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateAddressDto extends OmitType(AddressDto, [
  'addressId',
  'city',
]) {
  @ApiProperty({
    example: '130103',
    description: 'City ID of the address',
  })
  @IsNumber()
  @IsPositive()
  cityId: number;
}
