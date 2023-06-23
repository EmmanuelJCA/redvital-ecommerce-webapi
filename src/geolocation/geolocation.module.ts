import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { Country, City, State } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GeolocationController],
  providers: [GeolocationService],
  imports: [AuthModule, TypeOrmModule.forFeature([Country, City, State])],
  exports: [GeolocationService],
})
export class GeolocationModule {}
