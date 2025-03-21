import { Get, Post, Patch, Body, Controller, Delete, Param, Query, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Role('ADMIN')
export class UsersController {
  /*
      GET /users
      GET /users/:id
      POST /users
      PATCH /users/:id
      DELETE /users/:id
  */
  constructor(private readonly usersService: UsersService) { }

  @Get() // GET /users
  findAll(@Query('role') role?: 'GUEST' | 'MODERATOR' | 'USER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users/
  create(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: Prisma.UserUpdateInput) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }



}
