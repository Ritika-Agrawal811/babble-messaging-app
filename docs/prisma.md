# Getting started with Prisma :sparkles:

Prisma is an open-source ORM which comes with a prisma client, prisma migrate and a prisma studio.

Before going further into prisma let's understand what an ORM is!

## What is an ORM? 🔄

ORM stands for Object-Relational Mapper. It is named so because it uses a technique called Object-Relational-Mapping.

### Object Relational Mapping 🗺️

Object-relational-mapping is the idea of being able to write **queries** like the SQL queries using the object-oriented paradigm of **your preferred programming language**.

Here, _"object-oriented paradigm"_ refers to a programming paradigm based on the concept of **objects**, which are instances of classes. In simple words, Object-relational mapping (ORM) frameworks enable developers to work with relational databases in an object-oriented manner.

These ORMs abstract away the complexities of SQL queries and database interactions, allowing developers to work with database entities as if they were regular objects in their programming language.

Suppose there is an SQL query:

```sql
SELECT * FROM users WHERE email = 'test@test.com';
```

An ORM tool will allows developers to use the above query as some object function like:

```go
users.GetByEmail("test@test.com")
```

Normally we have to use languages like SQL to interact with a database. **ORM** allows us to interact with our databases with any language instead of just SQL.

## Setting up Prisma 🛠️

1. Install the prisma and prima client

Use npm/yarn or any other package manager to install prisma

```shell
npm install prisma @prisma/client
```

2. Create a prisma schema file

Run the prisma init command. This creates a folder named _prisma_ in the root of the directory. It contains a file named _schema.prisma_.

```shell
npx prisma init
```

## Creating Prisma Schema 🧱

Prisma schema is where we provide the details for connecting our database and define all the table models for our project.

### Datasource Block 📂

In your _schema.prisma_, you will find a datasource block. This is where we mention the **provider** and **url** of our database.

For example :-

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

We provide the url as an evironment variable in `.env` file.

> ⚠️ Note: Make sure the url is correct. Don't forget to add the database name when using mongodb.

### Defining Models 🗃️

These models are the ones that are mapped to tables (postgresql) or collections(mongodb) based on a database we are using.

They represent the entities of our application domain.

Syntax :-

```prisma
model User {
 // Fields
}
```

For a detailed explanation of the models used for this messenger clone, visit [here](https://github.com/Ritika-Agrawal811/messenger-clone/blob/main/docs/models.md).

## Generating Prisma Client ⚙️

After our complete schema is defined, we need to generate a prisma client. For this we use the below command :-

```shell
npx prisma generate
```

This commands reads our schema file and generates a prisma client tailored to our models.

## Migrate our models to database 📥

We run the below command to migrates all the models to our database.

```shell
npx prisma db push
```

# Best practice for instantiating Prisma Client :sparkles:

Sometimes while working with prisma in NextJS, we may get a warning like this:

```
warn(prisma-client) There are already 10 instances of Prisma Client actively running.
```

This happens because in development mode, `next dev` command clears the cache which in turn creates a new `PrismaClient` instance each time, creating a new connection to the database. [Check the related issue.](https://github.com/prisma/prisma/discussions/4399)

To solve this issue, it is best to create a separate `db.ts` file which instantiates a single `PrismaClient` instance and save it on the `globalThis` object.

```ts
import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

// creating a new client only if it doesn't already exist on global object
const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
```

Here we check whether a _client_ already exists on the global object, if not we call the `PrismaClient` constructor to create a new client.

Lastly we export this client to use it throughout our application.
