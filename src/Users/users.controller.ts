import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; // DTO for creating a user
import { User } from './entities/users.entity';  // Import the User entity
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route to add a new user (POST)
  @UseGuards(JwtAuthGuard)
  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return ('vijednererere');
  }

  // Route to get a user by ID (GET)
  @Get(':id')
  async getUser(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
