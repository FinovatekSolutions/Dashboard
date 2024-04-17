import {
  Review,
  User,
  Client,
  Transaction,
  Document,
  Town,
  Event,
  Damage,
  Infrastructure,
} from '@prisma/client';

export type onSuccessCallback<T = any> = (data?: T) => void;

export type onErrorCallback = (error?: any) => void;

export type ReviewWithUser = Review & {
  user: User;
};

export type FullReviewDetails = Review & {
  client: Client;
  user: User;
  transactions: Transaction[];
};

export type ClientWithReviews = Client & {
  reviews: ReviewWithUser[];
};

export type DocumentDetails = Omit<Document, 'content'> & {
  towns: Town[];
  events: Event[];
  damages: Damage[];
  infrastructures: Infrastructure[];
};

export type FullDocument = Document & {
  towns: Town[];
  events: Event[];
  damages: Damage[];
  infrastructures: Infrastructure[];
};
