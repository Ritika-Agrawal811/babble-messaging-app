# In-depth analysis of schema: models and their relations :sparkles:

This readme explores the complete structure of models used for this project along with their relations with each other.

## Models 🗂️

I've used 4 models for this project :-

-   User
-   Account
-   Conversation
-   Message

For all these models, I will only list the fields which have type modifiers, mapping and the relations.

### User Model 🧑‍💼

#### 1. Field: `id`

```prisma
id  String  @id @default(auto()) @map("_id") @db.ObjectId
```

In mongodb the `id` field is always named as `_id` and is of type **ObjectId**. Hence we use `@map` attribute to map this field to `_id` to our database.

**ObjectId** is a native type of mongodb database. It is not a part of Prisma Schema Definition Language (SDL). In such cases we use `@db` attribute to describe the native database type as `@db.ObjectId`.

-   `@id`: this attribute helps to define a field as an id

-   `@default` : this attribute is used to set a default value for a field. It accepts a value like in the example above I've passed `auto()` as argument.

#### 2. Field `email`

```prisma
email  String?  @unique
```

-   `?`: this is a type modifier which shows field `email` is optional

-   `@unique` : this attribute shows each email will be unique

#### 3. Field `updatedAt`

```prisma
 updatedAt  DateTime  @updatedAt
```

-   `DateTime` : this is a prisma SDL type for representing date and time

-   `@updatedAt` : this attribute automatically stores the time when a field was last updated.

#### 4. Relation with Model Conversation

```prisma
conversationIds  String[]  @db.ObjectId
conversations  Conversation[]  @relation(fields: [conversationIds], references: [id])
```

-   `@relation` : this attribute is used to define the relation between models like we define references in SQL. Here `conversationIds` field is linked to `id` field of model `Conversation`.

Here **Conversation** is a different model so `conversations` field stores an array of type `Conversation`.

#### 5. Relation with Model Messge

```prisma
seenMessages  Message[]  @relation("Seen", fields: [seenMessageIds], references: [id])
```

When more than one relations are defined with the same model, in this case it is with model **Message**. We need to mention a name for the relation to avoid confusion.

The name given here is **"Seen"**.

### Account Model 🛡️

#### 1. Field: `id`

```prisma
  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)

```

-   `onDelete: Cascade` : this means that deleting the **User** record will also delete all the related **Account** records.

-   ` @@unique([provider, providerAccountId])` : another way of defining unique fields in a model. This creates a compound unique constraint. This means that the pair together should be unique.
