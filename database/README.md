# VezmiTo.sk - DB

## Migrations

Migration scripts that need to be ran in a set order and should follow the proper version number.
DO NOT overwrite migration scripts - create a new migration script with the correct file name.

```
{version number}_{version description}.sql
```

For example

```
0052_Users_password_len_change.sql
```

## Docker Compose

Docker compose file is for running without a permanent DB setup, for testing purposes.
It is advised to have a locally running database with a proper setup and all relevant migrations.