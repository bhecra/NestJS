import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from 'src/user/domain/ports/user.service';
import { PaginationDto } from 'src/common/domain/dtos/pagination.dto';
import { IUbitsFilter } from 'src/core/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const initFilter: IUbitsFilter = {
      args: {},
      pageFrom: offset,
      pageTo: limit,
    };
    return this.userService.search(initFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const args = { id: `${id}` };
    return this.userService.update(updateUserDto, args);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
