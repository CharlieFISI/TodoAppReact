import TodoCounter from './components/TodoCounter';
import TodoContent from './components/TodoContent';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import CreateTodoButton from './components/CreateTodoButton';
import TodoNav from './components/TodoNav';
import TodoBackground from './components/TodoBackground';
import { getData } from './data';
import { useState, useEffect } from 'react';

function App() {
  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      if (result && result.data) {
        setTodoTasks(result.data);
      } else {
        console.error('No data found');
      }
    };
    fetchData();
  }, []);
  return (
    <TodoBackground>
      <TodoNav />
      <TodoContent>
        <TodoCounter todos={todoTasks} />
        <TodoList>
          {todoTasks.map((todo) => (
            <TodoItem
              key={todo.id}
              description={todo.description}
              status={todo.status}
            />
          ))}
        </TodoList>
      </TodoContent>
      <CreateTodoButton />
    </TodoBackground>
  );
}

export default App;
