# VezmiTo

## Project details

### Description

Lorem ipsum dolor sit amet.

### Authors

 - meno <email>
 - meno <email>
 - meno <email>
 
## Swagger UI

http://dpt.wtf:1337/vezmito/swagger-ui/index.html

## Development setup

Follow the instructions below in order.

### 0.0 Prerequisities

Install the following

 - Java11
 - Docker
 - npm/nodeJS

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