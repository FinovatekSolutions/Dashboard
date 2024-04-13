'use server';

import type { Prisma, Event } from '@prisma/client';
import { EventCreateInputSchema, EventUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function createEvent(
  documentId: string,
  input: Prisma.EventCreateInput
): Promise<Event> {
  const data = EventCreateInputSchema.parse(input);

  return prisma.event.create({ data: { ...data, document: { connect: { id: documentId } } } });
}

export async function updateEvent(input: Prisma.EventUpdateInput): Promise<Event> {
  const data = EventUpdateInputSchema.parse(input);
  const eventId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if not found
  return prisma.event.update({
    where: { id: eventId },
    data,
  });
}

export async function removeEvent(eventId: string): Promise<Event> {
  // throws an error if not found
  return prisma.event.delete({
    where: { id: eventId },
  });
}
