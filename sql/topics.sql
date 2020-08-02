DROP TABLE IF EXISTS Topics;

CREATE TABLE Topics (
	TopicID SERIAL PRIMARY KEY,
	TopicDescription VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Topics (TopicDescription) VALUES ('Recursion');
INSERT INTO Topics (TopicDescription) VALUES ('Stacks and Queues');
INSERT INTO Topics (TopicDescription) VALUES ('Time Complexity');
