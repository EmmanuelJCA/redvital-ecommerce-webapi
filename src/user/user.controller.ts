import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { Role } from './interfaces';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(Role.admin)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Auth(Role.admin)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Auth(Role.admin)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }
}
