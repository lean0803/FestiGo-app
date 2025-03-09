import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Rating skala 1-5

  @IsString()
  @IsOptional()
  comment?: string; // Komentar opsional
}

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number; // Bisa update rating

  @IsString()
  @IsOptional()
  comment?: string; // Bisa update komentar
}
