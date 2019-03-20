CREATE TABLE key_sig (
  id           SERIAL            PRIMARY KEY,
  name         VARCHAR(1)        NOT NULL
  );

CREATE TABLE accidental (
  id           SERIAL            PRIMARY KEY,
  accidental   VARCHAR(10)       NOT NULL
  );

CREATE TABLE time_sig (
  id           SERIAL            PRIMARY KEY,
  signature    VARCHAR(5)        NOT NULL
  );

CREATE TABLE staff (
  id             SERIAL          PRIMARY KEY,
  key_sig_id     INT             NOT NULL          REFERENCES key_sig(id),
  time_sig_id    INT             NOT NULL          REFERENCES time_sig(id),
  accidental_id  INT             NOT NULL          REFERENCES accidental(id)
  );

INSERT INTO key_sig(name) VALUES
  ('A'),
  ('B'),
  ('C'),
  ('D'),
  ('E'),
  ('F'),
  ('G');

INSERT INTO accidental(accidental) VALUES
('sharp'),
('flat'),
('natural');

INSERT INTO time_sig(signature) VALUES
  ('4/4'),
  ('3/4'),
  ('2/4'),
  ('6/8');

INSERT INTO staff(key_sig_id, time_sig_id, accidental_id) VALUES
  (1, 1, 1),
  (1, 1, 2),
  (1, 1, 3),
  (1, 2, 1),
  (1, 2, 2),
  (1, 2, 3),
  (1, 3, 1),
  (1, 3, 2),
  (1, 3, 3),
  (1, 4, 1),
  (1, 4, 2),
  (1, 4, 3);

SELECT * FROM key_sig;
SELECT * FROM time_sig;
SELECT * FROM accidental;
SELECT * FROM staff;
