import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ToDoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchToDoItem(id);
    }
  }, [id]);

  const fetchToDoItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8093/api/todos/getToDoItemById/${id}`);
      const todo = response.data;
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed);
    } catch (error) {
      console.error('Error fetching To-Do item:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newToDo = {
      title,
      description,
      completed,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:8093/api/todos/editToDoItem/${id}`, newToDo);
      } else {
        await axios.post('http://localhost:8093/api/todos/saveToDoItem', newToDo);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving To-Do item:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? 'Edit To-Do' : 'Create New To-Do'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"> 
          <label className="form-label">Title  </label> 
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          /><br/>
        </div><br/>
        <div className="mb-3">
          <label className="form-label">Description  </label> 
          <textarea
            className="form-control" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div><br/>
        <div className="mb-3 form-check"> 
          <input
            type="checkbox"
            className="form-check-input" 
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label className="form-check-label">Completed  </label> 
        </div><br/>
        <button type="submit" className="btn btn-primary"> 
          Submit
        </button>
      </form>
    </div>
  );
};

export default ToDoForm;
