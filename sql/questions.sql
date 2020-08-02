DROP TABLE IF EXISTS Questions;
CREATE TABLE Questions (
	QuestionID SERIAL PRIMARY KEY,
	QuestionTitle VARCHAR(255) NOT NULL UNIQUE,
	QuestionBody TEXT NOT NULL,
    CourseID integer REFERENCES Courses,
	TopicID integer REFERENCES Topics,
	DifficultyID integer REFERENCES Difficulties,
	TypeID integer REFERENCES Types
);
