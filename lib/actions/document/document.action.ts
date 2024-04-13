'use server';

import type { Prisma, Client } from '@prisma/client';
import { ClientCreateInputSchema, ClientUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';
import { ClientWithReviews } from '@/lib/utils/types';

export async function getClients(): Promise<Client[]> {
  return prisma.client.findMany({
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getClientById(clientId: string): Promise<ClientWithReviews | null> {
  return prisma.client.findUnique({
    where: {
      id: clientId,
    },
    include: {
      reviews: {
        // Includes the reviews for the client
        include: {
          user: true, // This includes the user for each review
        },
      },
    },
  });
}

export async function createClient(input: Prisma.ClientCreateInput): Promise<Client> {
  const data = ClientCreateInputSchema.parse(input);

  return prisma.client.create({ data });
}

export async function updateClient(input: Prisma.ClientUpdateInput): Promise<Client> {
  const data = ClientUpdateInputSchema.parse(input);
  const clientId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if no client is found
  return prisma.client.update({
    where: { id: clientId },
    data,
  });
}

export async function removeClient(clientId: string): Promise<Client> {
  // throws an error if no client is found
  return prisma.client.delete({ where: { id: clientId } });
}
