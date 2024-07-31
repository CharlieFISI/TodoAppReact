import { useState, useEffect } from 'react';
import { getData } from '../data';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const result = await getData();
    if (result !== 'error') {
      setTodos(result.data);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          description={todo.description}
          status={todo.status}
          onStatusChange={handleStatusChange}
        />
      ))}
    </ul>
  );
};

export default TodoList;
