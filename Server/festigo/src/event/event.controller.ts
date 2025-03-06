import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) {}

  // Endpoint untuk membuat event baru
  @Post()
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
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventService.updateEvent(Number(id), dto);
  }

  // Endpoint untuk menghapus event berdasarkan ID
  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(Number(id));
  }
}
