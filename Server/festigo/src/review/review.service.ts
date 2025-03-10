import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    //Buat event baru
    async createReview(userId: number, eventId: number, dto: CreateReviewDto){
        if(isNaN(eventId)) throw new BadRequestException();

        const existingReview = await this.prisma.review.findFirst({
            where: {userId: userId, eventId}
        });

        if(existingReview) throw new BadRequestException('You already reviewed this event');

        return this.prisma.review.create({
            data: {
                userId,
                eventId,
                rating: dto.rating,
                comment: dto.comment
            }
        });
    }

    //Update review
    async updateReview(userId: number, reviewId: number, dto: UpdateReviewDto){
        if(isNaN(reviewId)) throw new BadRequestException();

        const existingReview = await this.prisma.review.findUnique({
            where: {id: reviewId}
        });

        if(!existingReview) {
            throw new NotFoundException('Review not found');
        }

        if(existingReview.userId != userId){
            throw new BadRequestException('You are not the owner of this review');
        }

        return this.prisma.review.update({
            where: {id: reviewId},
            data:{
                rating: dto.rating,
                comment: dto.comment
            }
        });
    }

    //Menghapus review
    async deleteReview(userId: number, reviewId: number) {
        if(isNaN(reviewId)) throw new BadRequestException();
        
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    
        if (!review) {
          throw new NotFoundException('Review not found');
        }
    
        if (review.userId !== userId) {
          throw new ForbiddenException("You can only delete your own review.");
        }
    
        return this.prisma.review.delete({ where: { id: reviewId } });
    }

    //Melihat semua review dari event tertentu
    async getReviewsByEvent(eventId: number) {
        if(isNaN(eventId)) throw new BadRequestException();   //Jika eventId bukan angka, maka akan throw error

        const event = await this.prisma.event.findUnique({ where: {id: eventId } });
        if(!event) throw new NotFoundException();   //Jika event tidak ditemukan, maka akan throw error
        return this.prisma.review.findMany({
          where: { eventId },
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                username: true
              }
            }
          }
        });
      }
    
      //Melihat semua review yang dibuat oleh user tertentu
    async getReviewsByUser(userId: number) {
        if(isNaN(userId)) throw new BadRequestException();

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if(!user) throw new NotFoundException();
        return this.prisma.review.findMany({
          where: { userId: userId },
          include: {
            event: { select: { title: true, category: true } }, // Sertakan informasi event yang di-review
          },
        });
    }
}
