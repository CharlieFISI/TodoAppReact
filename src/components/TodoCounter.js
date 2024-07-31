import { useState, useEffect } from 'react';
import { Progress } from 'flowbite-react';
import { getData } from '../data';

const TodoCounter = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getData();
      if (result !== 'error') {
        setTodos(result.data);
      }
      setLoading(false);
    };

    fetchTodos();
  }, []);

  if (loading) {
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
