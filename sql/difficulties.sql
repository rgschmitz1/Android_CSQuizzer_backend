DROP TABLE IF EXISTS Difficulties;

CREATE TABLE Difficulties (
	DifficultyID SERIAL PRIMARY KEY,
	DifficultyDescription VARCHAR(10) UNIQUE NOT NULL
);

INSERT INTO Difficulties (DifficultyDescription) VALUES ('Easy');
INSERT INTO Difficulties (DifficultyDescription) VALUES ('Medium');
INSERT INTO Difficulties (DifficultyDescription) VALUES ('Hard');
