import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const TodoScalarFieldEnumSchema = z.enum(['id','title','isCompleted','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const ClientScalarFieldEnumSchema = z.enum(['id','firstName','lastName','company','email','phone','address','city','state','zip','country','createdAt','updatedAt']);

export const ReviewScalarFieldEnumSchema = z.enum(['id','name','startDate','endDate','userId','clientId','createdAt','updatedAt']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','date','description','amount','reviewId','categoryId','createdAt','updatedAt']);

export const BankTypeScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const BankStatementScalarFieldEnumSchema = z.enum(['id','name','file','reviewId','bankTypeId','createdAt','updatedAt']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','firstName','lastName','email','role','createdAt','updatedAt']);

export const InfrastructureScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const DamageScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const TownScalarFieldEnumSchema = z.enum(['id','name','latitude','longitude','createdAt','updatedAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','title','date','documentId','createdAt','updatedAt']);

export const DocumentScalarFieldEnumSchema = z.enum(['id','title','description','published','locked','incidentDate','content','language','uploaderId','createdAt','updatedAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const LanguageSchema = z.enum(['English','Spanish']);

export type LanguageType = `${z.infer<typeof LanguageSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),
  isCompleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Todo = z.infer<typeof TodoSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Client = z.infer<typeof ClientSchema>

/////////////////////////////////////////
// REVIEW SCHEMA
/////////////////////////////////////////

export const ReviewSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Review = z.infer<typeof ReviewSchema>

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  id: z.string().cuid(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  reviewId: z.string(),
  categoryId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// BANK TYPE SCHEMA
/////////////////////////////////////////

export const BankTypeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type BankType = z.infer<typeof BankTypeSchema>

/////////////////////////////////////////
// BANK STATEMENT SCHEMA
/////////////////////////////////////////

export const BankStatementSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  reviewId: z.string(),
  bankTypeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type BankStatement = z.infer<typeof BankStatementSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// INFRASTRUCTURE SCHEMA
/////////////////////////////////////////

export const InfrastructureSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Infrastructure = z.infer<typeof InfrastructureSchema>

/////////////////////////////////////////
// DAMAGE SCHEMA
/////////////////////////////////////////

export const DamageSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Damage = z.infer<typeof DamageSchema>

/////////////////////////////////////////
// TOWN SCHEMA
/////////////////////////////////////////

export const TownSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Town = z.infer<typeof TownSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  date: z.coerce.date(),
  documentId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// DOCUMENT SCHEMA
/////////////////////////////////////////

export const DocumentSchema = z.object({
  language: LanguageSchema,
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  published: z.boolean(),
  locked: z.boolean(),
  incidentDate: z.coerce.date().nullable(),
  content: z.string().nullable(),
  uploaderId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Document = z.infer<typeof DocumentSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TODO
//------------------------------------------------------

export const TodoSelectSchema: z.ZodType<Prisma.TodoSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  isCompleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  reviews: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CLIENT
//------------------------------------------------------

export const ClientIncludeSchema: z.ZodType<Prisma.ClientInclude> = z.object({
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ClientArgsSchema: z.ZodType<Prisma.ClientDefaultArgs> = z.object({
  select: z.lazy(() => ClientSelectSchema).optional(),
  include: z.lazy(() => ClientIncludeSchema).optional(),
}).strict();

export const ClientCountOutputTypeArgsSchema: z.ZodType<Prisma.ClientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ClientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ClientCountOutputTypeSelectSchema: z.ZodType<Prisma.ClientCountOutputTypeSelect> = z.object({
  reviews: z.boolean().optional(),
}).strict();

export const ClientSelectSchema: z.ZodType<Prisma.ClientSelect> = z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  company: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zip: z.boolean().optional(),
  country: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  reviews: z.union([z.boolean(),z.lazy(() => ReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REVIEW
//------------------------------------------------------

export const ReviewIncludeSchema: z.ZodType<Prisma.ReviewInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  bankStatements: z.union([z.boolean(),z.lazy(() => BankStatementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReviewCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ReviewArgsSchema: z.ZodType<Prisma.ReviewDefaultArgs> = z.object({
  select: z.lazy(() => ReviewSelectSchema).optional(),
  include: z.lazy(() => ReviewIncludeSchema).optional(),
}).strict();

export const ReviewCountOutputTypeArgsSchema: z.ZodType<Prisma.ReviewCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ReviewCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReviewCountOutputTypeSelectSchema: z.ZodType<Prisma.ReviewCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
  bankStatements: z.boolean().optional(),
}).strict();

export const ReviewSelectSchema: z.ZodType<Prisma.ReviewSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  userId: z.boolean().optional(),
  clientId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  client: z.union([z.boolean(),z.lazy(() => ClientArgsSchema)]).optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  bankStatements: z.union([z.boolean(),z.lazy(() => BankStatementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReviewCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSACTION
//------------------------------------------------------

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  review: z.union([z.boolean(),z.lazy(() => ReviewArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

export const TransactionArgsSchema: z.ZodType<Prisma.TransactionDefaultArgs> = z.object({
  select: z.lazy(() => TransactionSelectSchema).optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
}).strict();

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  description: z.boolean().optional(),
  amount: z.boolean().optional(),
  reviewId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  review: z.union([z.boolean(),z.lazy(() => ReviewArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

// BANK TYPE
//------------------------------------------------------

export const BankTypeIncludeSchema: z.ZodType<Prisma.BankTypeInclude> = z.object({
  bankStatements: z.union([z.boolean(),z.lazy(() => BankStatementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BankTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BankTypeArgsSchema: z.ZodType<Prisma.BankTypeDefaultArgs> = z.object({
  select: z.lazy(() => BankTypeSelectSchema).optional(),
  include: z.lazy(() => BankTypeIncludeSchema).optional(),
}).strict();

export const BankTypeCountOutputTypeArgsSchema: z.ZodType<Prisma.BankTypeCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BankTypeCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BankTypeCountOutputTypeSelectSchema: z.ZodType<Prisma.BankTypeCountOutputTypeSelect> = z.object({
  bankStatements: z.boolean().optional(),
}).strict();

export const BankTypeSelectSchema: z.ZodType<Prisma.BankTypeSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  bankStatements: z.union([z.boolean(),z.lazy(() => BankStatementFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BankTypeCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BANK STATEMENT
//------------------------------------------------------

export const BankStatementIncludeSchema: z.ZodType<Prisma.BankStatementInclude> = z.object({
  review: z.union([z.boolean(),z.lazy(() => ReviewArgsSchema)]).optional(),
  bankType: z.union([z.boolean(),z.lazy(() => BankTypeArgsSchema)]).optional(),
}).strict()

export const BankStatementArgsSchema: z.ZodType<Prisma.BankStatementDefaultArgs> = z.object({
  select: z.lazy(() => BankStatementSelectSchema).optional(),
  include: z.lazy(() => BankStatementIncludeSchema).optional(),
}).strict();

export const BankStatementSelectSchema: z.ZodType<Prisma.BankStatementSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  file: z.boolean().optional(),
  reviewId: z.boolean().optional(),
  bankTypeId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  review: z.union([z.boolean(),z.lazy(() => ReviewArgsSchema)]).optional(),
  bankType: z.union([z.boolean(),z.lazy(() => BankTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  uploadedDocuments: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  sharedDocuments: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  uploadedDocuments: z.boolean().optional(),
  sharedDocuments: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  uploadedDocuments: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  sharedDocuments: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INFRASTRUCTURE
//------------------------------------------------------

export const InfrastructureIncludeSchema: z.ZodType<Prisma.InfrastructureInclude> = z.object({
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InfrastructureCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InfrastructureArgsSchema: z.ZodType<Prisma.InfrastructureDefaultArgs> = z.object({
  select: z.lazy(() => InfrastructureSelectSchema).optional(),
  include: z.lazy(() => InfrastructureIncludeSchema).optional(),
}).strict();

export const InfrastructureCountOutputTypeArgsSchema: z.ZodType<Prisma.InfrastructureCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InfrastructureCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InfrastructureCountOutputTypeSelectSchema: z.ZodType<Prisma.InfrastructureCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
}).strict();

export const InfrastructureSelectSchema: z.ZodType<Prisma.InfrastructureSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InfrastructureCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DAMAGE
//------------------------------------------------------

export const DamageIncludeSchema: z.ZodType<Prisma.DamageInclude> = z.object({
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DamageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DamageArgsSchema: z.ZodType<Prisma.DamageDefaultArgs> = z.object({
  select: z.lazy(() => DamageSelectSchema).optional(),
  include: z.lazy(() => DamageIncludeSchema).optional(),
}).strict();

export const DamageCountOutputTypeArgsSchema: z.ZodType<Prisma.DamageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DamageCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DamageCountOutputTypeSelectSchema: z.ZodType<Prisma.DamageCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
}).strict();

export const DamageSelectSchema: z.ZodType<Prisma.DamageSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DamageCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TOWN
//------------------------------------------------------

export const TownIncludeSchema: z.ZodType<Prisma.TownInclude> = z.object({
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TownCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TownArgsSchema: z.ZodType<Prisma.TownDefaultArgs> = z.object({
  select: z.lazy(() => TownSelectSchema).optional(),
  include: z.lazy(() => TownIncludeSchema).optional(),
}).strict();

export const TownCountOutputTypeArgsSchema: z.ZodType<Prisma.TownCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TownCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TownCountOutputTypeSelectSchema: z.ZodType<Prisma.TownCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
}).strict();

export const TownSelectSchema: z.ZodType<Prisma.TownSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TownCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  Document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  date: z.boolean().optional(),
  documentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Document: z.union([z.boolean(),z.lazy(() => DocumentArgsSchema)]).optional(),
}).strict()

// DOCUMENT
//------------------------------------------------------

export const DocumentIncludeSchema: z.ZodType<Prisma.DocumentInclude> = z.object({
  damages: z.union([z.boolean(),z.lazy(() => DamageFindManyArgsSchema)]).optional(),
  infrastructures: z.union([z.boolean(),z.lazy(() => InfrastructureFindManyArgsSchema)]).optional(),
  towns: z.union([z.boolean(),z.lazy(() => TownFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  uploader: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  editors: z.union([z.boolean(),z.lazy(() => PermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DocumentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DocumentArgsSchema: z.ZodType<Prisma.DocumentDefaultArgs> = z.object({
  select: z.lazy(() => DocumentSelectSchema).optional(),
  include: z.lazy(() => DocumentIncludeSchema).optional(),
}).strict();

export const DocumentCountOutputTypeArgsSchema: z.ZodType<Prisma.DocumentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DocumentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DocumentCountOutputTypeSelectSchema: z.ZodType<Prisma.DocumentCountOutputTypeSelect> = z.object({
  damages: z.boolean().optional(),
  infrastructures: z.boolean().optional(),
  towns: z.boolean().optional(),
  events: z.boolean().optional(),
  editors: z.boolean().optional(),
}).strict();

export const DocumentSelectSchema: z.ZodType<Prisma.DocumentSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.boolean().optional(),
  content: z.boolean().optional(),
  language: z.boolean().optional(),
  uploaderId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  damages: z.union([z.boolean(),z.lazy(() => DamageFindManyArgsSchema)]).optional(),
  infrastructures: z.union([z.boolean(),z.lazy(() => InfrastructureFindManyArgsSchema)]).optional(),
  towns: z.union([z.boolean(),z.lazy(() => TownFindManyArgsSchema)]).optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  uploader: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  editors: z.union([z.boolean(),z.lazy(() => PermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DocumentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TodoWhereInputSchema: z.ZodType<Prisma.TodoWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isCompleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TodoOrderByWithRelationInputSchema: z.ZodType<Prisma.TodoOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isCompleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoWhereUniqueInputSchema: z.ZodType<Prisma.TodoWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoWhereInputSchema),z.lazy(() => TodoWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }) ]).optional(),
  isCompleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const TodoOrderByWithAggregationInputSchema: z.ZodType<Prisma.TodoOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isCompleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TodoCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TodoMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TodoMinOrderByAggregateInputSchema).optional()
}).strict();

export const TodoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TodoScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TodoScalarWhereWithAggregatesInputSchema),z.lazy(() => TodoScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isCompleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ClientWhereInputSchema: z.ZodType<Prisma.ClientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict();

export const ClientOrderByWithRelationInputSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  reviews: z.lazy(() => ReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ClientWhereUniqueInputSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }) ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }) ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string().email({ message: 'Invalid email address' }) ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }) ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Address cannot be empty." }) ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "City cannot be empty." }) ]).optional(),
  state: z.union([ z.lazy(() => StringFilterSchema),z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }) ]).optional(),
  zip: z.union([ z.lazy(() => StringFilterSchema),z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }) ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  reviews: z.lazy(() => ReviewListRelationFilterSchema).optional()
}).strict());

export const ClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  state: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  zip: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewWhereInputSchema: z.ZodType<Prisma.ReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  client: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  bankStatements: z.lazy(() => BankStatementListRelationFilterSchema).optional()
}).strict();

export const ReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.ReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  client: z.lazy(() => ClientOrderByWithRelationInputSchema).optional(),
  transactions: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReviewWhereUniqueInputSchema: z.ZodType<Prisma.ReviewWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewWhereInputSchema),z.lazy(() => ReviewWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Name cannot be empty." }) ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  client: z.union([ z.lazy(() => ClientRelationFilterSchema),z.lazy(() => ClientWhereInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterSchema).optional(),
  bankStatements: z.lazy(() => BankStatementListRelationFilterSchema).optional()
}).strict());

export const ReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReviewCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReviewMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => ReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  review: z.union([ z.lazy(() => ReviewRelationFilterSchema),z.lazy(() => ReviewWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
}).strict();

export const TransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  review: z.lazy(() => ReviewOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Description cannot be empty." }) ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  review: z.union([ z.lazy(() => ReviewRelationFilterSchema),z.lazy(() => ReviewWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
}).strict());

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionSumOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  reviewId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BankTypeWhereInputSchema: z.ZodType<Prisma.BankTypeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankTypeWhereInputSchema),z.lazy(() => BankTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankTypeWhereInputSchema),z.lazy(() => BankTypeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bankStatements: z.lazy(() => BankStatementListRelationFilterSchema).optional()
}).strict();

export const BankTypeOrderByWithRelationInputSchema: z.ZodType<Prisma.BankTypeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  bankStatements: z.lazy(() => BankStatementOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BankTypeWhereUniqueInputSchema: z.ZodType<Prisma.BankTypeWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => BankTypeWhereInputSchema),z.lazy(() => BankTypeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankTypeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankTypeWhereInputSchema),z.lazy(() => BankTypeWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Name cannot be empty." }) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  bankStatements: z.lazy(() => BankStatementListRelationFilterSchema).optional()
}).strict());

export const BankTypeOrderByWithAggregationInputSchema: z.ZodType<Prisma.BankTypeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BankTypeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BankTypeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BankTypeMinOrderByAggregateInputSchema).optional()
}).strict();

export const BankTypeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BankTypeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BankTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => BankTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankTypeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankTypeScalarWhereWithAggregatesInputSchema),z.lazy(() => BankTypeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BankStatementWhereInputSchema: z.ZodType<Prisma.BankStatementWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankStatementWhereInputSchema),z.lazy(() => BankStatementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankStatementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankStatementWhereInputSchema),z.lazy(() => BankStatementWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  file: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bankTypeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  review: z.union([ z.lazy(() => ReviewRelationFilterSchema),z.lazy(() => ReviewWhereInputSchema) ]).optional(),
  bankType: z.union([ z.lazy(() => BankTypeRelationFilterSchema),z.lazy(() => BankTypeWhereInputSchema) ]).optional(),
}).strict();

export const BankStatementOrderByWithRelationInputSchema: z.ZodType<Prisma.BankStatementOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  bankTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  review: z.lazy(() => ReviewOrderByWithRelationInputSchema).optional(),
  bankType: z.lazy(() => BankTypeOrderByWithRelationInputSchema).optional()
}).strict();

export const BankStatementWhereUniqueInputSchema: z.ZodType<Prisma.BankStatementWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => BankStatementWhereInputSchema),z.lazy(() => BankStatementWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankStatementWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankStatementWhereInputSchema),z.lazy(() => BankStatementWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Name cannot be empty." }) ]).optional(),
  file: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bankTypeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  review: z.union([ z.lazy(() => ReviewRelationFilterSchema),z.lazy(() => ReviewWhereInputSchema) ]).optional(),
  bankType: z.union([ z.lazy(() => BankTypeRelationFilterSchema),z.lazy(() => BankTypeWhereInputSchema) ]).optional(),
}).strict());

export const BankStatementOrderByWithAggregationInputSchema: z.ZodType<Prisma.BankStatementOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  bankTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BankStatementCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BankStatementMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BankStatementMinOrderByAggregateInputSchema).optional()
}).strict();

export const BankStatementScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BankStatementScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BankStatementScalarWhereWithAggregatesInputSchema),z.lazy(() => BankStatementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankStatementScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankStatementScalarWhereWithAggregatesInputSchema),z.lazy(() => BankStatementScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  file: z.union([ z.lazy(() => BytesWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional(),
  reviewId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  bankTypeId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  transactions: z.lazy(() => TransactionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string().min(1, { message: "Name cannot be empty." }) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  uploadedDocuments: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string().email({ message: 'Invalid email address' })
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }) ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }) ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentListRelationFilterSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InfrastructureWhereInputSchema: z.ZodType<Prisma.InfrastructureWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InfrastructureWhereInputSchema),z.lazy(() => InfrastructureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfrastructureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfrastructureWhereInputSchema),z.lazy(() => InfrastructureWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict();

export const InfrastructureOrderByWithRelationInputSchema: z.ZodType<Prisma.InfrastructureOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InfrastructureWhereUniqueInputSchema: z.ZodType<Prisma.InfrastructureWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => InfrastructureWhereInputSchema),z.lazy(() => InfrastructureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfrastructureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfrastructureWhereInputSchema),z.lazy(() => InfrastructureWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict());

export const InfrastructureOrderByWithAggregationInputSchema: z.ZodType<Prisma.InfrastructureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InfrastructureCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InfrastructureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InfrastructureMinOrderByAggregateInputSchema).optional()
}).strict();

export const InfrastructureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InfrastructureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InfrastructureScalarWhereWithAggregatesInputSchema),z.lazy(() => InfrastructureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfrastructureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfrastructureScalarWhereWithAggregatesInputSchema),z.lazy(() => InfrastructureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DamageWhereInputSchema: z.ZodType<Prisma.DamageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DamageWhereInputSchema),z.lazy(() => DamageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DamageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DamageWhereInputSchema),z.lazy(() => DamageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict();

export const DamageOrderByWithRelationInputSchema: z.ZodType<Prisma.DamageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DamageWhereUniqueInputSchema: z.ZodType<Prisma.DamageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DamageWhereInputSchema),z.lazy(() => DamageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DamageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DamageWhereInputSchema),z.lazy(() => DamageWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict());

export const DamageOrderByWithAggregationInputSchema: z.ZodType<Prisma.DamageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DamageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DamageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DamageMinOrderByAggregateInputSchema).optional()
}).strict();

export const DamageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DamageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DamageScalarWhereWithAggregatesInputSchema),z.lazy(() => DamageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DamageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DamageScalarWhereWithAggregatesInputSchema),z.lazy(() => DamageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TownWhereInputSchema: z.ZodType<Prisma.TownWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TownWhereInputSchema),z.lazy(() => TownWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TownWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TownWhereInputSchema),z.lazy(() => TownWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict();

export const TownOrderByWithRelationInputSchema: z.ZodType<Prisma.TownOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  documents: z.lazy(() => DocumentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TownWhereUniqueInputSchema: z.ZodType<Prisma.TownWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TownWhereInputSchema),z.lazy(() => TownWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TownWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TownWhereInputSchema),z.lazy(() => TownWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documents: z.lazy(() => DocumentListRelationFilterSchema).optional()
}).strict());

export const TownOrderByWithAggregationInputSchema: z.ZodType<Prisma.TownOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TownCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TownAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TownMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TownMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TownSumOrderByAggregateInputSchema).optional()
}).strict();

export const TownScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TownScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TownScalarWhereWithAggregatesInputSchema),z.lazy(() => TownScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TownScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TownScalarWhereWithAggregatesInputSchema),z.lazy(() => TownScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Document: z.lazy(() => DocumentOrderByWithRelationInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Document: z.union([ z.lazy(() => DocumentRelationFilterSchema),z.lazy(() => DocumentWhereInputSchema) ]).optional(),
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  documentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentWhereInputSchema: z.ZodType<Prisma.DocumentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  locked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  incidentDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  language: z.union([ z.lazy(() => EnumLanguageFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  damages: z.lazy(() => DamageListRelationFilterSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureListRelationFilterSchema).optional(),
  towns: z.lazy(() => TownListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  uploader: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  editors: z.lazy(() => PermissionListRelationFilterSchema).optional()
}).strict();

export const DocumentOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  locked: z.lazy(() => SortOrderSchema).optional(),
  incidentDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  damages: z.lazy(() => DamageOrderByRelationAggregateInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureOrderByRelationAggregateInputSchema).optional(),
  towns: z.lazy(() => TownOrderByRelationAggregateInputSchema).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional(),
  uploader: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional(),
  editors: z.lazy(() => PermissionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DocumentWhereUniqueInputSchema: z.ZodType<Prisma.DocumentWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentWhereInputSchema),z.lazy(() => DocumentWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  locked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  incidentDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  language: z.union([ z.lazy(() => EnumLanguageFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  damages: z.lazy(() => DamageListRelationFilterSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureListRelationFilterSchema).optional(),
  towns: z.lazy(() => TownListRelationFilterSchema).optional(),
  events: z.lazy(() => EventListRelationFilterSchema).optional(),
  uploader: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  editors: z.lazy(() => PermissionListRelationFilterSchema).optional()
}).strict());

export const DocumentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  locked: z.lazy(() => SortOrderSchema).optional(),
  incidentDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentMinOrderByAggregateInputSchema).optional()
}).strict();

export const DocumentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema),z.lazy(() => DocumentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  locked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  incidentDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  language: z.union([ z.lazy(() => EnumLanguageWithAggregatesFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TodoCreateInputSchema: z.ZodType<Prisma.TodoCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),
  isCompleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUncheckedCreateInputSchema: z.ZodType<Prisma.TodoUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),
  isCompleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUpdateInputSchema: z.ZodType<Prisma.TodoUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCompleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoUncheckedUpdateInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCompleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoCreateManyInputSchema: z.ZodType<Prisma.TodoCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),
  isCompleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TodoUpdateManyMutationInputSchema: z.ZodType<Prisma.TodoUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCompleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TodoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TodoUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(20, { message: "Must be at most 20 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isCompleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClientCreateInputSchema: z.ZodType<Prisma.ClientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutClientInputSchema).optional()
}).strict();

export const ClientUncheckedCreateInputSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutClientInputSchema).optional()
}).strict();

export const ClientUpdateInputSchema: z.ZodType<Prisma.ClientUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutClientNestedInputSchema).optional()
}).strict();

export const ClientCreateManyInputSchema: z.ZodType<Prisma.ClientCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ClientUpdateManyMutationInputSchema: z.ZodType<Prisma.ClientUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateInputSchema: z.ZodType<Prisma.ReviewCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutReviewsInputSchema),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUpdateInputSchema: z.ZodType<Prisma.ReviewUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewCreateManyInputSchema: z.ZodType<Prisma.ReviewCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.ReviewUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateInputSchema: z.ZodType<Prisma.TransactionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  review: z.lazy(() => ReviewCreateNestedOneWithoutTransactionsInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTransactionsInputSchema)
}).strict();

export const TransactionUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  reviewId: z.string(),
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateInputSchema: z.ZodType<Prisma.TransactionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  review: z.lazy(() => ReviewUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyInputSchema: z.ZodType<Prisma.TransactionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  reviewId: z.string(),
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankTypeCreateInputSchema: z.ZodType<Prisma.BankTypeCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bankStatements: z.lazy(() => BankStatementCreateNestedManyWithoutBankTypeInputSchema).optional()
}).strict();

export const BankTypeUncheckedCreateInputSchema: z.ZodType<Prisma.BankTypeUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedCreateNestedManyWithoutBankTypeInputSchema).optional()
}).strict();

export const BankTypeUpdateInputSchema: z.ZodType<Prisma.BankTypeUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bankStatements: z.lazy(() => BankStatementUpdateManyWithoutBankTypeNestedInputSchema).optional()
}).strict();

export const BankTypeUncheckedUpdateInputSchema: z.ZodType<Prisma.BankTypeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedUpdateManyWithoutBankTypeNestedInputSchema).optional()
}).strict();

export const BankTypeCreateManyInputSchema: z.ZodType<Prisma.BankTypeCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankTypeUpdateManyMutationInputSchema: z.ZodType<Prisma.BankTypeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankTypeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BankTypeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementCreateInputSchema: z.ZodType<Prisma.BankStatementCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  review: z.lazy(() => ReviewCreateNestedOneWithoutBankStatementsInputSchema),
  bankType: z.lazy(() => BankTypeCreateNestedOneWithoutBankStatementsInputSchema)
}).strict();

export const BankStatementUncheckedCreateInputSchema: z.ZodType<Prisma.BankStatementUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  reviewId: z.string(),
  bankTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementUpdateInputSchema: z.ZodType<Prisma.BankStatementUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  review: z.lazy(() => ReviewUpdateOneRequiredWithoutBankStatementsNestedInputSchema).optional(),
  bankType: z.lazy(() => BankTypeUpdateOneRequiredWithoutBankStatementsNestedInputSchema).optional()
}).strict();

export const BankStatementUncheckedUpdateInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankTypeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementCreateManyInputSchema: z.ZodType<Prisma.BankStatementCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  reviewId: z.string(),
  bankTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementUpdateManyMutationInputSchema: z.ZodType<Prisma.BankStatementUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankTypeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  uploadedDocuments: z.lazy(() => DocumentCreateNestedManyWithoutUploaderInputSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentCreateNestedManyWithoutEditorsInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  uploadedDocuments: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutUploaderInputSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutEditorsInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentUpdateManyWithoutUploaderNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentUpdateManyWithoutEditorsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentUncheckedUpdateManyWithoutUploaderNestedInputSchema).optional(),
  sharedDocuments: z.lazy(() => DocumentUncheckedUpdateManyWithoutEditorsNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfrastructureCreateInputSchema: z.ZodType<Prisma.InfrastructureCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutInfrastructuresInputSchema).optional()
}).strict();

export const InfrastructureUncheckedCreateInputSchema: z.ZodType<Prisma.InfrastructureUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutInfrastructuresInputSchema).optional()
}).strict();

export const InfrastructureUpdateInputSchema: z.ZodType<Prisma.InfrastructureUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutInfrastructuresNestedInputSchema).optional()
}).strict();

export const InfrastructureUncheckedUpdateInputSchema: z.ZodType<Prisma.InfrastructureUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutInfrastructuresNestedInputSchema).optional()
}).strict();

export const InfrastructureCreateManyInputSchema: z.ZodType<Prisma.InfrastructureCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InfrastructureUpdateManyMutationInputSchema: z.ZodType<Prisma.InfrastructureUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfrastructureUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InfrastructureUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DamageCreateInputSchema: z.ZodType<Prisma.DamageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutDamagesInputSchema).optional()
}).strict();

export const DamageUncheckedCreateInputSchema: z.ZodType<Prisma.DamageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutDamagesInputSchema).optional()
}).strict();

export const DamageUpdateInputSchema: z.ZodType<Prisma.DamageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutDamagesNestedInputSchema).optional()
}).strict();

export const DamageUncheckedUpdateInputSchema: z.ZodType<Prisma.DamageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutDamagesNestedInputSchema).optional()
}).strict();

export const DamageCreateManyInputSchema: z.ZodType<Prisma.DamageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DamageUpdateManyMutationInputSchema: z.ZodType<Prisma.DamageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DamageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DamageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TownCreateInputSchema: z.ZodType<Prisma.TownCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentCreateNestedManyWithoutTownsInputSchema).optional()
}).strict();

export const TownUncheckedCreateInputSchema: z.ZodType<Prisma.TownUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  documents: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutTownsInputSchema).optional()
}).strict();

export const TownUpdateInputSchema: z.ZodType<Prisma.TownUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUpdateManyWithoutTownsNestedInputSchema).optional()
}).strict();

export const TownUncheckedUpdateInputSchema: z.ZodType<Prisma.TownUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentUncheckedUpdateManyWithoutTownsNestedInputSchema).optional()
}).strict();

export const TownCreateManyInputSchema: z.ZodType<Prisma.TownCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TownUpdateManyMutationInputSchema: z.ZodType<Prisma.TownUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TownUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TownUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Document: z.lazy(() => DocumentCreateNestedOneWithoutEventsInputSchema)
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  documentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Document: z.lazy(() => DocumentUpdateOneRequiredWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  documentId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateInputSchema: z.ZodType<Prisma.DocumentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUpdateInputSchema: z.ZodType<Prisma.DocumentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentCreateManyInputSchema: z.ZodType<Prisma.DocumentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TodoCountOrderByAggregateInputSchema: z.ZodType<Prisma.TodoCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isCompleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isCompleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TodoMinOrderByAggregateInputSchema: z.ZodType<Prisma.TodoMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  isCompleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const ReviewListRelationFilterSchema: z.ZodType<Prisma.ReviewListRelationFilter> = z.object({
  every: z.lazy(() => ReviewWhereInputSchema).optional(),
  some: z.lazy(() => ReviewWhereInputSchema).optional(),
  none: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const ClientCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ClientRelationFilterSchema: z.ZodType<Prisma.ClientRelationFilter> = z.object({
  is: z.lazy(() => ClientWhereInputSchema).optional(),
  isNot: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const TransactionListRelationFilterSchema: z.ZodType<Prisma.TransactionListRelationFilter> = z.object({
  every: z.lazy(() => TransactionWhereInputSchema).optional(),
  some: z.lazy(() => TransactionWhereInputSchema).optional(),
  none: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const BankStatementListRelationFilterSchema: z.ZodType<Prisma.BankStatementListRelationFilter> = z.object({
  every: z.lazy(() => BankStatementWhereInputSchema).optional(),
  some: z.lazy(() => BankStatementWhereInputSchema).optional(),
  none: z.lazy(() => BankStatementWhereInputSchema).optional()
}).strict();

export const TransactionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankStatementOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BankStatementOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  clientId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ReviewRelationFilterSchema: z.ZodType<Prisma.ReviewRelationFilter> = z.object({
  is: z.lazy(() => ReviewWhereInputSchema).optional(),
  isNot: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const CategoryRelationFilterSchema: z.ZodType<Prisma.CategoryRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const TransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionSumOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BankTypeCountOrderByAggregateInputSchema: z.ZodType<Prisma.BankTypeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankTypeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BankTypeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankTypeMinOrderByAggregateInputSchema: z.ZodType<Prisma.BankTypeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BytesFilterSchema: z.ZodType<Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const BankTypeRelationFilterSchema: z.ZodType<Prisma.BankTypeRelationFilter> = z.object({
  is: z.lazy(() => BankTypeWhereInputSchema).optional(),
  isNot: z.lazy(() => BankTypeWhereInputSchema).optional()
}).strict();

export const BankStatementCountOrderByAggregateInputSchema: z.ZodType<Prisma.BankStatementCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  bankTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankStatementMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BankStatementMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  bankTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BankStatementMinOrderByAggregateInputSchema: z.ZodType<Prisma.BankStatementMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  reviewId: z.lazy(() => SortOrderSchema).optional(),
  bankTypeId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BytesWithAggregatesFilterSchema: z.ZodType<Prisma.BytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DocumentListRelationFilterSchema: z.ZodType<Prisma.DocumentListRelationFilter> = z.object({
  every: z.lazy(() => DocumentWhereInputSchema).optional(),
  some: z.lazy(() => DocumentWhereInputSchema).optional(),
  none: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const InfrastructureCountOrderByAggregateInputSchema: z.ZodType<Prisma.InfrastructureCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InfrastructureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InfrastructureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InfrastructureMinOrderByAggregateInputSchema: z.ZodType<Prisma.InfrastructureMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DamageCountOrderByAggregateInputSchema: z.ZodType<Prisma.DamageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DamageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DamageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DamageMinOrderByAggregateInputSchema: z.ZodType<Prisma.DamageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownCountOrderByAggregateInputSchema: z.ZodType<Prisma.TownCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TownAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TownMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownMinOrderByAggregateInputSchema: z.ZodType<Prisma.TownMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownSumOrderByAggregateInputSchema: z.ZodType<Prisma.TownSumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentRelationFilterSchema: z.ZodType<Prisma.DocumentRelationFilter> = z.object({
  is: z.lazy(() => DocumentWhereInputSchema).optional(),
  isNot: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumLanguageFilterSchema: z.ZodType<Prisma.EnumLanguageFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.lazy(() => LanguageSchema).array().optional(),
  notIn: z.lazy(() => LanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageFilterSchema) ]).optional(),
}).strict();

export const DamageListRelationFilterSchema: z.ZodType<Prisma.DamageListRelationFilter> = z.object({
  every: z.lazy(() => DamageWhereInputSchema).optional(),
  some: z.lazy(() => DamageWhereInputSchema).optional(),
  none: z.lazy(() => DamageWhereInputSchema).optional()
}).strict();

export const InfrastructureListRelationFilterSchema: z.ZodType<Prisma.InfrastructureListRelationFilter> = z.object({
  every: z.lazy(() => InfrastructureWhereInputSchema).optional(),
  some: z.lazy(() => InfrastructureWhereInputSchema).optional(),
  none: z.lazy(() => InfrastructureWhereInputSchema).optional()
}).strict();

export const TownListRelationFilterSchema: z.ZodType<Prisma.TownListRelationFilter> = z.object({
  every: z.lazy(() => TownWhereInputSchema).optional(),
  some: z.lazy(() => TownWhereInputSchema).optional(),
  none: z.lazy(() => TownWhereInputSchema).optional()
}).strict();

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const PermissionRelationFilterSchema: z.ZodType<Prisma.PermissionRelationFilter> = z.object({
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionListRelationFilterSchema: z.ZodType<Prisma.PermissionListRelationFilter> = z.object({
  every: z.lazy(() => PermissionWhereInputSchema).optional(),
  some: z.lazy(() => PermissionWhereInputSchema).optional(),
  none: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const DamageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DamageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InfrastructureOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InfrastructureOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TownOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TownOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  locked: z.lazy(() => SortOrderSchema).optional(),
  incidentDate: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  locked: z.lazy(() => SortOrderSchema).optional(),
  incidentDate: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DocumentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  published: z.lazy(() => SortOrderSchema).optional(),
  locked: z.lazy(() => SortOrderSchema).optional(),
  incidentDate: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  uploaderId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.lazy(() => LanguageSchema).array().optional(),
  notIn: z.lazy(() => LanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewCreateWithoutUserInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedManyWithoutClientInputSchema: z.ZodType<Prisma.ReviewCreateNestedManyWithoutClientInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewCreateWithoutClientInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyClientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedCreateNestedManyWithoutClientInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateNestedManyWithoutClientInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewCreateWithoutClientInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyClientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReviewUpdateManyWithoutClientNestedInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithoutClientNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewCreateWithoutClientInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutClientInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyClientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutClientInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutClientInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutClientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewUncheckedUpdateManyWithoutClientNestedInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutClientNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewCreateWithoutClientInputSchema).array(),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema),z.lazy(() => ReviewCreateOrConnectWithoutClientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReviewUpsertWithWhereUniqueWithoutClientInputSchema),z.lazy(() => ReviewUpsertWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReviewCreateManyClientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReviewWhereUniqueInputSchema),z.lazy(() => ReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateWithWhereUniqueWithoutClientInputSchema),z.lazy(() => ReviewUpdateWithWhereUniqueWithoutClientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReviewUpdateManyWithWhereWithoutClientInputSchema),z.lazy(() => ReviewUpdateManyWithWhereWithoutClientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ClientCreateNestedOneWithoutReviewsInputSchema: z.ZodType<Prisma.ClientCreateNestedOneWithoutReviewsInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional()
}).strict();

export const TransactionCreateNestedManyWithoutReviewInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionCreateWithoutReviewInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyReviewInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankStatementCreateNestedManyWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementCreateNestedManyWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementCreateWithoutReviewInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyReviewInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionCreateWithoutReviewInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyReviewInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUncheckedCreateNestedManyWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUncheckedCreateNestedManyWithoutReviewInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementCreateWithoutReviewInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyReviewInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const ClientUpdateOneRequiredWithoutReviewsNestedInputSchema: z.ZodType<Prisma.ClientUpdateOneRequiredWithoutReviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutReviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClientCreateOrConnectWithoutReviewsInputSchema).optional(),
  upsert: z.lazy(() => ClientUpsertWithoutReviewsInputSchema).optional(),
  connect: z.lazy(() => ClientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClientUpdateToOneWithWhereWithoutReviewsInputSchema),z.lazy(() => ClientUpdateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutReviewsInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutReviewNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionCreateWithoutReviewInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyReviewInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutReviewInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutReviewInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUpdateManyWithoutReviewNestedInputSchema: z.ZodType<Prisma.BankStatementUpdateManyWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementCreateWithoutReviewInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyReviewInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankStatementUpdateManyWithWhereWithoutReviewInputSchema),z.lazy(() => BankStatementUpdateManyWithWhereWithoutReviewInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutReviewNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionCreateWithoutReviewInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyReviewInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutReviewInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutReviewInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUncheckedUpdateManyWithoutReviewNestedInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateManyWithoutReviewNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementCreateWithoutReviewInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutReviewInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyReviewInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutReviewInputSchema),z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutReviewInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankStatementUpdateManyWithWhereWithoutReviewInputSchema),z.lazy(() => BankStatementUpdateManyWithWhereWithoutReviewInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReviewCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => ReviewWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ReviewUpdateOneRequiredWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.ReviewUpdateOneRequiredWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReviewCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => ReviewUpsertWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => ReviewWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => ReviewUpdateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneRequiredWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => CategoryUpdateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const BankStatementCreateNestedManyWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementCreateNestedManyWithoutBankTypeInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyBankTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUncheckedCreateNestedManyWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUncheckedCreateNestedManyWithoutBankTypeInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyBankTypeInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUpdateManyWithoutBankTypeNestedInputSchema: z.ZodType<Prisma.BankStatementUpdateManyWithoutBankTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutBankTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyBankTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutBankTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankStatementUpdateManyWithWhereWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpdateManyWithWhereWithoutBankTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BankStatementUncheckedUpdateManyWithoutBankTypeNestedInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateManyWithoutBankTypeNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema).array(),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema),z.lazy(() => BankStatementCreateOrConnectWithoutBankTypeInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpsertWithWhereUniqueWithoutBankTypeInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BankStatementCreateManyBankTypeInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BankStatementWhereUniqueInputSchema),z.lazy(() => BankStatementWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpdateWithWhereUniqueWithoutBankTypeInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BankStatementUpdateManyWithWhereWithoutBankTypeInputSchema),z.lazy(() => BankStatementUpdateManyWithWhereWithoutBankTypeInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReviewCreateNestedOneWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewCreateNestedOneWithoutBankStatementsInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutBankStatementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReviewCreateOrConnectWithoutBankStatementsInputSchema).optional(),
  connect: z.lazy(() => ReviewWhereUniqueInputSchema).optional()
}).strict();

export const BankTypeCreateNestedOneWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeCreateNestedOneWithoutBankStatementsInput> = z.object({
  create: z.union([ z.lazy(() => BankTypeCreateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedCreateWithoutBankStatementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankTypeCreateOrConnectWithoutBankStatementsInputSchema).optional(),
  connect: z.lazy(() => BankTypeWhereUniqueInputSchema).optional()
}).strict();

export const BytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional()
}).strict();

export const ReviewUpdateOneRequiredWithoutBankStatementsNestedInputSchema: z.ZodType<Prisma.ReviewUpdateOneRequiredWithoutBankStatementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReviewCreateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutBankStatementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReviewCreateOrConnectWithoutBankStatementsInputSchema).optional(),
  upsert: z.lazy(() => ReviewUpsertWithoutBankStatementsInputSchema).optional(),
  connect: z.lazy(() => ReviewWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReviewUpdateToOneWithWhereWithoutBankStatementsInputSchema),z.lazy(() => ReviewUpdateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutBankStatementsInputSchema) ]).optional(),
}).strict();

export const BankTypeUpdateOneRequiredWithoutBankStatementsNestedInputSchema: z.ZodType<Prisma.BankTypeUpdateOneRequiredWithoutBankStatementsNestedInput> = z.object({
  create: z.union([ z.lazy(() => BankTypeCreateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedCreateWithoutBankStatementsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BankTypeCreateOrConnectWithoutBankStatementsInputSchema).optional(),
  upsert: z.lazy(() => BankTypeUpsertWithoutBankStatementsInputSchema).optional(),
  connect: z.lazy(() => BankTypeWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BankTypeUpdateToOneWithWhereWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUpdateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedUpdateWithoutBankStatementsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionCreateWithoutCategoryInputSchema).array(),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => TransactionCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionWhereUniqueInputSchema),z.lazy(() => TransactionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => TransactionUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutUploaderInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentCreateWithoutUploaderInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyUploaderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutEditorsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentCreateWithoutEditorsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutUploaderInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentCreateWithoutUploaderInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyUploaderInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutEditorsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentCreateWithoutEditorsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DocumentUpdateManyWithoutUploaderNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutUploaderNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentCreateWithoutUploaderInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutUploaderInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutUploaderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyUploaderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutUploaderInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutUploaderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutUploaderInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutUploaderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUpdateManyWithoutEditorsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutEditorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentCreateWithoutEditorsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutEditorsInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutEditorsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutEditorsInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutEditorsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutEditorsInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutEditorsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutUploaderNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutUploaderNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentCreateWithoutUploaderInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutUploaderInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutUploaderInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutUploaderInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentCreateManyUploaderInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutUploaderInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutUploaderInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutUploaderInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutUploaderInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutEditorsNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutEditorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentCreateWithoutEditorsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutEditorsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutEditorsInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutEditorsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutEditorsInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutEditorsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutEditorsInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutEditorsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutInfrastructuresInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutInfrastructuresInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUpdateManyWithoutInfrastructuresNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutInfrastructuresNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutInfrastructuresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutInfrastructuresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutInfrastructuresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutInfrastructuresNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutInfrastructuresNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutInfrastructuresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutInfrastructuresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutInfrastructuresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutInfrastructuresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutDamagesInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentCreateWithoutDamagesInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutDamagesInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentCreateWithoutDamagesInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUpdateManyWithoutDamagesNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutDamagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentCreateWithoutDamagesInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDamagesInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDamagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDamagesInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDamagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutDamagesInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutDamagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutDamagesNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDamagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentCreateWithoutDamagesInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutDamagesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDamagesInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutDamagesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDamagesInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutDamagesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutDamagesInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutDamagesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedManyWithoutTownsInputSchema: z.ZodType<Prisma.DocumentCreateNestedManyWithoutTownsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentCreateWithoutTownsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedCreateNestedManyWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateNestedManyWithoutTownsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentCreateWithoutTownsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DocumentUpdateManyWithoutTownsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithoutTownsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentCreateWithoutTownsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutTownsInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutTownsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutTownsInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutTownsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutTownsInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutTownsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentUncheckedUpdateManyWithoutTownsNestedInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutTownsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentCreateWithoutTownsInputSchema).array(),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema),z.lazy(() => DocumentCreateOrConnectWithoutTownsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentUpsertWithWhereUniqueWithoutTownsInputSchema),z.lazy(() => DocumentUpsertWithWhereUniqueWithoutTownsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentWhereUniqueInputSchema),z.lazy(() => DocumentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateWithWhereUniqueWithoutTownsInputSchema),z.lazy(() => DocumentUpdateWithWhereUniqueWithoutTownsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentUpdateManyWithWhereWithoutTownsInputSchema),z.lazy(() => DocumentUpdateManyWithWhereWithoutTownsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DocumentCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.DocumentCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional()
}).strict();

export const DocumentUpdateOneRequiredWithoutEventsNestedInputSchema: z.ZodType<Prisma.DocumentUpdateOneRequiredWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DocumentCreateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DocumentCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => DocumentUpsertWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => DocumentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DocumentUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => DocumentUpdateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const DamageCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageCreateWithoutDocumentsInputSchema).array(),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InfrastructureCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema).array(),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TownCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.TownCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownCreateWithoutDocumentsInputSchema).array(),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventCreateWithoutDocumentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutUploadedDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUploadedDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUploadedDocumentsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedManyWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateNestedManyWithoutSharedDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUncheckedCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageCreateWithoutDocumentsInputSchema).array(),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUncheckedCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema).array(),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TownUncheckedCreateNestedManyWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUncheckedCreateNestedManyWithoutDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownCreateWithoutDocumentsInputSchema).array(),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutDocumentInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutDocumentInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventCreateWithoutDocumentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyDocumentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumLanguageFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLanguageFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LanguageSchema).optional()
}).strict();

export const DamageUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DamageUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageCreateWithoutDocumentsInputSchema).array(),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DamageUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => DamageUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DamageUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => DamageUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DamageUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => DamageUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DamageScalarWhereInputSchema),z.lazy(() => DamageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InfrastructureUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.InfrastructureUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema).array(),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InfrastructureUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InfrastructureUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InfrastructureUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InfrastructureScalarWhereInputSchema),z.lazy(() => InfrastructureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TownUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.TownUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownCreateWithoutDocumentsInputSchema).array(),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TownUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => TownUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TownUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => TownUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TownUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => TownUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TownScalarWhereInputSchema),z.lazy(() => TownScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventCreateWithoutDocumentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUploadedDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUploadedDocumentsInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutUploadedDocumentsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUpdateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUploadedDocumentsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithoutSharedDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutSharedDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.DamageUncheckedUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageCreateWithoutDocumentsInputSchema).array(),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => DamageCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DamageUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => DamageUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DamageWhereUniqueInputSchema),z.lazy(() => DamageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DamageUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => DamageUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DamageUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => DamageUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DamageScalarWhereInputSchema),z.lazy(() => DamageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema).array(),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => InfrastructureCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InfrastructureUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InfrastructureWhereUniqueInputSchema),z.lazy(() => InfrastructureWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InfrastructureUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InfrastructureUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InfrastructureScalarWhereInputSchema),z.lazy(() => InfrastructureScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.TownUncheckedUpdateManyWithoutDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownCreateWithoutDocumentsInputSchema).array(),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema),z.lazy(() => TownCreateOrConnectWithoutDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TownUpsertWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => TownUpsertWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TownWhereUniqueInputSchema),z.lazy(() => TownWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TownUpdateWithWhereUniqueWithoutDocumentsInputSchema),z.lazy(() => TownUpdateWithWhereUniqueWithoutDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TownUpdateManyWithWhereWithoutDocumentsInputSchema),z.lazy(() => TownUpdateManyWithWhereWithoutDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TownScalarWhereInputSchema),z.lazy(() => TownScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutDocumentNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutDocumentNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventCreateWithoutDocumentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema),z.lazy(() => EventCreateOrConnectWithoutDocumentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyDocumentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutDocumentInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutDocumentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutDocumentInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutDocumentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutSharedDocumentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutSharedDocumentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBytesFilterSchema: z.ZodType<Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict();

export const NestedBytesWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedEnumLanguageFilterSchema: z.ZodType<Prisma.NestedEnumLanguageFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.lazy(() => LanguageSchema).array().optional(),
  notIn: z.lazy(() => LanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLanguageWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLanguageWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LanguageSchema).optional(),
  in: z.lazy(() => LanguageSchema).array().optional(),
  notIn: z.lazy(() => LanguageSchema).array().optional(),
  not: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => NestedEnumLanguageWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLanguageFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLanguageFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  client: z.lazy(() => ClientCreateNestedOneWithoutReviewsInputSchema),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyUserInputSchema),z.lazy(() => ReviewCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutUserInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ReviewScalarWhereInputSchema: z.ZodType<Prisma.ReviewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReviewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReviewScalarWhereInputSchema),z.lazy(() => ReviewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clientId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewCreateWithoutClientInputSchema: z.ZodType<Prisma.ReviewCreateWithoutClientInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutClientInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutClientInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutReviewInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewCreateOrConnectWithoutClientInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutClientInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema) ]),
}).strict();

export const ReviewCreateManyClientInputEnvelopeSchema: z.ZodType<Prisma.ReviewCreateManyClientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ReviewCreateManyClientInputSchema),z.lazy(() => ReviewCreateManyClientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReviewUpsertWithWhereUniqueWithoutClientInputSchema: z.ZodType<Prisma.ReviewUpsertWithWhereUniqueWithoutClientInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReviewUpdateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutClientInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutClientInputSchema) ]),
}).strict();

export const ReviewUpdateWithWhereUniqueWithoutClientInputSchema: z.ZodType<Prisma.ReviewUpdateWithWhereUniqueWithoutClientInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutClientInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutClientInputSchema) ]),
}).strict();

export const ReviewUpdateManyWithWhereWithoutClientInputSchema: z.ZodType<Prisma.ReviewUpdateManyWithWhereWithoutClientInput> = z.object({
  where: z.lazy(() => ReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReviewUpdateManyMutationInputSchema),z.lazy(() => ReviewUncheckedUpdateManyWithoutClientInputSchema) ]),
}).strict();

export const UserCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const ClientCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ClientCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ClientUncheckedCreateWithoutReviewsInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutReviewsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  company: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ClientCreateOrConnectWithoutReviewsInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutReviewsInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutReviewsInputSchema) ]),
}).strict();

export const TransactionCreateWithoutReviewInputSchema: z.ZodType<Prisma.TransactionCreateWithoutReviewInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutTransactionsInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const TransactionCreateManyReviewInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyReviewInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyReviewInputSchema),z.lazy(() => TransactionCreateManyReviewInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BankStatementCreateWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementCreateWithoutReviewInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bankType: z.lazy(() => BankTypeCreateNestedOneWithoutBankStatementsInputSchema)
}).strict();

export const BankStatementUncheckedCreateWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUncheckedCreateWithoutReviewInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  bankTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementCreateOrConnectWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementCreateOrConnectWithoutReviewInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const BankStatementCreateManyReviewInputEnvelopeSchema: z.ZodType<Prisma.BankStatementCreateManyReviewInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BankStatementCreateManyReviewInputSchema),z.lazy(() => BankStatementCreateManyReviewInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ClientUpsertWithoutReviewsInputSchema: z.ZodType<Prisma.ClientUpsertWithoutReviewsInput> = z.object({
  update: z.union([ z.lazy(() => ClientUpdateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutReviewsInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedCreateWithoutReviewsInputSchema) ]),
  where: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientUpdateToOneWithWhereWithoutReviewsInputSchema: z.ZodType<Prisma.ClientUpdateToOneWithWhereWithoutReviewsInput> = z.object({
  where: z.lazy(() => ClientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ClientUpdateWithoutReviewsInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutReviewsInputSchema) ]),
}).strict();

export const ClientUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ClientUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientUncheckedUpdateWithoutReviewsInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutReviewsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid phone number format. Required format: 787-555-4444' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string().min(1, { message: "Address cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string().min(1, { message: "City cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  state: z.union([ z.string().min(2, { message: "State must be at least 2 characters." }).max(100, { message: "State must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  zip: z.union([ z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Invalid ZIP code format. Required format: 12345 or 12345-6789' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string().min(2, { message: "Country must be at least 2 characters." }).max(100, { message: "Country must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutReviewInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutReviewInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutReviewInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutReviewInputSchema) ]),
}).strict();

export const TransactionScalarWhereInputSchema: z.ZodType<Prisma.TransactionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereInputSchema),z.lazy(() => TransactionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const BankStatementUpsertWithWhereUniqueWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUpsertWithWhereUniqueWithoutReviewInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BankStatementUpdateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedUpdateWithoutReviewInputSchema) ]),
  create: z.union([ z.lazy(() => BankStatementCreateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutReviewInputSchema) ]),
}).strict();

export const BankStatementUpdateWithWhereUniqueWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUpdateWithWhereUniqueWithoutReviewInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BankStatementUpdateWithoutReviewInputSchema),z.lazy(() => BankStatementUncheckedUpdateWithoutReviewInputSchema) ]),
}).strict();

export const BankStatementUpdateManyWithWhereWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUpdateManyWithWhereWithoutReviewInput> = z.object({
  where: z.lazy(() => BankStatementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BankStatementUpdateManyMutationInputSchema),z.lazy(() => BankStatementUncheckedUpdateManyWithoutReviewInputSchema) ]),
}).strict();

export const BankStatementScalarWhereInputSchema: z.ZodType<Prisma.BankStatementScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BankStatementScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BankStatementScalarWhereInputSchema),z.lazy(() => BankStatementScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  file: z.union([ z.lazy(() => BytesFilterSchema),z.instanceof(Buffer) ]).optional(),
  reviewId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  bankTypeId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReviewCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewCreateWithoutTransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutReviewsInputSchema),
  bankStatements: z.lazy(() => BankStatementCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutTransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const CategoryCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutTransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutTransactionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CategoryCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const ReviewUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => ReviewUpdateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const ReviewUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => ReviewWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutTransactionsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const ReviewUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutTransactionsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementCreateWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementCreateWithoutBankTypeInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  review: z.lazy(() => ReviewCreateNestedOneWithoutBankStatementsInputSchema)
}).strict();

export const BankStatementUncheckedCreateWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUncheckedCreateWithoutBankTypeInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  reviewId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementCreateOrConnectWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementCreateOrConnectWithoutBankTypeInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema) ]),
}).strict();

export const BankStatementCreateManyBankTypeInputEnvelopeSchema: z.ZodType<Prisma.BankStatementCreateManyBankTypeInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BankStatementCreateManyBankTypeInputSchema),z.lazy(() => BankStatementCreateManyBankTypeInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BankStatementUpsertWithWhereUniqueWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUpsertWithWhereUniqueWithoutBankTypeInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BankStatementUpdateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedUpdateWithoutBankTypeInputSchema) ]),
  create: z.union([ z.lazy(() => BankStatementCreateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedCreateWithoutBankTypeInputSchema) ]),
}).strict();

export const BankStatementUpdateWithWhereUniqueWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUpdateWithWhereUniqueWithoutBankTypeInput> = z.object({
  where: z.lazy(() => BankStatementWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BankStatementUpdateWithoutBankTypeInputSchema),z.lazy(() => BankStatementUncheckedUpdateWithoutBankTypeInputSchema) ]),
}).strict();

export const BankStatementUpdateManyWithWhereWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUpdateManyWithWhereWithoutBankTypeInput> = z.object({
  where: z.lazy(() => BankStatementScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BankStatementUpdateManyMutationInputSchema),z.lazy(() => BankStatementUncheckedUpdateManyWithoutBankTypeInputSchema) ]),
}).strict();

export const ReviewCreateWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewCreateWithoutBankStatementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReviewsInputSchema),
  client: z.lazy(() => ClientCreateNestedOneWithoutReviewsInputSchema),
  transactions: z.lazy(() => TransactionCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewUncheckedCreateWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewUncheckedCreateWithoutBankStatementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  transactions: z.lazy(() => TransactionUncheckedCreateNestedManyWithoutReviewInputSchema).optional()
}).strict();

export const ReviewCreateOrConnectWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewCreateOrConnectWithoutBankStatementsInput> = z.object({
  where: z.lazy(() => ReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReviewCreateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutBankStatementsInputSchema) ]),
}).strict();

export const BankTypeCreateWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeCreateWithoutBankStatementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankTypeUncheckedCreateWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeUncheckedCreateWithoutBankStatementsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankTypeCreateOrConnectWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeCreateOrConnectWithoutBankStatementsInput> = z.object({
  where: z.lazy(() => BankTypeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BankTypeCreateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedCreateWithoutBankStatementsInputSchema) ]),
}).strict();

export const ReviewUpsertWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewUpsertWithoutBankStatementsInput> = z.object({
  update: z.union([ z.lazy(() => ReviewUpdateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutBankStatementsInputSchema) ]),
  create: z.union([ z.lazy(() => ReviewCreateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedCreateWithoutBankStatementsInputSchema) ]),
  where: z.lazy(() => ReviewWhereInputSchema).optional()
}).strict();

export const ReviewUpdateToOneWithWhereWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewUpdateToOneWithWhereWithoutBankStatementsInput> = z.object({
  where: z.lazy(() => ReviewWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ReviewUpdateWithoutBankStatementsInputSchema),z.lazy(() => ReviewUncheckedUpdateWithoutBankStatementsInputSchema) ]),
}).strict();

export const ReviewUpdateWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutBankStatementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutBankStatementsInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutBankStatementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const BankTypeUpsertWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeUpsertWithoutBankStatementsInput> = z.object({
  update: z.union([ z.lazy(() => BankTypeUpdateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedUpdateWithoutBankStatementsInputSchema) ]),
  create: z.union([ z.lazy(() => BankTypeCreateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedCreateWithoutBankStatementsInputSchema) ]),
  where: z.lazy(() => BankTypeWhereInputSchema).optional()
}).strict();

export const BankTypeUpdateToOneWithWhereWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeUpdateToOneWithWhereWithoutBankStatementsInput> = z.object({
  where: z.lazy(() => BankTypeWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BankTypeUpdateWithoutBankStatementsInputSchema),z.lazy(() => BankTypeUncheckedUpdateWithoutBankStatementsInputSchema) ]),
}).strict();

export const BankTypeUpdateWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeUpdateWithoutBankStatementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankTypeUncheckedUpdateWithoutBankStatementsInputSchema: z.ZodType<Prisma.BankTypeUncheckedUpdateWithoutBankStatementsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  review: z.lazy(() => ReviewCreateNestedOneWithoutTransactionsInputSchema)
}).strict();

export const TransactionUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  reviewId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.TransactionCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionCreateManyCategoryInputSchema),z.lazy(() => TransactionCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionUpdateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutCategoryInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const TransactionUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => TransactionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionUpdateManyMutationInputSchema),z.lazy(() => TransactionUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const DocumentCreateWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentCreateWithoutUploaderInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutUploaderInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutUploaderInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema) ]),
}).strict();

export const DocumentCreateManyUploaderInputEnvelopeSchema: z.ZodType<Prisma.DocumentCreateManyUploaderInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => DocumentCreateManyUploaderInputSchema),z.lazy(() => DocumentCreateManyUploaderInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DocumentCreateWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutEditorsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema)
}).strict();

export const DocumentUncheckedCreateWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutEditorsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutEditorsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema) ]),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutUploaderInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutUploaderInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutUploaderInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutUploaderInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutUploaderInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutUploaderInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutUploaderInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutUploaderInputSchema) ]),
}).strict();

export const DocumentScalarWhereInputSchema: z.ZodType<Prisma.DocumentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentScalarWhereInputSchema),z.lazy(() => DocumentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  published: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  locked: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  incidentDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  language: z.union([ z.lazy(() => EnumLanguageFilterSchema),z.lazy(() => LanguageSchema) ]).optional(),
  uploaderId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutEditorsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutEditorsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEditorsInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutEditorsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutEditorsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutEditorsInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutEditorsInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutEditorsInputSchema) ]),
}).strict();

export const DocumentCreateWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentCreateWithoutInfrastructuresInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutInfrastructuresInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutInfrastructuresInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema) ]),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutInfrastructuresInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutInfrastructuresInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutInfrastructuresInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutInfrastructuresInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutInfrastructuresInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutInfrastructuresInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutInfrastructuresInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutInfrastructuresInputSchema) ]),
}).strict();

export const DocumentCreateWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentCreateWithoutDamagesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutDamagesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutDamagesInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema) ]),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutDamagesInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutDamagesInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutDamagesInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutDamagesInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutDamagesInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutDamagesInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutDamagesInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutDamagesInputSchema) ]),
}).strict();

export const DocumentCreateWithoutTownsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutTownsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventCreateNestedManyWithoutDocumentInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutTownsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutDocumentInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutTownsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutTownsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema) ]),
}).strict();

export const DocumentUpsertWithWhereUniqueWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUpsertWithWhereUniqueWithoutTownsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentUpdateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutTownsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutTownsInputSchema) ]),
}).strict();

export const DocumentUpdateWithWhereUniqueWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUpdateWithWhereUniqueWithoutTownsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutTownsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutTownsInputSchema) ]),
}).strict();

export const DocumentUpdateManyWithWhereWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUpdateManyWithWhereWithoutTownsInput> = z.object({
  where: z.lazy(() => DocumentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentUpdateManyMutationInputSchema),z.lazy(() => DocumentUncheckedUpdateManyWithoutTownsInputSchema) ]),
}).strict();

export const DocumentCreateWithoutEventsInputSchema: z.ZodType<Prisma.DocumentCreateWithoutEventsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownCreateNestedManyWithoutDocumentsInputSchema).optional(),
  uploader: z.lazy(() => PermissionCreateNestedOneWithoutUploadedDocumentsInputSchema),
  editors: z.lazy(() => PermissionCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.DocumentUncheckedCreateWithoutEventsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  uploaderId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  damages: z.lazy(() => DamageUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedCreateNestedManyWithoutDocumentsInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutSharedDocumentsInputSchema).optional()
}).strict();

export const DocumentCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.DocumentCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => DocumentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentCreateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const DocumentUpsertWithoutEventsInputSchema: z.ZodType<Prisma.DocumentUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => DocumentUpdateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentCreateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => DocumentWhereInputSchema).optional()
}).strict();

export const DocumentUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.DocumentUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => DocumentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DocumentUpdateWithoutEventsInputSchema),z.lazy(() => DocumentUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const DocumentUpdateWithoutEventsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DamageCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DamageUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DamageCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DamageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const InfrastructureCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InfrastructureUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const InfrastructureCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => InfrastructureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const TownCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.TownCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TownUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUncheckedCreateWithoutDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TownCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.TownCreateOrConnectWithoutDocumentsInput> = z.object({
  where: z.lazy(() => TownWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const EventCreateWithoutDocumentInputSchema: z.ZodType<Prisma.EventCreateWithoutDocumentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventUncheckedCreateWithoutDocumentInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutDocumentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventCreateOrConnectWithoutDocumentInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutDocumentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const EventCreateManyDocumentInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyDocumentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyDocumentInputSchema),z.lazy(() => EventCreateManyDocumentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PermissionCreateWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutUploadedDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sharedDocuments: z.lazy(() => DocumentCreateNestedManyWithoutEditorsInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutUploadedDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sharedDocuments: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutEditorsInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutUploadedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUploadedDocumentsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutSharedDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  uploadedDocuments: z.lazy(() => DocumentCreateNestedManyWithoutUploaderInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutSharedDocumentsInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  lastName: z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),
  email: z.string().email({ message: 'Invalid email address' }),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  uploadedDocuments: z.lazy(() => DocumentUncheckedCreateNestedManyWithoutUploaderInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const DamageUpsertWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUpsertWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DamageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DamageUpdateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => DamageCreateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const DamageUpdateWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUpdateWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DamageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DamageUpdateWithoutDocumentsInputSchema),z.lazy(() => DamageUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const DamageUpdateManyWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUpdateManyWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => DamageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DamageUpdateManyMutationInputSchema),z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsInputSchema) ]),
}).strict();

export const DamageScalarWhereInputSchema: z.ZodType<Prisma.DamageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DamageScalarWhereInputSchema),z.lazy(() => DamageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DamageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DamageScalarWhereInputSchema),z.lazy(() => DamageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InfrastructureUpsertWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUpsertWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => InfrastructureWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InfrastructureUpdateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => InfrastructureCreateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const InfrastructureUpdateWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUpdateWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => InfrastructureWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InfrastructureUpdateWithoutDocumentsInputSchema),z.lazy(() => InfrastructureUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const InfrastructureUpdateManyWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUpdateManyWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => InfrastructureScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InfrastructureUpdateManyMutationInputSchema),z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsInputSchema) ]),
}).strict();

export const InfrastructureScalarWhereInputSchema: z.ZodType<Prisma.InfrastructureScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InfrastructureScalarWhereInputSchema),z.lazy(() => InfrastructureScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InfrastructureScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InfrastructureScalarWhereInputSchema),z.lazy(() => InfrastructureScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TownUpsertWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUpsertWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => TownWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TownUpdateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => TownCreateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedCreateWithoutDocumentsInputSchema) ]),
}).strict();

export const TownUpdateWithWhereUniqueWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUpdateWithWhereUniqueWithoutDocumentsInput> = z.object({
  where: z.lazy(() => TownWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TownUpdateWithoutDocumentsInputSchema),z.lazy(() => TownUncheckedUpdateWithoutDocumentsInputSchema) ]),
}).strict();

export const TownUpdateManyWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUpdateManyWithWhereWithoutDocumentsInput> = z.object({
  where: z.lazy(() => TownScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TownUpdateManyMutationInputSchema),z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsInputSchema) ]),
}).strict();

export const TownScalarWhereInputSchema: z.ZodType<Prisma.TownScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TownScalarWhereInputSchema),z.lazy(() => TownScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TownScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TownScalarWhereInputSchema),z.lazy(() => TownScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedUpdateWithoutDocumentInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedCreateWithoutDocumentInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutDocumentInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutDocumentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutDocumentInputSchema),z.lazy(() => EventUncheckedUpdateWithoutDocumentInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutDocumentInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutDocumentInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutDocumentInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionUpsertWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutUploadedDocumentsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUploadedDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUploadedDocumentsInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutUploadedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutUploadedDocumentsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUploadedDocumentsInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutUploadedDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedDocuments: z.lazy(() => DocumentUpdateManyWithoutEditorsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutUploadedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutUploadedDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sharedDocuments: z.lazy(() => DocumentUncheckedUpdateManyWithoutEditorsNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpsertWithWhereUniqueWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionUpdateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutSharedDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpdateWithWhereUniqueWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutSharedDocumentsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const PermissionUpdateManyWithWhereWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithWhereWithoutSharedDocumentsInput> = z.object({
  where: z.lazy(() => PermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateManyMutationInputSchema),z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsInputSchema) ]),
}).strict();

export const PermissionScalarWhereInputSchema: z.ZodType<Prisma.PermissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reviews: z.lazy(() => ReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const ReviewCreateManyUserInputSchema: z.ZodType<Prisma.ReviewCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  clientId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  client: z.lazy(() => ClientUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  clientId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReviewCreateManyClientInputSchema: z.ZodType<Prisma.ReviewCreateManyClientInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ReviewUpdateWithoutClientInputSchema: z.ZodType<Prisma.ReviewUpdateWithoutClientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReviewsNestedInputSchema).optional(),
  transactions: z.lazy(() => TransactionUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateWithoutClientInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateWithoutClientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionUncheckedUpdateManyWithoutReviewNestedInputSchema).optional(),
  bankStatements: z.lazy(() => BankStatementUncheckedUpdateManyWithoutReviewNestedInputSchema).optional()
}).strict();

export const ReviewUncheckedUpdateManyWithoutClientInputSchema: z.ZodType<Prisma.ReviewUncheckedUpdateManyWithoutClientInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyReviewInputSchema: z.ZodType<Prisma.TransactionCreateManyReviewInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementCreateManyReviewInputSchema: z.ZodType<Prisma.BankStatementCreateManyReviewInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  bankTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutReviewInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementUpdateWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  bankType: z.lazy(() => BankTypeUpdateOneRequiredWithoutBankStatementsNestedInputSchema).optional()
}).strict();

export const BankStatementUncheckedUpdateWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  bankTypeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementUncheckedUpdateManyWithoutReviewInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateManyWithoutReviewInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  bankTypeId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementCreateManyBankTypeInputSchema: z.ZodType<Prisma.BankStatementCreateManyBankTypeInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  file: z.instanceof(Buffer),
  reviewId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const BankStatementUpdateWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUpdateWithoutBankTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  review: z.lazy(() => ReviewUpdateOneRequiredWithoutBankStatementsNestedInputSchema).optional()
}).strict();

export const BankStatementUncheckedUpdateWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateWithoutBankTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const BankStatementUncheckedUpdateManyWithoutBankTypeInputSchema: z.ZodType<Prisma.BankStatementUncheckedUpdateManyWithoutBankTypeInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string().min(1, { message: "Name cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.instanceof(Buffer),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateManyCategoryInputSchema: z.ZodType<Prisma.TransactionCreateManyCategoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  amount: z.number(),
  reviewId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TransactionUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  review: z.lazy(() => ReviewUpdateOneRequiredWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string().min(1, { message: "Description cannot be empty." }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  reviewId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentCreateManyUploaderInputSchema: z.ZodType<Prisma.DocumentCreateManyUploaderInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  published: z.boolean().optional(),
  locked: z.boolean().optional(),
  incidentDate: z.coerce.date().optional().nullable(),
  content: z.string().optional().nullable(),
  language: z.lazy(() => LanguageSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DocumentUpdateWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutUploaderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutUploaderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutUploaderInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutUploaderInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutEditorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutEditorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutEditorsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutEditorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutInfrastructuresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutInfrastructuresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutInfrastructuresInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutInfrastructuresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutDamagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutDamagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  towns: z.lazy(() => TownUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutDamagesInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutDamagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DocumentUpdateWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUpdateWithoutTownsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUpdateManyWithoutDocumentNestedInputSchema).optional(),
  uploader: z.lazy(() => PermissionUpdateOneRequiredWithoutUploadedDocumentsNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateWithoutTownsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  damages: z.lazy(() => DamageUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  infrastructures: z.lazy(() => InfrastructureUncheckedUpdateManyWithoutDocumentsNestedInputSchema).optional(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutDocumentNestedInputSchema).optional(),
  editors: z.lazy(() => PermissionUncheckedUpdateManyWithoutSharedDocumentsNestedInputSchema).optional()
}).strict();

export const DocumentUncheckedUpdateManyWithoutTownsInputSchema: z.ZodType<Prisma.DocumentUncheckedUpdateManyWithoutTownsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  published: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  locked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  incidentDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  language: z.union([ z.lazy(() => LanguageSchema),z.lazy(() => EnumLanguageFieldUpdateOperationsInputSchema) ]).optional(),
  uploaderId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateManyDocumentInputSchema: z.ZodType<Prisma.EventCreateManyDocumentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DamageUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DamageUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUncheckedUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DamageUncheckedUpdateManyWithoutDocumentsInputSchema: z.ZodType<Prisma.DamageUncheckedUpdateManyWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfrastructureUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfrastructureUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUncheckedUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InfrastructureUncheckedUpdateManyWithoutDocumentsInputSchema: z.ZodType<Prisma.InfrastructureUncheckedUpdateManyWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TownUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TownUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUncheckedUpdateWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TownUncheckedUpdateManyWithoutDocumentsInputSchema: z.ZodType<Prisma.TownUncheckedUpdateManyWithoutDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.EventUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateWithoutDocumentInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutDocumentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutDocumentInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutDocumentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutSharedDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentUpdateManyWithoutUploaderNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutSharedDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedDocuments: z.lazy(() => DocumentUncheckedUpdateManyWithoutUploaderNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateManyWithoutSharedDocumentsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutSharedDocumentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string().min(3, { message: "Must be at least 3 characters." }).max(100, { message: "Must be at most 100 characters" }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TodoFindFirstArgsSchema: z.ZodType<Prisma.TodoFindFirstArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TodoFindFirstOrThrowArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoFindManyArgsSchema: z.ZodType<Prisma.TodoFindManyArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TodoScalarFieldEnumSchema,TodoScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TodoAggregateArgsSchema: z.ZodType<Prisma.TodoAggregateArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithRelationInputSchema.array(),TodoOrderByWithRelationInputSchema ]).optional(),
  cursor: TodoWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TodoGroupByArgsSchema: z.ZodType<Prisma.TodoGroupByArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
  orderBy: z.union([ TodoOrderByWithAggregationInputSchema.array(),TodoOrderByWithAggregationInputSchema ]).optional(),
  by: TodoScalarFieldEnumSchema.array(),
  having: TodoScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TodoFindUniqueArgsSchema: z.ZodType<Prisma.TodoFindUniqueArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TodoFindUniqueOrThrowArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ClientFindFirstArgsSchema: z.ZodType<Prisma.ClientFindFirstArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindManyArgsSchema: z.ZodType<Prisma.ClientFindManyArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientAggregateArgsSchema: z.ZodType<Prisma.ClientAggregateArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientGroupByArgsSchema: z.ZodType<Prisma.ClientGroupByArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithAggregationInputSchema.array(),ClientOrderByWithAggregationInputSchema ]).optional(),
  by: ClientScalarFieldEnumSchema.array(),
  having: ClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientFindUniqueArgsSchema: z.ZodType<Prisma.ClientFindUniqueArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClientFindUniqueOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindFirstArgsSchema: z.ZodType<Prisma.ReviewFindFirstArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindFirstOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewFindManyArgsSchema: z.ZodType<Prisma.ReviewFindManyArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ReviewScalarFieldEnumSchema,ReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ReviewAggregateArgsSchema: z.ZodType<Prisma.ReviewAggregateArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithRelationInputSchema.array(),ReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: ReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewGroupByArgsSchema: z.ZodType<Prisma.ReviewGroupByArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
  orderBy: z.union([ ReviewOrderByWithAggregationInputSchema.array(),ReviewOrderByWithAggregationInputSchema ]).optional(),
  by: ReviewScalarFieldEnumSchema.array(),
  having: ReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ReviewFindUniqueArgsSchema: z.ZodType<Prisma.ReviewFindUniqueArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReviewFindUniqueOrThrowArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const TransactionFindFirstArgsSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TransactionAggregateArgsSchema: z.ZodType<Prisma.TransactionAggregateArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionGroupByArgsSchema: z.ZodType<Prisma.TransactionGroupByArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithAggregationInputSchema.array(),TransactionOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionScalarFieldEnumSchema.array(),
  having: TransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindUniqueOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const BankTypeFindFirstArgsSchema: z.ZodType<Prisma.BankTypeFindFirstArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereInputSchema.optional(),
  orderBy: z.union([ BankTypeOrderByWithRelationInputSchema.array(),BankTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: BankTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankTypeScalarFieldEnumSchema,BankTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankTypeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BankTypeFindFirstOrThrowArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereInputSchema.optional(),
  orderBy: z.union([ BankTypeOrderByWithRelationInputSchema.array(),BankTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: BankTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankTypeScalarFieldEnumSchema,BankTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankTypeFindManyArgsSchema: z.ZodType<Prisma.BankTypeFindManyArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereInputSchema.optional(),
  orderBy: z.union([ BankTypeOrderByWithRelationInputSchema.array(),BankTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: BankTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankTypeScalarFieldEnumSchema,BankTypeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankTypeAggregateArgsSchema: z.ZodType<Prisma.BankTypeAggregateArgs> = z.object({
  where: BankTypeWhereInputSchema.optional(),
  orderBy: z.union([ BankTypeOrderByWithRelationInputSchema.array(),BankTypeOrderByWithRelationInputSchema ]).optional(),
  cursor: BankTypeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BankTypeGroupByArgsSchema: z.ZodType<Prisma.BankTypeGroupByArgs> = z.object({
  where: BankTypeWhereInputSchema.optional(),
  orderBy: z.union([ BankTypeOrderByWithAggregationInputSchema.array(),BankTypeOrderByWithAggregationInputSchema ]).optional(),
  by: BankTypeScalarFieldEnumSchema.array(),
  having: BankTypeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BankTypeFindUniqueArgsSchema: z.ZodType<Prisma.BankTypeFindUniqueArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereUniqueInputSchema,
}).strict() ;

export const BankTypeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BankTypeFindUniqueOrThrowArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereUniqueInputSchema,
}).strict() ;

export const BankStatementFindFirstArgsSchema: z.ZodType<Prisma.BankStatementFindFirstArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereInputSchema.optional(),
  orderBy: z.union([ BankStatementOrderByWithRelationInputSchema.array(),BankStatementOrderByWithRelationInputSchema ]).optional(),
  cursor: BankStatementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankStatementScalarFieldEnumSchema,BankStatementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankStatementFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BankStatementFindFirstOrThrowArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereInputSchema.optional(),
  orderBy: z.union([ BankStatementOrderByWithRelationInputSchema.array(),BankStatementOrderByWithRelationInputSchema ]).optional(),
  cursor: BankStatementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankStatementScalarFieldEnumSchema,BankStatementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankStatementFindManyArgsSchema: z.ZodType<Prisma.BankStatementFindManyArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereInputSchema.optional(),
  orderBy: z.union([ BankStatementOrderByWithRelationInputSchema.array(),BankStatementOrderByWithRelationInputSchema ]).optional(),
  cursor: BankStatementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BankStatementScalarFieldEnumSchema,BankStatementScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BankStatementAggregateArgsSchema: z.ZodType<Prisma.BankStatementAggregateArgs> = z.object({
  where: BankStatementWhereInputSchema.optional(),
  orderBy: z.union([ BankStatementOrderByWithRelationInputSchema.array(),BankStatementOrderByWithRelationInputSchema ]).optional(),
  cursor: BankStatementWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BankStatementGroupByArgsSchema: z.ZodType<Prisma.BankStatementGroupByArgs> = z.object({
  where: BankStatementWhereInputSchema.optional(),
  orderBy: z.union([ BankStatementOrderByWithAggregationInputSchema.array(),BankStatementOrderByWithAggregationInputSchema ]).optional(),
  by: BankStatementScalarFieldEnumSchema.array(),
  having: BankStatementScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BankStatementFindUniqueArgsSchema: z.ZodType<Prisma.BankStatementFindUniqueArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereUniqueInputSchema,
}).strict() ;

export const BankStatementFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BankStatementFindUniqueOrThrowArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const InfrastructureFindFirstArgsSchema: z.ZodType<Prisma.InfrastructureFindFirstArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereInputSchema.optional(),
  orderBy: z.union([ InfrastructureOrderByWithRelationInputSchema.array(),InfrastructureOrderByWithRelationInputSchema ]).optional(),
  cursor: InfrastructureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfrastructureScalarFieldEnumSchema,InfrastructureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfrastructureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InfrastructureFindFirstOrThrowArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereInputSchema.optional(),
  orderBy: z.union([ InfrastructureOrderByWithRelationInputSchema.array(),InfrastructureOrderByWithRelationInputSchema ]).optional(),
  cursor: InfrastructureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfrastructureScalarFieldEnumSchema,InfrastructureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfrastructureFindManyArgsSchema: z.ZodType<Prisma.InfrastructureFindManyArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereInputSchema.optional(),
  orderBy: z.union([ InfrastructureOrderByWithRelationInputSchema.array(),InfrastructureOrderByWithRelationInputSchema ]).optional(),
  cursor: InfrastructureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfrastructureScalarFieldEnumSchema,InfrastructureScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InfrastructureAggregateArgsSchema: z.ZodType<Prisma.InfrastructureAggregateArgs> = z.object({
  where: InfrastructureWhereInputSchema.optional(),
  orderBy: z.union([ InfrastructureOrderByWithRelationInputSchema.array(),InfrastructureOrderByWithRelationInputSchema ]).optional(),
  cursor: InfrastructureWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InfrastructureGroupByArgsSchema: z.ZodType<Prisma.InfrastructureGroupByArgs> = z.object({
  where: InfrastructureWhereInputSchema.optional(),
  orderBy: z.union([ InfrastructureOrderByWithAggregationInputSchema.array(),InfrastructureOrderByWithAggregationInputSchema ]).optional(),
  by: InfrastructureScalarFieldEnumSchema.array(),
  having: InfrastructureScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InfrastructureFindUniqueArgsSchema: z.ZodType<Prisma.InfrastructureFindUniqueArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereUniqueInputSchema,
}).strict() ;

export const InfrastructureFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InfrastructureFindUniqueOrThrowArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereUniqueInputSchema,
}).strict() ;

export const DamageFindFirstArgsSchema: z.ZodType<Prisma.DamageFindFirstArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereInputSchema.optional(),
  orderBy: z.union([ DamageOrderByWithRelationInputSchema.array(),DamageOrderByWithRelationInputSchema ]).optional(),
  cursor: DamageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DamageScalarFieldEnumSchema,DamageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DamageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DamageFindFirstOrThrowArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereInputSchema.optional(),
  orderBy: z.union([ DamageOrderByWithRelationInputSchema.array(),DamageOrderByWithRelationInputSchema ]).optional(),
  cursor: DamageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DamageScalarFieldEnumSchema,DamageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DamageFindManyArgsSchema: z.ZodType<Prisma.DamageFindManyArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereInputSchema.optional(),
  orderBy: z.union([ DamageOrderByWithRelationInputSchema.array(),DamageOrderByWithRelationInputSchema ]).optional(),
  cursor: DamageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DamageScalarFieldEnumSchema,DamageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DamageAggregateArgsSchema: z.ZodType<Prisma.DamageAggregateArgs> = z.object({
  where: DamageWhereInputSchema.optional(),
  orderBy: z.union([ DamageOrderByWithRelationInputSchema.array(),DamageOrderByWithRelationInputSchema ]).optional(),
  cursor: DamageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DamageGroupByArgsSchema: z.ZodType<Prisma.DamageGroupByArgs> = z.object({
  where: DamageWhereInputSchema.optional(),
  orderBy: z.union([ DamageOrderByWithAggregationInputSchema.array(),DamageOrderByWithAggregationInputSchema ]).optional(),
  by: DamageScalarFieldEnumSchema.array(),
  having: DamageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DamageFindUniqueArgsSchema: z.ZodType<Prisma.DamageFindUniqueArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereUniqueInputSchema,
}).strict() ;

export const DamageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DamageFindUniqueOrThrowArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereUniqueInputSchema,
}).strict() ;

export const TownFindFirstArgsSchema: z.ZodType<Prisma.TownFindFirstArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereInputSchema.optional(),
  orderBy: z.union([ TownOrderByWithRelationInputSchema.array(),TownOrderByWithRelationInputSchema ]).optional(),
  cursor: TownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TownScalarFieldEnumSchema,TownScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TownFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TownFindFirstOrThrowArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereInputSchema.optional(),
  orderBy: z.union([ TownOrderByWithRelationInputSchema.array(),TownOrderByWithRelationInputSchema ]).optional(),
  cursor: TownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TownScalarFieldEnumSchema,TownScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TownFindManyArgsSchema: z.ZodType<Prisma.TownFindManyArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereInputSchema.optional(),
  orderBy: z.union([ TownOrderByWithRelationInputSchema.array(),TownOrderByWithRelationInputSchema ]).optional(),
  cursor: TownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TownScalarFieldEnumSchema,TownScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TownAggregateArgsSchema: z.ZodType<Prisma.TownAggregateArgs> = z.object({
  where: TownWhereInputSchema.optional(),
  orderBy: z.union([ TownOrderByWithRelationInputSchema.array(),TownOrderByWithRelationInputSchema ]).optional(),
  cursor: TownWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TownGroupByArgsSchema: z.ZodType<Prisma.TownGroupByArgs> = z.object({
  where: TownWhereInputSchema.optional(),
  orderBy: z.union([ TownOrderByWithAggregationInputSchema.array(),TownOrderByWithAggregationInputSchema ]).optional(),
  by: TownScalarFieldEnumSchema.array(),
  having: TownScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TownFindUniqueArgsSchema: z.ZodType<Prisma.TownFindUniqueArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereUniqueInputSchema,
}).strict() ;

export const TownFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TownFindUniqueOrThrowArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const DocumentFindFirstArgsSchema: z.ZodType<Prisma.DocumentFindFirstArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindFirstOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentFindManyArgsSchema: z.ZodType<Prisma.DocumentFindManyArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DocumentAggregateArgsSchema: z.ZodType<Prisma.DocumentAggregateArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithRelationInputSchema.array(),DocumentOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentGroupByArgsSchema: z.ZodType<Prisma.DocumentGroupByArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
  orderBy: z.union([ DocumentOrderByWithAggregationInputSchema.array(),DocumentOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentScalarFieldEnumSchema.array(),
  having: DocumentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DocumentFindUniqueArgsSchema: z.ZodType<Prisma.DocumentFindUniqueArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentFindUniqueOrThrowArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const TodoCreateArgsSchema: z.ZodType<Prisma.TodoCreateArgs> = z.object({
  select: TodoSelectSchema.optional(),
  data: z.union([ TodoCreateInputSchema,TodoUncheckedCreateInputSchema ]),
}).strict() ;

export const TodoUpsertArgsSchema: z.ZodType<Prisma.TodoUpsertArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
  create: z.union([ TodoCreateInputSchema,TodoUncheckedCreateInputSchema ]),
  update: z.union([ TodoUpdateInputSchema,TodoUncheckedUpdateInputSchema ]),
}).strict() ;

export const TodoCreateManyArgsSchema: z.ZodType<Prisma.TodoCreateManyArgs> = z.object({
  data: z.union([ TodoCreateManyInputSchema,TodoCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TodoDeleteArgsSchema: z.ZodType<Prisma.TodoDeleteArgs> = z.object({
  select: TodoSelectSchema.optional(),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoUpdateArgsSchema: z.ZodType<Prisma.TodoUpdateArgs> = z.object({
  select: TodoSelectSchema.optional(),
  data: z.union([ TodoUpdateInputSchema,TodoUncheckedUpdateInputSchema ]),
  where: TodoWhereUniqueInputSchema,
}).strict() ;

export const TodoUpdateManyArgsSchema: z.ZodType<Prisma.TodoUpdateManyArgs> = z.object({
  data: z.union([ TodoUpdateManyMutationInputSchema,TodoUncheckedUpdateManyInputSchema ]),
  where: TodoWhereInputSchema.optional(),
}).strict() ;

export const TodoDeleteManyArgsSchema: z.ZodType<Prisma.TodoDeleteManyArgs> = z.object({
  where: TodoWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const ClientCreateArgsSchema: z.ZodType<Prisma.ClientCreateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
}).strict() ;

export const ClientUpsertArgsSchema: z.ZodType<Prisma.ClientUpsertArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
  create: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
  update: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
}).strict() ;

export const ClientCreateManyArgsSchema: z.ZodType<Prisma.ClientCreateManyArgs> = z.object({
  data: z.union([ ClientCreateManyInputSchema,ClientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ClientDeleteArgsSchema: z.ZodType<Prisma.ClientDeleteArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateArgsSchema: z.ZodType<Prisma.ClientUpdateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateManyArgsSchema: z.ZodType<Prisma.ClientUpdateManyArgs> = z.object({
  data: z.union([ ClientUpdateManyMutationInputSchema,ClientUncheckedUpdateManyInputSchema ]),
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const ClientDeleteManyArgsSchema: z.ZodType<Prisma.ClientDeleteManyArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const ReviewCreateArgsSchema: z.ZodType<Prisma.ReviewCreateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const ReviewUpsertArgsSchema: z.ZodType<Prisma.ReviewUpsertArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
  create: z.union([ ReviewCreateInputSchema,ReviewUncheckedCreateInputSchema ]),
  update: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const ReviewCreateManyArgsSchema: z.ZodType<Prisma.ReviewCreateManyArgs> = z.object({
  data: z.union([ ReviewCreateManyInputSchema,ReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ReviewDeleteArgsSchema: z.ZodType<Prisma.ReviewDeleteArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateArgsSchema: z.ZodType<Prisma.ReviewUpdateArgs> = z.object({
  select: ReviewSelectSchema.optional(),
  include: ReviewIncludeSchema.optional(),
  data: z.union([ ReviewUpdateInputSchema,ReviewUncheckedUpdateInputSchema ]),
  where: ReviewWhereUniqueInputSchema,
}).strict() ;

export const ReviewUpdateManyArgsSchema: z.ZodType<Prisma.ReviewUpdateManyArgs> = z.object({
  data: z.union([ ReviewUpdateManyMutationInputSchema,ReviewUncheckedUpdateManyInputSchema ]),
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const ReviewDeleteManyArgsSchema: z.ZodType<Prisma.ReviewDeleteManyArgs> = z.object({
  where: ReviewWhereInputSchema.optional(),
}).strict() ;

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict() ;

export const TransactionUpsertArgsSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
  create: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
  update: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
}).strict() ;

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TransactionDeleteArgsSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionUpdateArgsSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
  where: TransactionWhereUniqueInputSchema,
}).strict() ;

export const TransactionUpdateManyArgsSchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({
  data: z.union([ TransactionUpdateManyMutationInputSchema,TransactionUncheckedUpdateManyInputSchema ]),
  where: TransactionWhereInputSchema.optional(),
}).strict() ;

export const TransactionDeleteManyArgsSchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
}).strict() ;

export const BankTypeCreateArgsSchema: z.ZodType<Prisma.BankTypeCreateArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  data: z.union([ BankTypeCreateInputSchema,BankTypeUncheckedCreateInputSchema ]),
}).strict() ;

export const BankTypeUpsertArgsSchema: z.ZodType<Prisma.BankTypeUpsertArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereUniqueInputSchema,
  create: z.union([ BankTypeCreateInputSchema,BankTypeUncheckedCreateInputSchema ]),
  update: z.union([ BankTypeUpdateInputSchema,BankTypeUncheckedUpdateInputSchema ]),
}).strict() ;

export const BankTypeCreateManyArgsSchema: z.ZodType<Prisma.BankTypeCreateManyArgs> = z.object({
  data: z.union([ BankTypeCreateManyInputSchema,BankTypeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BankTypeDeleteArgsSchema: z.ZodType<Prisma.BankTypeDeleteArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  where: BankTypeWhereUniqueInputSchema,
}).strict() ;

export const BankTypeUpdateArgsSchema: z.ZodType<Prisma.BankTypeUpdateArgs> = z.object({
  select: BankTypeSelectSchema.optional(),
  include: BankTypeIncludeSchema.optional(),
  data: z.union([ BankTypeUpdateInputSchema,BankTypeUncheckedUpdateInputSchema ]),
  where: BankTypeWhereUniqueInputSchema,
}).strict() ;

export const BankTypeUpdateManyArgsSchema: z.ZodType<Prisma.BankTypeUpdateManyArgs> = z.object({
  data: z.union([ BankTypeUpdateManyMutationInputSchema,BankTypeUncheckedUpdateManyInputSchema ]),
  where: BankTypeWhereInputSchema.optional(),
}).strict() ;

export const BankTypeDeleteManyArgsSchema: z.ZodType<Prisma.BankTypeDeleteManyArgs> = z.object({
  where: BankTypeWhereInputSchema.optional(),
}).strict() ;

export const BankStatementCreateArgsSchema: z.ZodType<Prisma.BankStatementCreateArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  data: z.union([ BankStatementCreateInputSchema,BankStatementUncheckedCreateInputSchema ]),
}).strict() ;

export const BankStatementUpsertArgsSchema: z.ZodType<Prisma.BankStatementUpsertArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereUniqueInputSchema,
  create: z.union([ BankStatementCreateInputSchema,BankStatementUncheckedCreateInputSchema ]),
  update: z.union([ BankStatementUpdateInputSchema,BankStatementUncheckedUpdateInputSchema ]),
}).strict() ;

export const BankStatementCreateManyArgsSchema: z.ZodType<Prisma.BankStatementCreateManyArgs> = z.object({
  data: z.union([ BankStatementCreateManyInputSchema,BankStatementCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BankStatementDeleteArgsSchema: z.ZodType<Prisma.BankStatementDeleteArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  where: BankStatementWhereUniqueInputSchema,
}).strict() ;

export const BankStatementUpdateArgsSchema: z.ZodType<Prisma.BankStatementUpdateArgs> = z.object({
  select: BankStatementSelectSchema.optional(),
  include: BankStatementIncludeSchema.optional(),
  data: z.union([ BankStatementUpdateInputSchema,BankStatementUncheckedUpdateInputSchema ]),
  where: BankStatementWhereUniqueInputSchema,
}).strict() ;

export const BankStatementUpdateManyArgsSchema: z.ZodType<Prisma.BankStatementUpdateManyArgs> = z.object({
  data: z.union([ BankStatementUpdateManyMutationInputSchema,BankStatementUncheckedUpdateManyInputSchema ]),
  where: BankStatementWhereInputSchema.optional(),
}).strict() ;

export const BankStatementDeleteManyArgsSchema: z.ZodType<Prisma.BankStatementDeleteManyArgs> = z.object({
  where: BankStatementWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
}).strict() ;

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
}).strict() ;

export const InfrastructureCreateArgsSchema: z.ZodType<Prisma.InfrastructureCreateArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  data: z.union([ InfrastructureCreateInputSchema,InfrastructureUncheckedCreateInputSchema ]),
}).strict() ;

export const InfrastructureUpsertArgsSchema: z.ZodType<Prisma.InfrastructureUpsertArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereUniqueInputSchema,
  create: z.union([ InfrastructureCreateInputSchema,InfrastructureUncheckedCreateInputSchema ]),
  update: z.union([ InfrastructureUpdateInputSchema,InfrastructureUncheckedUpdateInputSchema ]),
}).strict() ;

export const InfrastructureCreateManyArgsSchema: z.ZodType<Prisma.InfrastructureCreateManyArgs> = z.object({
  data: z.union([ InfrastructureCreateManyInputSchema,InfrastructureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const InfrastructureDeleteArgsSchema: z.ZodType<Prisma.InfrastructureDeleteArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  where: InfrastructureWhereUniqueInputSchema,
}).strict() ;

export const InfrastructureUpdateArgsSchema: z.ZodType<Prisma.InfrastructureUpdateArgs> = z.object({
  select: InfrastructureSelectSchema.optional(),
  include: InfrastructureIncludeSchema.optional(),
  data: z.union([ InfrastructureUpdateInputSchema,InfrastructureUncheckedUpdateInputSchema ]),
  where: InfrastructureWhereUniqueInputSchema,
}).strict() ;

export const InfrastructureUpdateManyArgsSchema: z.ZodType<Prisma.InfrastructureUpdateManyArgs> = z.object({
  data: z.union([ InfrastructureUpdateManyMutationInputSchema,InfrastructureUncheckedUpdateManyInputSchema ]),
  where: InfrastructureWhereInputSchema.optional(),
}).strict() ;

export const InfrastructureDeleteManyArgsSchema: z.ZodType<Prisma.InfrastructureDeleteManyArgs> = z.object({
  where: InfrastructureWhereInputSchema.optional(),
}).strict() ;

export const DamageCreateArgsSchema: z.ZodType<Prisma.DamageCreateArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  data: z.union([ DamageCreateInputSchema,DamageUncheckedCreateInputSchema ]),
}).strict() ;

export const DamageUpsertArgsSchema: z.ZodType<Prisma.DamageUpsertArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereUniqueInputSchema,
  create: z.union([ DamageCreateInputSchema,DamageUncheckedCreateInputSchema ]),
  update: z.union([ DamageUpdateInputSchema,DamageUncheckedUpdateInputSchema ]),
}).strict() ;

export const DamageCreateManyArgsSchema: z.ZodType<Prisma.DamageCreateManyArgs> = z.object({
  data: z.union([ DamageCreateManyInputSchema,DamageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DamageDeleteArgsSchema: z.ZodType<Prisma.DamageDeleteArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  where: DamageWhereUniqueInputSchema,
}).strict() ;

export const DamageUpdateArgsSchema: z.ZodType<Prisma.DamageUpdateArgs> = z.object({
  select: DamageSelectSchema.optional(),
  include: DamageIncludeSchema.optional(),
  data: z.union([ DamageUpdateInputSchema,DamageUncheckedUpdateInputSchema ]),
  where: DamageWhereUniqueInputSchema,
}).strict() ;

export const DamageUpdateManyArgsSchema: z.ZodType<Prisma.DamageUpdateManyArgs> = z.object({
  data: z.union([ DamageUpdateManyMutationInputSchema,DamageUncheckedUpdateManyInputSchema ]),
  where: DamageWhereInputSchema.optional(),
}).strict() ;

export const DamageDeleteManyArgsSchema: z.ZodType<Prisma.DamageDeleteManyArgs> = z.object({
  where: DamageWhereInputSchema.optional(),
}).strict() ;

export const TownCreateArgsSchema: z.ZodType<Prisma.TownCreateArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  data: z.union([ TownCreateInputSchema,TownUncheckedCreateInputSchema ]),
}).strict() ;

export const TownUpsertArgsSchema: z.ZodType<Prisma.TownUpsertArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereUniqueInputSchema,
  create: z.union([ TownCreateInputSchema,TownUncheckedCreateInputSchema ]),
  update: z.union([ TownUpdateInputSchema,TownUncheckedUpdateInputSchema ]),
}).strict() ;

export const TownCreateManyArgsSchema: z.ZodType<Prisma.TownCreateManyArgs> = z.object({
  data: z.union([ TownCreateManyInputSchema,TownCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TownDeleteArgsSchema: z.ZodType<Prisma.TownDeleteArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  where: TownWhereUniqueInputSchema,
}).strict() ;

export const TownUpdateArgsSchema: z.ZodType<Prisma.TownUpdateArgs> = z.object({
  select: TownSelectSchema.optional(),
  include: TownIncludeSchema.optional(),
  data: z.union([ TownUpdateInputSchema,TownUncheckedUpdateInputSchema ]),
  where: TownWhereUniqueInputSchema,
}).strict() ;

export const TownUpdateManyArgsSchema: z.ZodType<Prisma.TownUpdateManyArgs> = z.object({
  data: z.union([ TownUpdateManyMutationInputSchema,TownUncheckedUpdateManyInputSchema ]),
  where: TownWhereInputSchema.optional(),
}).strict() ;

export const TownDeleteManyArgsSchema: z.ZodType<Prisma.TownDeleteManyArgs> = z.object({
  where: TownWhereInputSchema.optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const DocumentCreateArgsSchema: z.ZodType<Prisma.DocumentCreateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentCreateInputSchema,DocumentUncheckedCreateInputSchema ]),
}).strict() ;

export const DocumentUpsertArgsSchema: z.ZodType<Prisma.DocumentUpsertArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
  create: z.union([ DocumentCreateInputSchema,DocumentUncheckedCreateInputSchema ]),
  update: z.union([ DocumentUpdateInputSchema,DocumentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DocumentCreateManyArgsSchema: z.ZodType<Prisma.DocumentCreateManyArgs> = z.object({
  data: z.union([ DocumentCreateManyInputSchema,DocumentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DocumentDeleteArgsSchema: z.ZodType<Prisma.DocumentDeleteArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentUpdateArgsSchema: z.ZodType<Prisma.DocumentUpdateArgs> = z.object({
  select: DocumentSelectSchema.optional(),
  include: DocumentIncludeSchema.optional(),
  data: z.union([ DocumentUpdateInputSchema,DocumentUncheckedUpdateInputSchema ]),
  where: DocumentWhereUniqueInputSchema,
}).strict() ;

export const DocumentUpdateManyArgsSchema: z.ZodType<Prisma.DocumentUpdateManyArgs> = z.object({
  data: z.union([ DocumentUpdateManyMutationInputSchema,DocumentUncheckedUpdateManyInputSchema ]),
  where: DocumentWhereInputSchema.optional(),
}).strict() ;

export const DocumentDeleteManyArgsSchema: z.ZodType<Prisma.DocumentDeleteManyArgs> = z.object({
  where: DocumentWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;