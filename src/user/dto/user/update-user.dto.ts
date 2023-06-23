import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { UpdateAddressDto, UpdateProfileDto } from '..';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['address', 'profile']),
) {
  isActive?: boolean;

  @ApiProperty({ type: [UpdateProfileDto] })
  @IsOptional()
  @Type(() => UpdateProfileDto)
  @ValidateNested()
  profile?: UpdateProfileDto;

  @ApiProperty({ type: [UpdateAddressDto], nullable: true })
  @IsOptional()
  @IsArray()
  @Type(() => UpdateAddressDto)
  @ValidateNested()
  address?: UpdateAddressDto[];
}
