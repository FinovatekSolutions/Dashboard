'use server';

import type { Prisma, Transaction } from '@prisma/client';
import { TransactionCreateInputSchema, TransactionUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getTransactions(): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getTransactionsByReviewId(reviewId: string): Promise<Transaction[]> {
  return prisma.transaction.findMany({
    where: {
      reviewId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getTransactionById(transactionId: string): Promise<Transaction | null> {
  return prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });
}

export async function createTransaction(
  input: Prisma.TransactionCreateInput
): Promise<Transaction> {
  const data = TransactionCreateInputSchema.parse(input);

  return prisma.transaction.create({ data });
}

export async function updateTransaction(
  input: Prisma.TransactionUpdateInput
): Promise<Transaction> {
  const data = TransactionUpdateInputSchema.parse(input);
  const transactionId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if not found
  return prisma.transaction.update({
    where: { id: transactionId },
    data,
  });
}

export async function updateTransactions(
  inputs: Prisma.TransactionUpdateInput[]
): Promise<Transaction[]> {
  // First, validate and parse each input to ensure it's in the correct shape
  const data = inputs.map((input) => {
    // Validate each transaction input
    const parsedInput = TransactionUpdateInputSchema.parse(input);
    const transactionId = z.string().parse(parsedInput.id); // Ensure the id is a string
    return { id: transactionId, transactionData: parsedInput };
  });

  // Execute all updates within a transaction
  return prisma.$transaction(
    data.map(({ id, transactionData }) =>
      prisma.transaction.update({
        where: { id },
        data: transactionData,
      })
    )
  );
}

export async function removeTransaction(transactionId: string): Promise<Transaction> {
  // throws an error if not found
  return prisma.transaction.delete({ where: { id: transactionId } });
}
