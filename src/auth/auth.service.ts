import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService
      ) {}

      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException('Geçersiz giriş bilgileri.');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Geçersiz giriş bilgileri.');
        }
    
        return user;
      }

      async login(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.validateUser(email, password);

        const payload = { sub: user.id, email: user.email };
    
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      }
    
    
    
}
