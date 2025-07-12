import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text: input.trim(), completed: false },
    ]);
    setInput('');
  };

  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setTodos(items);
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Todo List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        placeholder="Add todo"
        style={{ width: '100%', padding: 10 }}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ padding: 0 }}>
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        listStyle: 'none',
                        margin: '10px 0',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#f9f9f9',
                      }}
                    >
                      <TodoItem
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={handleClearCompleted} style={{ marginTop: 20 }}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoApp;
