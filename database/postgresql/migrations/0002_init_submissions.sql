CREATE TABLE IF NOT EXISTS submissions
(
    id           UUID default gen_random_uuid() primary key,
    author       varchar not null,
    title        varchar,
    state        varchar,
    geo_location varchar,
    description  varchar,
    tags         text[],
    pin          varchar not null,
    created_at   bigint,
    updated_at   bigint,
    delete_at    bigint,
    album        varchar
);