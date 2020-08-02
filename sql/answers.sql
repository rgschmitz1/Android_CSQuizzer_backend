DROP TABLE IF EXISTS Answers;
CREATE TABLE Answers (
	AnswerID integer NOT NULL,
	QuestionID integer REFERENCES Questions ON DELETE CASCADE,
	AnswerText TEXT NOT NULL,
    PRIMARY KEY (QuestionID, AnswerID)
);
