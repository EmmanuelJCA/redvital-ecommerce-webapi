import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address, User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { GeolocationService } from '../geolocation/geolocation.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly geolocationService: GeolocationService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { address = [], ...userDto } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...userDto,
        address: await Promise.all(
          address.map(async ({ cityId, ...addressInfo }) => ({
            ...addressInfo,
            city: await this.geolocationService.findOneCity(cityId.toString()),
          })),
        ),
      });
      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findOnePlain(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      select: { userId: true, email: true, password: true, isActive: true },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const {
      address: addressDb,
      profile: profileDb,
      ...userDb
    } = await this.findOne(id);

    const {
      address,
      profile: profileToUpdate,
      ...userToUpdate
    } = updateUserDto;

    let addressToUpdate: Partial<Address>[] = addressDb;

    if (address) {
      addressToUpdate = await Promise.all(
        address.map(async ({ cityId, ...addressInfo }) => ({
          ...addressInfo,
          city: await this.geolocationService.findOneCity(cityId.toString()),
        })),
      );
    }
    try {
      const updatedUser = await this.userRepository.save({
        ...userDb,
        ...userToUpdate,
        profile: {
          ...profileDb,
          ...profileToUpdate,
        },
        address: addressToUpdate,
      });
      return updatedUser;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): void {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
