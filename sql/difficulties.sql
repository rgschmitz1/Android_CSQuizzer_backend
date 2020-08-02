DROP TABLE IF EXISTS Difficulties;

CREATE TABLE Difficulties (
	DifficultiesID SERIAL PRIMARY KEY,
	DifficultiesDescription VARCHAR(10) UNIQUE NOT NULL
);

INSERT INTO Difficulties (DifficultiesDescription) VALUES ('Easy');
INSERT INTO Difficulties (DifficultiesDescription) VALUES ('Medium');
INSERT INTO Difficulties (DifficultiesDescription) VALUES ('Hard');
