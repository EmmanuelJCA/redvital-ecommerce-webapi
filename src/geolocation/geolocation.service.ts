import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country, City, State } from './entities';

@Injectable()
export class GeolocationService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  //#region Country
  async findAllCountries() {
    return await this.countryRepository.find({});
  }
  async findOneCountry(term: string): Promise<Country> {
    let country: Country;

    if (Number(term)) {
      country = await this.countryRepository.findOneBy({ countryId: +term });
    } else {
      const query = this.countryRepository.createQueryBuilder('c');
      country = await query
        .where('UPPER(c.name) =:name or iso =:iso', {
          name: term.toUpperCase(),
          iso: term.toUpperCase(),
        })
        .leftJoinAndSelect('c.state', 's')
        .leftJoinAndSelect('s.city', 'ci')
        .getOne();
    }

    if (!country)
      throw new NotFoundException(`country with term ${term} not found`);

    return country;
  }
  //#endregion

  //#region State
  async findAllStates() {
    return await this.stateRepository.find({});
  }
  async findOneState(term: string): Promise<State> {
    let state: State;

    if (Number(term)) {
      state = await this.stateRepository.findOneBy({ stateId: +term });
    } else {
      const query = this.stateRepository.createQueryBuilder('s');
      state = await query
        .where('UPPER(s.name) =:name', {
          name: term.toUpperCase(),
        })
        .leftJoinAndSelect('s.city', 'c')
        .getOne();
    }

    if (!state)
      throw new NotFoundException(`state with term ${term} not found`);

    return state;
  }
  //#endregion

  //#region City
  async findAllCities() {
    return await this.cityRepository.find({});
  }
  async findOneCity(term: string): Promise<City> {
    let city: City;

    if (Number(term)) {
      city = await this.cityRepository.findOneBy({
        cityId: +term,
      });
    } else {
      const query = this.cityRepository.createQueryBuilder('c');
      city = await query
        .where('UPPER(c.name) =:name', {
          name: term.toUpperCase(),
        })
        .getOne();
    }

    if (!city) throw new NotFoundException(`city with term ${term} not found`);

    return city;
  }
  //#endregion
}
