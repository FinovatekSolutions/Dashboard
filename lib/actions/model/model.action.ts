'use server';

import type { Prisma, Model } from '@prisma/client';
import { ModelCreateInputSchema, ModelUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getAllModels(): Promise<Model[]> {
  return prisma.model.findMany({
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getModelById(id: string): Promise<Model | null> {
  return prisma.model.findUnique({
    where: {
      id,
    },
  });
}

export async function createModel(input: Prisma.ModelCreateInput): Promise<Model> {
  const data = ModelCreateInputSchema.parse(input);

  return prisma.model.create({
    data,
  });
}

export async function updateModel(input: Prisma.ModelUpdateInput): Promise<Model> {
  const data = ModelUpdateInputSchema.parse(input);
  const id = z.string().parse(data.id); // Makes sure that the id must be a string

  // throws an error if not found
  return prisma.model.update({
    where: { id },
    data,
  });
}

export async function removeModel(id: string): Promise<Model> {
  // throws an error if not found
  return prisma.model.delete({
    where: { id },
  });
}
