DROP TABLE IF EXISTS Types;

CREATE TABLE Types (
	TypeID SERIAL PRIMARY KEY,
	TypeDescription VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO Types (TypeDescription) VALUES ('True/False');
INSERT INTO Types (TypeDescription) VALUES ('Single Choice');
INSERT INTO Types (TypeDescription) VALUES ('Multiple Choice');
