import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: ['msgAuth: Token is invalid! Please login again'],
      });
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request.userId = decoded.userId;

      //   Phân quyền
      const requiredRoles = this.reflector.get<Role[]>(
        'roles',
        context.getHandler(),
      );

      if (!requiredRoles) {
        return true;
      }
      const userRole = decoded.role;
      return requiredRoles.some((role) => userRole === role);
    } catch (err) {
      throw new UnauthorizedException({
        message: ['msgAuth: Token is expired or invalid! Please login again'],
      });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
