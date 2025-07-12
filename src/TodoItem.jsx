import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </div>
  );
}

export default TodoItem;
