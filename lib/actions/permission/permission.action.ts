'use server';

import type { Prisma, Permission, Review, User } from '@prisma/client';
import { PermissionCreateInputSchema, PermissionUpdateInputSchema } from '@prisma/zod';
import { z } from 'zod';

import prisma from '@/lib/utils/prisma';

export async function getPermissions(): Promise<Permission[]> {
  return prisma.permission.findMany({
    orderBy: {
      createdAt: 'desc', // Use 'desc' for descending order (newest first)
    },
  });
}

export async function getPermissionById(permissionId: string): Promise<Permission | null> {
  return prisma.permission.findUnique({
    where: {
      id: permissionId,
    },
  });
}

export async function getPermissionByEmail(email: string): Promise<Permission | null> {
  return prisma.permission.findUnique({
    where: {
      email,
    },
  });
}

export async function createPermission(input: Prisma.PermissionCreateInput): Promise<Permission> {
  const data = PermissionCreateInputSchema.parse(input);

  return prisma.permission.create({ data });
}

export async function updatePermission(input: Prisma.PermissionUpdateInput): Promise<Permission> {
  const data = PermissionUpdateInputSchema.parse(input);
  const permissionId = z.string().parse(data.id); // Make sure that data.id can only be string

  // throws an error if no permission is found
  return prisma.permission.update({
    where: { id: permissionId },
    data,
  });
}

export async function removePermission(permissionId: string): Promise<Permission> {
  // throws an error if no permission is found
  return prisma.permission.delete({ where: { id: permissionId } });
}
