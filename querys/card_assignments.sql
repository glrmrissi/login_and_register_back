CREATE TABLE card_assignments (
	card_id INT REFERENCES cards(id) ON DELETE CASCADE,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	PRIMARY KEY (card_id, user_id)
)