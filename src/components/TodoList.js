import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => {
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
