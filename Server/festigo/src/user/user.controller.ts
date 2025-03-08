import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, UpdateUsernameDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService) {}

    @Patch('username')
    async updateUsername(@Request() req, @Body() dto: UpdateUsernameDto){
        return this.userService.updateUsername(req.user.id, dto);
    }   //Berhasil

    @Patch('password')
    async updatePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
        return this.userService.updatePassword(req.user.id, dto);
    }   //Berhasil
}
