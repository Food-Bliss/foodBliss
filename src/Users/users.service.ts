import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Method to create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('inside createUser',createUserDto);

    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const user = new User();
    user.name = createUserDto.name;
    user.phone_no = createUserDto.phone_no;
    user.email = email;
    user.user_type = createUserDto.user_type;
    user.password = await bcrypt.hash(password, 10); // 10 is the salt rounds

    return this.usersRepository.save(user);
    
  }

  // Method to find a user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
