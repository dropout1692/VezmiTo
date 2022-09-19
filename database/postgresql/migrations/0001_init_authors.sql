CREATE TABLE IF NOT EXISTS authors
(
    id        UUID default gen_random_uuid() primary key,
    phone     varchar,
    email     varchar,
    device_id text[]
);