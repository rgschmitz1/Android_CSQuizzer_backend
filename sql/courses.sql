DROP TABLE IF EXISTS Courses;

CREATE TABLE Courses (
	CourseID SERIAL PRIMARY KEY,
	CourseName VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Courses (CourseName) VALUES ('Fundamentals of Object-Oriented Programming');
INSERT INTO Courses (CourseName) VALUES ('Discrete Structures');
INSERT INTO Courses (CourseName) VALUES ('Data Structures');
INSERT INTO Courses (CourseName) VALUES ('Design and Analysis of Algorithms');
INSERT INTO Courses (CourseName) VALUES ('Fundamentals of Programming Language Concepts');
