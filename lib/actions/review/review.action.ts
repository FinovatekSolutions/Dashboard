'use server';

import type { Prisma, Permission, Review, User } from '@prisma/client';
import { ReviewCreateInputSchema, ReviewUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import { ReviewWithUser, FullReviewDetails } from '@/lib/utils/types';
import prisma from '@/lib/utils/prisma';

export async function getReviews(): Promise<ReviewWithUser[]> {
  return prisma.review.findMany({
    include: {
      user: true, // This includes the user for each review
    },
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getReviewsByUserEmail(userEmail: string): Promise<ReviewWithUser[]> {
  return prisma.review.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getReviewById(reviewId: string): Promise<FullReviewDetails | null> {
  return prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      user: true,
      client: true,
      transactions: true,
    },
  });
}

export async function createReview(input: Prisma.ReviewCreateInput): Promise<ReviewWithUser> {
  const data = ReviewCreateInputSchema.parse(input);

  return prisma.review.create({
    data,
    include: {
      user: true,
    },
  });
}

export async function updateReview(input: Prisma.ReviewUpdateInput): Promise<ReviewWithUser> {
  const data = ReviewUpdateInputSchema.parse(input);
  const reviewId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if no review is found
  return prisma.review.update({
    where: { id: reviewId },
    data,
    include: {
      user: true,
    },
  });
}

export async function removeReview(reviewId: string): Promise<ReviewWithUser> {
  // throws an error if no review is found
  return prisma.review.delete({
    where: { id: reviewId },
    include: {
      user: true,
    },
  });
}
