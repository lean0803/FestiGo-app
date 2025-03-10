import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PromoteUserDto, UpdatePasswordDto, UpdateUsernameDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async updateUsername(userId: number, dto: UpdateUsernameDto) {
        return this.prismaService.user.update({
            where: {id: userId},
            data: {
                username: dto.username
            },
            select: {
                id: true,
                username: true,
                updatedAt: true
            }
        });
    }

    async updatePassword(userId: number, dto: UpdatePasswordDto){
        //Cek user ada atau tidak
        const existingUser = await this.prismaService.user.findUnique({where: {id: userId}});

        if(!existingUser) throw new BadRequestException();

        //Cek password baru sama atau tidak dengan yang lama
        const isPasswordSame = await bcrypt.compare(dto.password, existingUser.password);

        if(isPasswordSame) throw new BadRequestException('The new password cannot be the same as the old one.');

        const hashedPassword = await bcrypt.hash(dto.password, 12); //Hashing password

        return this.prismaService.user.update({
            where: {id: userId},
            data: {
                password: hashedPassword
            },
            select: {
                id: true,
                username: true,
                updatedAt: true
            }
        });
    }

    async getProfile(userId: number){
        return this.prismaService.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                email: true,
                username: true,
                reviews: true,
                bucketlist: true,
                threads: true
            }
        });
    }

    async getAllUser(){
        return this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true
            }
        });
    }

    async promoteToAdmin(dto: PromoteUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {id: dto.userId}
        })

        if(user && user.role == 'ADMIN') throw new BadRequestException('User not found or already an admin')

        return this.prismaService.user.update({
            where: {id: dto.userId},
            data: {
                role: 'ADMIN'
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true
            }
        })
    }

    async deleteUser(userId: number) {
        return this.prismaService.user.delete({
          where: { id: userId },
        });
    }
}