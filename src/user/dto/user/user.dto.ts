import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
  ValidateNested,
  IsDefined,
  IsOptional,
  IsArray,
  IsBoolean,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto, CreateProfileDto } from '../';
import { Role } from '../../interfaces';

export class UserDto {
  @ApiProperty({
    example: '0f51ab43-abd3-45b3-862e-513f2fd98db4',
    uniqueItems: true,
    description: 'User ID',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'admin@admin.com',
    description: 'User email',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123',
    description: 'User password',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    example: [Role.admin],
    enum: Role,
    description: 'User roles',
  })
  @IsOptional()
  @IsEnum(Role, { each: true })
  roles?: Role[];

  @ApiProperty({
    default: true,
    description: 'User status',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsDefined()
  @Type(() => CreateProfileDto)
  @ValidateNested()
  profile!: CreateProfileDto;

  @ApiProperty({ type: [CreateAddressDto], nullable: true })
  @IsOptional()
  @IsArray()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address?: CreateAddressDto[];
}
