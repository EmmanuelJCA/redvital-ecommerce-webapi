import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto';

export class SignupDto extends OmitType(CreateUserDto, ['roles', 'isActive']) {}
