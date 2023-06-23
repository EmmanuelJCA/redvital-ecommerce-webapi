import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeolocationService } from './geolocation.service';
import { Auth } from 'src/auth/decorators';

@ApiTags('Geolocation')
@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  //#region Country
  @Get('/country')
  @Auth()
  findAllCountries() {
    return this.geolocationService.findAllCountries();
  }
  @Get('/country/:term')
  @Auth()
  findOneCountry(@Param('term') term: string) {
    return this.geolocationService.findOneCountry(term);
  }
  //#endregion

  //#region State
  @Get('/state')
  @Auth()
  findAllStates() {
    return this.geolocationService.findAllStates();
  }
  @Get('/state:term')
  @Auth()
  findOneState(@Param('term') term: string) {
    return this.geolocationService.findOneState(term);
  }
  //#endregion

  //#region City
  @Get('/city')
  @Auth()
  findAllCities() {
    return this.geolocationService.findAllCities();
  }
  @Get('/city:term')
  @Auth()
  findOneCity(@Param('term') term: string) {
    return this.geolocationService.findOneCity(term);
  }
  //#endregion
}
