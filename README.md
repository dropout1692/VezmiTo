# VezmiTo

VezmiTo is a full-stack application for submitting, browsing, and moderating location-based media submissions.

## Architecture

- `app/` — Ionic React PWA and mobile client
- `api/` — Spring Boot REST API
- `database/` — PostgreSQL Docker setup and ordered SQL migrations
- `parsers/` — supporting data/parser utilities

## Prerequisites

- Java 11
- Node.js and npm
- Docker and Docker Compose
- PostgreSQL (or the provided Docker Compose setup)

## Database

Start PostgreSQL from the database directory:

```bash
cd database/postgresql/docker
docker compose up -d
```

Then apply migrations in numeric order:

```bash
cd database/postgresql/migrations
# Apply 0001_init_authors.sql, 0002_init_submissions.sql,
# and 0003_init_albums.sql to the vezmito database.
```

Do not modify existing migration scripts; add a new numbered migration for schema changes.

## Backend

Configure `api/src/main/resources/application.properties` for the target database, or provide the Spring datasource properties through environment variables.

```bash
cd api
./mvnw spring-boot:run
```

On Windows:

```powershell
cd api
.\mvnw.cmd spring-boot:run
```

The API listens on port `1337` with the `/vezmito` context path. Swagger UI is available at `/vezmito/api-docs.html`.

## Frontend

```bash
cd app
npm install
npm start
```

The development server is managed by Create React App. Update `app/src/config/app.ts` if the API host is not local or is not the configured deployment endpoint.

For a production build:

```bash
cd app
npm run build
```

## Tests

```bash
cd api
./mvnw test

cd ../app
npm test -- --watchAll=false
```

## Security

- Use environment variables or a secret manager for production database credentials; never commit real secrets.
- Run `npm audit` in `app/` and `mvnw dependency-check:check` in `api/` when updating dependencies.
- Review dependency changes carefully before upgrading major framework versions such as Spring Boot, React Scripts, or Capacitor.
