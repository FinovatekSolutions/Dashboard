'use server';

import type { Prisma } from '@prisma/client';
import { DocumentCreateInputSchema, DocumentUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';
import { DocumentDetails, FullDocument } from '@/lib/utils/types';

export async function getDocuments(): Promise<DocumentDetails[]> {
  // Apparently Prisma does not have a way to exclude fields
  // So all this could've been avoided if I was given
  // the option to simply exclude the content field,
  // instead I have to include EVERYTHING ELSE.
  return prisma.document.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      locked: true,
      incidentDate: true,
      language: true,
      uploaderId: true,
      uploader: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
      editors: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      },
      damages: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      infrastructures: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      towns: {
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      events: {
        select: {
          id: true,
          title: true,
          date: true,
          documentId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getFullDocumentById(documentId: string): Promise<FullDocument | null> {
  return prisma.document.findUnique({
    where: {
      id: documentId,
    },
    include: {
      towns: true,
      events: true,
      damages: true,
      infrastructures: true,
    },
  });
}

export async function createDocument(input: Prisma.DocumentCreateInput): Promise<FullDocument> {
  const data = DocumentCreateInputSchema.parse(input);

  return prisma.document.create({
    data,
    include: {
      towns: true,
      events: true,
      damages: true,
      infrastructures: true,
    },
  });
}

export async function updateDocument(input: Prisma.DocumentUpdateInput): Promise<FullDocument> {
  const data = DocumentUpdateInputSchema.parse(input);
  const documentId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if not found
  return prisma.document.update({
    where: { id: documentId },
    data,
    include: {
      towns: true,
      events: true,
      damages: true,
      infrastructures: true,
    },
  });
}

export async function removeDocument(documentId: string): Promise<FullDocument> {
  // throws an error if not found
  return prisma.document.delete({
    where: { id: documentId },
    include: {
      towns: true,
      events: true,
      damages: true,
      infrastructures: true,
    },
  });
}
