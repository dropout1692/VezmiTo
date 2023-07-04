# VezmiTo

## Project details

### Description

Lorem ipsum dolor sit amet.

### Authors

 - meno <email>
 - meno <email>
 - meno <email>
 
## Swagger UI

http://localhost:1337/swagger-ui.html

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
