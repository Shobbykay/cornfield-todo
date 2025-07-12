import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoApp from './TodoApp';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
    <nav style={{ padding: 10 }}>
      <Link to="/">Home</Link> | <Link to="/todos">Todos</Link>
    </nav>

    <Routes>
      <Route path="/" element={<h2>Welcome to the App</h2>} />
      <Route path="/todos" element={<TodoApp />} />
    </Routes>
  </Router>
  );
}

export default App;
