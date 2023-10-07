# VezmiTo API (BE)

## Project details

### Description

BE API application for VezmiTo.

### Authors

- Michal 'dropout' Marusinec <michalmarusinec@gmail.com>

## Swagger UI

https://dpt.wtf:1337/swagger-ui/index.html

## Development setup

Follow the instructions below in order.

### 0.0 Prerequisities

Install the following

- Java17
- newest Maven
- Docker
- npm/nodeJS
- EnvFile and Lombok plugin for your IDE

### 1.0 Database

#### Installation

```
docker pull postgres
```

Set exposed port `5432:5432` and make sure environment variables `POSTGRES_USERNAME`
and `POSTGRES_PASSWORD` are configured.

Run the image.

#### Initialization

Run scripts from `database/postgresql/migration` in order.

### 2.0 Environment setup

The project uses externalized configuration for sensitive properties, which are stored in an `.env`
file that is NOT TO BE PUSHED INTO THE REPOSITORY.

This file needs to be present on the server as well in order for the application to work properly.

For development and EnvFile plugin is necessary to be present on the IDE to configure builds to
include the properties from the .env file.

### X.0 Final test

#### X.1 Build

Run `mvn clean install`.

Solutions to common problems

- make sure you have a locally running database server that is properly configured vs the .env file
- make sure the database exists, if not `psql --host 0.0.0.0 --user vezmito_user` and then `create database vezmito;`
- check if your .env file is located on module root (`/api/`) according to the plugin configuration in `pom.xml`
- sacrifice goat to James Gosling
- ???
- profit

#### X.2 Local test

Start the application as a Spring Boot project from `ApiApplication.class`

Solutions to common problems

- ensure your env plugin is configured and in build settings you have EnvFile enabled and set as a priority when selecting files
- make sure DB is running in docker, we don't do no H2 shit around here
- in certin situations you might need to import the pkcs12 cert (in `resources/cert`) into your truststore