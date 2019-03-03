# cheeZjokesApp-Server

cheeZjokesApp-Server is a RESTful API backend for retrieving and voting on jokes built in Node, Express & PostgreSQL.

## Prerequisites

You will need to have the following items installed in order to run this program:

1. Install Node.js and npm
2. Install PostgreSQL
3. Create databases for application (Adjust names if desired in config.js)

- cheezjokes
- cheezjokes-test (if you want to run the tests)

## Getting Started

1. Fork or clone the repo, and run npm install. package.json has all required dependencies.

   - only production packages

   ```
   npm install --production
   ```

   - only dev packages

   ```
   npm install --only=dev
   ```

   - Install Everything

   ```
   npm install
   ```

2. Create database instances as referenced above

   - Production database

   ```
   createdb cheezjokes
   ```

   - (Optional - Test database)

   ```
   createdb cheezjokes-test
   ```

3. Use a global install of nodemon or start the program by running server.js

   ```
   nodemon server.js
   ```

   or

   ```
   node server.js
   ```

4. Install the postgresql schema tables onto your database.

   - (**Note, any of the steps below will reset and drop your existing tables**)

   ```
   psql cheezjokes < seed.sql
   ```

   ```
   psql cheezjokes-test < seed.sql
   ```

## Running Tests

- In the root folder, run:
  `npm test`

## Routes Reference

### Jokes

- GET - /jokes
- PATCH - /jokes/jokeId/upvote
- PATCH - /jokes/jokeId/downvote

## Built With

- Node.js - Server Language
- express.js - Node Web Framework
- PostgreSQL - SQL Database
- dotenv - Env Variable Parser
- pg - PostgreSQL client for Node.js
- https://icanhazdadjoke.com/api - Dad Jokes API

Testing stack:

- jest - Testing Library
- supertest - Testing Library (mock http requests)
- morgan - HTTP Request Logger

## Author

- WongCo - https://github.com/wongco
