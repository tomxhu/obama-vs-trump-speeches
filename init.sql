DROP DATABASE IF EXISTS posts;
CREATE DATABASE posts;

\c posts;

CREATE TABLE post (
  ID SERIAL PRIMARY KEY,
  eventName VARCHAR,
  obamaLink VARCHAR,
  trumpLink VARCHAR,
  count INTEGER
);

INSERT INTO post (eventName, obamaLink, trumpLink, count)
  VALUES ('testEvent', 'olink', 'tlink', 0);