DROP TABLE IF EXISTS SubQuestions;
CREATE TABLE SubQuestions (
	SubQuestionID integer NOT NULL,
	QuestionID integer REFERENCES Questions ON DELETE CASCADE,
	SubQuestionText TEXT NOT NULL,
    PRIMARY KEY (QuestionID, SubQuestionID)
);
