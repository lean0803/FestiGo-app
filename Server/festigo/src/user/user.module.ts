import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, RolesGuard, JwtService],
  controllers: [UserController]
})
export class UserModule {}
