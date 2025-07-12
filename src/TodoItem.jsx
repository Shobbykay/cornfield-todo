import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Checkbox.css';

function TodoItem({ todo, onToggle, onDelete }) {
  const checkboxId = `todo-${todo.id}`;

  return (
    <div className="d-flex align-items-center w-100">
      {/* Left side: Checkbox + Text */}
      <div className="d-flex align-items-center flex-grow-1">
        <div className="checkbox-wrapper-43">
          <input
            type="checkbox"
            id={checkboxId}
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label htmlFor={checkboxId} className="check">
            <svg width="18px" height="18px" viewBox="0 0 18 18">
              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 
              C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z" />
              <polyline points="1 9 7 14 15 4" />
            </svg>
          </label>
        </div>

        <span
          onClick={() => onToggle(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            cursor: 'pointer',
          }}
          className={`ms-2 ${todo.completed ? 'text-muted' : ''}`}
        >
          {todo.title}
        </span>
      </div>

      {/* Right side: Delete button */}
      <div className="ms-auto">
        <button className="btn btn-sm text-danger" onClick={() => onDelete(todo.id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
