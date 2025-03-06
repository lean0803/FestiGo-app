import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}

  // Endpoint untuk membuat event baru
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  // Endpoint untuk mendapatkan semua event
  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  // Endpoint untuk mendapatkan event berdasarkan ID
  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(Number(id));
  }

  // Endpoint untuk mendapatkan event berdasarkan kategori
  @Get('category/:category')
  getEventsByCategory(@Param('category') category: string) {
    return this.eventService.getEventsByCategory(category);
  }

  // Endpoint untuk mengupdate event berdasarkan ID
  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.updateEvent(Number(id), dto);
  }

  // Endpoint untuk menghapus event berdasarkan ID
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(Number(id));
  }
}
