import TodoCounter from './components/TodoCounter';
import TodoContent from './components/TodoContent';
import TodoList from './components/TodoList';
import CreateTodoButton from './components/CreateTodoButton';
import TodoNav from './components/TodoNav';
import TodoBackground from './components/TodoBackground';
import { getData } from './data';
import { useState, useEffect } from 'react';

function App() {
  const [todoTasks, setTodoTasks] = useState([]);

  const fetchData = async () => {
    const result = await getData();
    if (result === 'error') {
      console.error('No data found');
    }
    setTodoTasks(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TodoBackground>
      <TodoNav />
      <TodoContent>
        <TodoCounter todos={todoTasks} />
        <TodoList todos={todoTasks} setTodos={setTodoTasks} />
      </TodoContent>
      <CreateTodoButton setTodos={setTodoTasks} fetchData={fetchData} />
    </TodoBackground>
  );
}

export default App;
