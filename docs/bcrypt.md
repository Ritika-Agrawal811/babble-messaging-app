# Short guide on bcrypt :sparkles:

**Bcrypt** is a simple JavaScript library which is used for hashing passwords. It implements Provos and Mazières's _bcrypt adaptive hashing algorithm_.

## What is Hashing? 🛡️

Hashing is a cryptographic process used to convert data (such as passwords or other information) into a fixed-length string of characters, typically for security purposes.

The output of a hashing algorithm is called a _hash value_ or _hash code_.

Hashing processes used for passwords are designed to be **one-way functions** to make it impossible to retrieve the original data from the hashed values.

### Features 🎉

-   **Deterministic** : The same input will always produce the same hash value. This helps to easily verify and compare passwords for authenticity.

-   **Fixed Length** : The length of the hash value is fixed, regardless of the size of the input data.

-   **Non-Reversible** : Hashing is a one-way process. It is infeasible to determine the original input data.

-   **Collision Resistance** : A good hashing algorithm ensures that no two different inputs produce the same hash value (collision).

## What is becrypt algorithm? 🔒

Bcrypt is a password hashing algorithm used to secure passwords. The name _“bcrypt”_ is made of two parts: _b_ and _crypt_, where b stands for **Blowfish** and crypt is the name of the hashing function used by the Unix password system.

Bcrypt is designed to be a _slow algorithm_, which is a good thing when it comes to password hashing. Therefore, bcrypt is perfect for password hashing because it reduces _brute-force_ attacks.

### How does bcrypt work? 🔄

1. Bcrypt takes a user-submitted plain password.
2. Before this plain password is hashed, it generates a _unique string_ called **salt** and appends it to the password.
3. This combined string is then hashed and stored in the database.

This helps protect against _rainbow table attacks_ because attackers can randomly guess users’ passwords, but they can’t guess the _salt_.

## Bcrypt library functions used in this application

### 1. hash()

This function is used to hash a password. It takes in 2 parameters — _password_ string and number of _salt rounds_

**Prototype :**

```js
function hash(data: string | Buffer, saltOrRounds: string | number): Promise<string>
```

It returns a _Promise_ which resolves to the hashed string.

**Example :**

```js
const hashedPassword = await bcrypt.hash(password, 12)
```

_await_ is used to unwrap the Promise and get the hashed password.

### 2. compare()

This function is used to compare a given data against a hashed string. We can use this function to check whether the user has entered the correct password.

```js
function compare(data: string | Buffer, encrypted: string): Promise<boolean>
```

It also returns a _Promise_ which resolves to a boolean.

**Example :**

```js
const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
```

_await_ is used to unwrap the Promise and get the _boolean_ value. If the password after hashing matches the hashed value stored in database, it return true or false otherwise.
