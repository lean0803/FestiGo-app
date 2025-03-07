import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    //Buat event baru
    async createReview(userId: number, eventId: number, dto: CreateReviewDto){
        const eventIdNumber = Number(eventId); // Konversi ke number

        if (isNaN(eventIdNumber)) {
            throw new BadRequestException('Invalid eventId');
        }

        const existingReview = await this.prisma.review.findFirst({
            where: {userId: userId, eventId: eventIdNumber}
        });

        if(existingReview) throw new BadRequestException('You already reviewed this event');

        return this.prisma.review.create({
            data: {
                userId,
                eventId: eventIdNumber,
                rating: dto.rating,
                comment: dto.comment
            }
        });
    }

    //Update review
    async updateReview(userId: number, reviewId: number, dto: UpdateReviewDto){
        const reviewIdNumber = Number(reviewId); // Konversi ke number

        if (isNaN(reviewIdNumber)) {
            throw new BadRequestException('Invalid eventId');
        }

        const existingReview = await this.prisma.review.findUnique({
            where: {id: reviewIdNumber}
        });

        if(!existingReview) {
            throw new NotFoundException('Review not found');
        }

        if(existingReview.userId != userId){
            throw new BadRequestException('You are not the owner of this review');
        }

        return this.prisma.review.update({
            where: {id: reviewIdNumber},
            data:{
                rating: dto.rating,
                comment: dto.comment
            }
        });
    }

    //Menghapus review
    async deleteReview(userId: number, reviewId: number) {
        const reviewIdNumber = Number(reviewId); // Konversi ke number

        if (isNaN(reviewIdNumber)) {
            throw new BadRequestException('Invalid eventId');
        }

        const review = await this.prisma.review.findUnique({ where: { id: reviewIdNumber } });
    
        if (!review) {
          throw new NotFoundException('Review not found');
        }
    
        if (review.userId !== userId) {
          throw new ForbiddenException("You can only delete your own review.");
        }
    
        return this.prisma.review.delete({ where: { id: reviewIdNumber } });
    }

    //Melihat semua review dari event tertentu
    async getReviewsByEvent(eventId: number) {
        const eventIdNumber = Number(eventId); // Konversi ke number

        if (isNaN(eventIdNumber)) {
            throw new BadRequestException('Invalid eventId');
        }

        return this.prisma.review.findMany({
          where: { eventId: eventIdNumber },
          include: {
            user: { select: { id: true, username: true } }, // Sertakan informasi user yang memberi review
          },
        });
      }
    
      //Melihat semua review yang dibuat oleh user tertentu
      async getReviewsByUser(userId: number) {
        const userIdNumber = Number(userId); // Konversi ke number

        if (isNaN(userIdNumber)) {
            throw new BadRequestException('Invalid eventId');
        }

        return this.prisma.review.findMany({
          where: { userId:userIdNumber },
          include: {
            event: { select: { id: true, title: true, category: true } }, // Sertakan informasi event yang di-review
          },
        });
      }
}
