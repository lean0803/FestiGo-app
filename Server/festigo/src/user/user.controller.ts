import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PromoteUserDto, UpdatePasswordDto, UpdateUsernameDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';

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

    @Get('profile')
    async getProfile(@Request() req){
        return this.userService.getProfile(req.user.id);
    }   //Berhasil

    @Get()
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async getAllUsers(){
        return this.userService.getAllUser();
    }   //Berhasil

    @Patch('promote')
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    async promoteUser(@Body() dto: PromoteUserDto){
        return this.userService.promoteToAdmin(dto);
    }   //Berhasil

}
