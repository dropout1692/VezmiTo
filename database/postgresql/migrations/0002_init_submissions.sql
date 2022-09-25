CREATE TABLE IF NOT EXISTS submissions
(
    id           UUID default gen_random_uuid() primary key,
    author       varchar not null,
    title        varchar,
    state        varchar,
    type         varchar,
    geo_location varchar,
    description  varchar,
    tags         varchar,
    flags        varchar,
    pin          varchar not null,
    created_at   varchar,
    updated_at   varchar,
    album        varchar
);