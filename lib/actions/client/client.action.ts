'use server';

import type { Prisma, Client } from '@prisma/client';
import { ClientCreateInputSchema, ClientUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getClients(): Promise<Client[]> {
  return prisma.client.findMany();
}

export async function getClientById(clientId: string): Promise<Client | null> {
  return prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });
}

export async function createClient(input: Prisma.ClientCreateInput): Promise<void> {
  const data = ClientCreateInputSchema.parse(input);

  await prisma.client.create({ data });
}

export async function updateClient(input: Prisma.ClientUpdateInput): Promise<void> {
  const data = ClientUpdateInputSchema.parse(input);
  const id = z.string().parse(data.id);

  await prisma.client.update({
    where: { id },
    data,
  });
}

export async function removeClient(clientId: string): Promise<void> {
  const id = z.string().parse(clientId);

  await prisma.client.delete({ where: { id } });
}
