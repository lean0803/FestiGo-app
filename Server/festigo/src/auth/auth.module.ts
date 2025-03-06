import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guard/roles.guard';

@Module({
  providers: [AuthService, JwtService, PrismaService, JwtStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
