import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    description: 'Address ID',
  })
  @IsOptional()
  @IsString()
  addressId?: string;
}
