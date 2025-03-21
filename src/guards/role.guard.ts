import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) {
      return true; // Eğer rol belirtilmemişse her role izin ver
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Token'den gelen kullanıcı bilgisi
    return user.role === requiredRole; // Token'deki rolü kontrol et
  }
}
