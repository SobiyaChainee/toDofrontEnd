import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/create" element={<ToDoForm />} />
          <Route path="/edit/:id" element={<ToDoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
