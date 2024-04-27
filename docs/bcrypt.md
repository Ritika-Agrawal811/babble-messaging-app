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
