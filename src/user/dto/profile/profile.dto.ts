import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxDate,
  MinDate,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../../interfaces';

const currentDate = new Date();

export class ProfileDto {
  @ApiProperty({
    example: 'V-12345678',
    uniqueItems: true,
    minLength: 10,
    description: 'User dni',
  })
  @IsString()
  @MinLength(10)
  identification: string;

  @ApiProperty({
    example: 'Admin',
    description: 'User first name',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: 'Admin',
    description: 'User last name',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: 'M',
    description: 'User gender',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: '2002-08-20T00:00:00.000Z',
    description: 'User birthdate',
  })
  @Type(() => Date)
  @IsDate()
  @MinDate(
    new Date(
      currentDate.getFullYear() - 100,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
  )
  @MaxDate(
    new Date(
      currentDate.getFullYear() - 15,
      currentDate.getMonth(),
      currentDate.getDate(),
    ),
  )
  birthdate: Date;

  @ApiPropertyOptional({
    example: '+584146380056',
    description: 'User phone',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]{1}[0-9]{1,14}$/)
  phone?: string;
}
