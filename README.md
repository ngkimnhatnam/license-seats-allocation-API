# license-seats-allocation-API

---

## Introduction

The License Seat API is an implementation of a license seat allocator system, in which users can lease available seats from a license key.

## Tech stacks used

- NodeJs / Typescript
- ExpressJS framework
- PostgreSQL
- Prettier & ESlint
- Docker

## Application initiation

To run the application in development:

```bash
npm run dev
```

To lint the project:

```bash
npm run lint
```

## Project structure

```bash
|-- src
|     |-- configs                   Contain all configuration files
|     |-- controllers               Handling status codes + client response
|     |-- helpers                   Contain helper methods
|     |-- loaders                   Contain Express app main configurations
|     |-- models                    Handles communication with database
|     |-- routes                    Express router is exported with defined api routes
|     |-- services                  Handles business logic
|     |-- subscriptions             Handles background operations with events module
|     |     |-- eventEmitter.ts
|     |     |-- logging.ts
|     |-- server.ts
|-- .dockerignore
|-- .eslintrc
|-- .gitignore
|-- .prettierrc
|-- Dockerfile
|-- nodemon.json
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.json
```

## Local development

To work locally, you may want to add a .env file to the root of the project, before running the application in dev mode.

## Project development documentation

- [API capacities](docs/functionality.md)
- [Database schema](docs/database_design.md)

## Trying out with License Seat Allocator API

You can try out the APIs at http://3.208.20.48:3002/api-docs.

Sample license key is below

```bash
 - license_key: TEST
 - domain: @io.io
```

You can provide any sample user email that has ending domain with @io.io. Or you can add new license key with the API as well.
