import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, Profile, Address } from './entities';
import { GeolocationModule } from 'src/geolocation/geolocation.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile, Address]),
    GeolocationModule,
  ],
  exports: [UserService],
})
export class UserModule {}
