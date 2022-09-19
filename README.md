# projeto20-repoprovas

## `Driven Pass API`

https://repo-provas-db.herokuapp.com

## `API Documentation`

https://repo-provas-db.herokuapp.com/api-docs/#/

## `Run locally`

Clone the project

```bash
  git clone https://github.com/marykarakida/projeto20-repoprovas
```

Go to the project directory

```bash
  cd projeto20-repoprovas
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  npx prisma generate dev
```

Start the server

```bash
  npm run start
```

## `Environment Variables`

To run this project, you will need to add the following environment variables to your .env file

### PORT

-   if not provided, 4000 is the default port

### DATABASE_URL (required)

-   database connection string
-   pgsql format: postgresql://[user[:password]@][netloc][:port][/dbname]

### SHADOW_DATABASE_URL

-   database connection string
-   second, temporary database that is created and deleted automatically each time you run a development-focused command and is primarily used to detect problems such as schema drift
-   pgsql format: postgresql://[user[:password]@][netloc][:port][/dbname]

### TOKEN_SECRET (required)

-   secret key to hash/encrypt data
-   as suggestion to generate key, run in your terminal:

```bash
  node
  require("crypto").randomBytes(64).toString("hex")
```

### JWT_EXPIRE (required)

-   token expiration time

## `Tests (Thunder Client)`

import `thunder-collection_repoprovas.json` and `thunder-environment_repoprovas.json` in thunderclient

### ENV VARIABLES IN THUNDERCLIENT

-   TOKEN
-   BASE_URL
