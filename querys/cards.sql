CREATE TABLE cards (
	id SERIAL PRIMARY KEY,
	column_id INT NOT NULL REFERENCES columns(id) ON DELETE CASCADE,
	title VARCHAR(150) NOT NULL, 
	description TEXT,
	responsible_id INT,
	priority VARCHAR(20) CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')) DEFAULT 'baixa',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	conclusion_at TIMESTAMP
)

