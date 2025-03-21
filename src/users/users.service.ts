import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async hashPassword(password: string): Promise<string> {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    }
  

    async findAll(role?: 'GUEST' | 'USER' | 'MODERATOR' | 'ADMIN'){
      if(role){
        return this.databaseService.user.findMany({
          where: {
            role,
          }
        });
      }
      return this.databaseService.user.findMany();
    }

    async findOne(id: number){
      const user = this.databaseService.user.findUnique({
        where: {
          id,
        }
      });
      if(!user){
        throw new NotFoundException('User Not Found');
      }
      return user;
    }

    async findByEmail(email: string){
      const user = this.databaseService.user.findUnique({
        where: {
          email,
        }
      });
      if(!user){
        throw new NotFoundException('User Not Found');
      }
      return user;
    }

    async create(createUserDto: Prisma.UserCreateInput){
      if(!createUserDto.password || !createUserDto.password.length || createUserDto.password.length < 8 ){
        throw new BadRequestException("Password Not Sufficient");
      }
      const hashedPassword = await this.hashPassword(createUserDto.password);
      return this.databaseService.user.create({
        data: {
          ...createUserDto, 
          password: hashedPassword,
        }
      });
    }

    async update(id: number, updateUserDto: Prisma.UserUpdateInput){
      return this.databaseService.user.update({
        where: {
          id,
        },
        data: updateUserDto
      });
    }

    async delete(id: number){
      return this.databaseService.user.delete({
        where: {
          id,
        }
      });
    }
}
