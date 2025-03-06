import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [EventService, PrismaService, RolesGuard, JwtService],
  controllers: [EventController]
})
export class EventModule {}
