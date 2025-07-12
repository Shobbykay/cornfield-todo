import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import api from './api'; // Axios instance
import './Checkbox.css'; // Custom checkbox styling

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Fetch todos on mount
  useEffect(() => {
    api.get('/todos')
      .then((res) => setTodos(res.data))
      .catch((err) => console.error('Failed to load todos:', err));
  }, []);

  // Add new todo
  const handleAdd = () => {
    if (!input.trim()) return;
    api.post('/todos', { text: input }).then((res) => {
      setTodos((prev) => [res.data, ...prev]);
      setInput('');
    });
  };

  // Toggle completed status
  const handleToggle = (id) => {
    api.patch(`/todos/${id}`).then(() => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    });
  };

  // Delete a todo
  const handleDelete = (id) => {
    api.delete(`/todos/${id}`).then(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    });
  };

  // Clear all completed todos
  const handleClearCompleted = () => {
    api.delete('/todos').then(() => {
      setTodos((prev) => prev.filter((todo) => !todo.completed));
    });
  };

  // Filter and search
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      const content = todo.text || todo.title || '';
      return content.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cornfield Todo List</h2>

      {/* Add new todo */}
      <div className="input-group mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new todo"
          className="form-control"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>


      {/* Filters */}
      <div className="btn-group mb-3">
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${filter === 'active' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Search field */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search todos..."
          style={{ border: 'none', boxShadow: 'none' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Todo list */}
      <div className="list-group">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="list-group-item">
            <TodoItem
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </div>
        ))}
        {filteredTodos.length === 0 && (
          <div className="text-muted text-center py-3">No todos found.</div>
        )}
      </div>

      {/* Clear completed */}
      <button className="btn btn-danger mt-3" onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoApp;
