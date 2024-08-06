import { closestCenter, DndContext } from '@dnd-kit/core';
import TodoItem from './TodoItem';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';

const TodoList = ({ todos = [], setTodos = () => {} }) => {
  const handleStatusChange = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    setTodos((prevTodos) => {
      const firstId = prevTodos.findIndex((todo) => todo.id === active.id);
      const secondId = prevTodos.findIndex((todo) => todo.id === over.id);
      const newOrder = arrayMove(todos, firstId, secondId);
      return newOrder;
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            description={todo.description}
            status={todo.status}
            priority={todo.priority}
            onStatusChange={handleStatusChange}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
