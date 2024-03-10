'use server';

import type { Prisma, BankType } from '@prisma/client';
import { BankTypeCreateInputSchema, BankTypeUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getBankTypes(): Promise<BankType[]> {
  return prisma.bankType.findMany({
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getBankTypeById(bankTypeId: string): Promise<BankType | null> {
  return prisma.bankType.findUnique({
    where: {
      id: bankTypeId,
    },
  });
}

export async function createBankType(input: Prisma.BankTypeCreateInput): Promise<BankType> {
  const data = BankTypeCreateInputSchema.parse(input);

  return prisma.bankType.create({ data });
}

export async function updateBankType(input: Prisma.BankTypeUpdateInput): Promise<BankType> {
  const data = BankTypeUpdateInputSchema.parse(input);
  const bankTypeId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if no banktype is found
  return prisma.bankType.update({
    where: { id: bankTypeId },
    data,
  });
}

export async function removeBankType(bankTypeId: string): Promise<BankType> {
  // throws an error if no banktype is found
  return prisma.bankType.delete({ where: { id: bankTypeId } });
}
