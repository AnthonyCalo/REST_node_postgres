CREATE DATABASE usersDB;
--This code doesn't do anything. it is just showing the schema of the database
--used these commands in psql CLI
--\c into users database

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    user_email VARCHAR(255)
);

