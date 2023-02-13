\c messagely;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text NOT NULL,
    join_at timestamp without time zone NOT NULL,
    last_login_at timestamp with time zone
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    from_username text NOT NULL REFERENCES users,
    to_username text NOT NULL REFERENCES users,
    body text NOT NULL,
    sent_at timestamp with time zone NOT NULL,
    read_at timestamp with time zone
);

INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
VALUES ('test', 'password', 'Test', 'Testy', '+1415550000', current_timestamp, current_timestamp);

INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
VALUES ('joel', 'password', 'Joel', 'Burton', '+14155551212', current_timestamp, current_timestamp);

INSERT INTO messages (from_username, to_username, body, sent_at)
VALUES ('test', 'joel', 'To joel from test', current_timestamp);

INSERT INTO messages (from_username, to_username, body, sent_at)
VALUES ('test', 'joel', 'To joel from test again!!', current_timestamp);

INSERT INTO messages (from_username, to_username, body, sent_at)
VALUES ('joel', 'test', 'To test from joel', current_timestamp);