import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8093/api/todos/getAllToDoItems');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching To-Dos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8093/api/todos/DeleteToDoItem/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting To-Do:', error);
    }
  };

  return (
    <div class="container mt-5"> 
      <h2 className="text-center">To-Do List</h2> 
      <table className="table table-striped table-bordered w-100"> 
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-warning me-2" 
                  onClick={() => navigate(`/edit/${todo.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/create')}
      >
        Create New To-Do
      </button>
    </div>
  );
};

export default ToDoList;
