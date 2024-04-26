# In-depth analysis of schema: models and their relations :sparkles:

This readme explores the complete structure of models used for this project along with their relations with each other.

## Models 🗂️

I've used 4 models for this project :-

-   User 🧑‍💼
-   Account 🛡️
-   Conversation 💬
-   Message

For all these models, I will only list the fields which have type modifiers, mapping and the relations.

## User Model 🧑‍💼

This model represents a user entity in the database.

### 1. Field: `id`

```prisma
id  String  @id @default(auto()) @map("_id") @db.ObjectId
```

In mongodb the `id` field is always named as `_id` and is of type **ObjectId**. Hence we use `@map` attribute to map this field to `_id` to our database.

**ObjectId** is a native type of mongodb database. It is not a part of Prisma Schema Definition Language (SDL). In such cases we use `@db` attribute to describe the native database type as `@db.ObjectId`.

-   `@id` : this attribute helps to define a field as an _id_

-   `@default` : this attribute is used to set a _default_ value for a field. It accepts a value, like in the example above I've passed `auto()` as argument to automatically generate this field whenever new data is inserted for User model.

### 2. Field `email`

```prisma
email  String?  @unique
```

-   `?` : this is a type modifier which shows field `email` is optional

-   `@unique` : this attribute shows each email will be unique

### 3. Field `updatedAt`

```prisma
updatedAt  DateTime  @updatedAt
```

-   `DateTime` : this is a prisma SDL type for representing date and time

-   `@updatedAt` : this attribute automatically stores the time when a field was last updated.

### 4. Relation with Conversation Model

```prisma
conversationIds  String[]  @db.ObjectId
conversations      Conversation[]  @relation(fields: [conversationIds], references: [id])
```

-   This code establishes a _many-to-many_ relationship between User and Converstation Models.
-   `conversationIds` : represents an array of conversation IDs associated with a user.
-   `@relation` : this attribute is used to define the relation between models like we define references in SQL. Here `conversationIds` field is linked to `id` field of model `Conversation`.

Here **Conversation** is a different model so `conversations` field stores an array of type `Conversation`.

### 5. Relation with Message Model

```prisma
seenMessageIds  String[]   @db.ObjectId
seenMessages    Message[]  @relation("Seen", fields: [seenMessageIds], references: [id])
messages        Message[]
```

-   These fields establish a _many-to-many_ relationship between User and Message models, indicating which messages a user has seen.
-   `seenMessageIds` : represents an array of message IDs that the user has seen.
-   When more than one relations are defined with the same model, in this case it is with model **Message**. We need to mention a name for the relation to avoid confusion.

-   The name given here is **"Seen"**.

## Account Model 🛡️

This model represents an account asociated with a user in the database.

### 1. Field: `userId`

```prisma
userId  String  @db.ObjectId
```

-   `userId` is defined as the native mongodb database type as `@db.ObjectId`.

### 2. Field: `refresh_token`

```prisma
refresh_token  String?  @db.String
```

-   It represents the refresh token associated with the account. A refresh token is typically used in authentication systems to obtain new access tokens without requiring the user to re-enter their credentials.
-   In postgresql, this field is typically mapped to datatype `TEXT` but we don't have that in mongodb, so here we are mapping it to `String` using `@db`

### 3. Relation with User Model

```prisma
userId  String  @db.ObjectId
user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
```

-   This field establishes a _many-to-one_ relationship between Account and User models, indicating which accounts belongs to a user.
-   `onDelete: Cascade` : this means that deleting the **User** record will also delete all the related **Account** records.

### 4. Unique Constraint

```prisma
@@unique([provider, providerAccountId])
```

-   Another way of defining unique fields in a model. This creates a _compound_ unique constraint. This means that the pair together should be unique.

## Conversation Model 💬

This model represents a conversation entity in the database.

### 1. Field: `createdAt`

```prisma
createdAt  DateTime  @default(now())
```

-   `DateTime` : this is a prisma SDL type for representing date and time
-   `@default(now())` : automatically sets to the current timestamp upon creation

### 2. Field: `isGroup`

```prisma
isGroup  Boolean?
```

-   represents whether the conversation is a group chat or not.
-   It is of type `Boolean` and is optional as denoted by `?`

### 3. Relation with Message Model

```prisma
messagesIds  String[]  @db.ObjectId
messages     Message[]
```

-   These fields establish a _one-to-many_ relationship between Conversation and Message models.
-   `messagesIds` : Represents an array of message IDs associated with the conversation.
-   `messages` : Represents an array of Message objects related to the conversation. It represents the messages exchanged within the conversation.

### 4. Relation with User Model

```prisma
userIds  String[]  @db.ObjectId
users    User[]    @relation(fields: [userIds], references: [id])
```

-   These fields establish a _many-to-many_ relationship between Conversations and User models.
-   `userIds` : Represents an array of user IDs associated with the conversation.
-   `users` : Represents an array of User objects related to the conversation. It signifies the users participating in the conversation.

## Message Model 💬

This model represents a message entity in the database.

### 1. Relation with User Model

```prisma
seenIds  String[]  @db.ObjectId
seen     User[]    @relation("Seen", fields: [seenIds], references: [id])
```

-   These fields establish a _many-to-many_ relationship between Message and User models to track which users have seen the message.
-   `seenIds` : Represents an array of user IDs who have seen the message.
-   `seen`: Represents an array of User objects related to the message.
-   We add the same name **"Seen"** to this relation.

```prisma
senderId  String  @db.ObjectId
sender    User    @relation(fields: [senderId], references: [id], onDelete: Cascade)
```

-   These fields establish a _many-to-one_ relationship between Message and User models to determine the sender of the message.
-   `senderId` : Represents the ID of the user who sent the message.
-   `sender` : Represents the User object related to the message, indicating the user who sent it.
-   `onDelete: Cascade` : this means that deleting the **User** record will also delete all the related **Message** records.

### 2. Relation with Conversation Model

```prisma
conversationId      String            @db.ObjectId
conversation        Conversation      @relation(fields: [conversationId], references: [id], onDelete: Cascade)
```

-   These fields establish a _many-to-one_ relationship between Message and Conversation models.
-   `conversationId` : Represents the ID of the conversation to which the message belongs.
-   `conversation` : Represents the Conversation object related to the message.
