import { Review, User, Transaction } from '@prisma/client';

export type onSuccessCallback<T = any> = (data?: T) => void;

export type onErrorCallback = (error?: any) => void;

export type ReviewWithUser = Review & {
  user: User;
};

export type ReviewWithUserAndTransactions = Review & {
  user: User;
  transactions: Transaction[];
};
