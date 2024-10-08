import { Progress } from 'flowbite-react';
import { useAppSelector } from '../hooks/store';
import { selectTodos } from '../store/todos/reducer';

const TodoCounter = () => {
  const todos = useAppSelector(selectTodos);
  if (!todos) {
    return <div>Cargando...</div>;
  }

  const completed = todos.filter((todo) => todo.status === 'completed').length;
  const total = todos.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex flex-col py-6">
      <Progress
        progress={percentage}
        textLabel={`Has completado ${completed} de ${total} TODOs`}
        textLabelPosition="outside"
        size="md"
        labelText
        color="dark"
      />
    </div>
  );
};

export default TodoCounter;
