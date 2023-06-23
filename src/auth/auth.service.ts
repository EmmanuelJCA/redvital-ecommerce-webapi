import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities';
import { JwtPayload } from './interfaces';
import { SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.userService.findOnePlain(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!user.isActive)
      throw new UnauthorizedException('User not active, contact administrator');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');

    delete user.password;
    delete user.address;
    return {
      ...user,
      token: this.getJwtToken({ id: user.userId }),
    };
  }

  checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.userId }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
