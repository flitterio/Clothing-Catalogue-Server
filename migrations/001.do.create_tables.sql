CREATE TABLE cc_users (
   id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    username TEXT NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE cc_items (
   id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    userid INTEGER REFERENCES cc_users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    image VARCHAR,
    season TEXT,
    category TEXT,
    favorite BOOLEAN 
);