CREATE TABLE task_movements (
    id SERIAL PRIMARY KEY,
    card_id INT REFERENCES cards(id),
    from_column_id INT REFERENCES columns(id),
    to_column_id INT REFERENCES columns(id),
    moved_at TIMESTAMP DEFAULT now(),
    moved_by INT REFERENCES users(id)
);
