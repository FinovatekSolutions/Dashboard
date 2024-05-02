'use server';

import type { Prisma, Transaction } from '@prisma/client';
import { TransactionCreateInputSchema, TransactionUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';
import { TransactionWithCategory } from '@/lib/utils/types';

export async function getAllTransactions(): Promise<TransactionWithCategory[]> {
  return prisma.transaction.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
  return prisma.transaction.findUnique({
    where: {
      id,
    },
  });
}

export async function createTransaction(
  input: Prisma.TransactionCreateInput
): Promise<Transaction> {
  const data = TransactionCreateInputSchema.parse(input);

  return prisma.transaction.create({
    data,
  });
}

export async function updateTransaction(
  input: Prisma.TransactionUpdateInput
): Promise<Transaction> {
  const data = TransactionUpdateInputSchema.parse(input);
  const id = z.string().parse(data.id); // Makes sure that the id must be a string

  // throws an error if not found
  return prisma.transaction.update({
    where: { id },
    data,
  });
}

export async function removeTransaction(id: string): Promise<Transaction> {
  // throws an error if not found
  return prisma.transaction.delete({
    where: { id },
  });
}
