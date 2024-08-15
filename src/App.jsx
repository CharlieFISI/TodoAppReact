import TodoCounter from './components/TodoCounter';
import TodoContent from './components/TodoContent';
import TodoList from './components/TodoList';
import CreateTodoButton from './components/CreateTodoButton';
import TodoNav from './components/TodoNav';
import TodoBackground from './components/TodoBackground';

function App() {
  return (
    <TodoBackground>
      <TodoNav />
      <TodoContent>
        <TodoCounter />
        <TodoList />
      </TodoContent>
      <CreateTodoButton />
    </TodoBackground>
  );
}

export default App;
