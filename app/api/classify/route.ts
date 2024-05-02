import { NextRequest, NextResponse } from 'next/server';
import { ReviewStatus } from '@prisma/client';
import { ModelData, ModelTransaction } from '@/lib/utils/types';
import prisma from '@/lib/utils/prisma';

export async function POST(request: NextRequest) {
  const { data, reviewId }: ModelData = await request.json();

  if (!data || !reviewId) {
    return new NextResponse(JSON.stringify({ name: 'Please provide data' }), {
      status: 400,
    });
  }

  await prisma.$transaction(async () => {
    data.forEach(async (transactionData) => {
      await Promise.all(
        transactionData.map(async (transaction) => {
          await prisma.transaction.create({
            data: {
              date: new Date(transaction.Date),
              amount: transaction.Amount,
              description: transaction.Description,
              review: { connect: { id: reviewId } },
              category: { connect: { name: transaction.Category } },
            },
          });
        })
      );
    });
  });

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      status: ReviewStatus.Done,
    },
  });

  return new NextResponse(JSON.stringify({ answer: 'yipee' }), {
    status: 200,
  });
}
