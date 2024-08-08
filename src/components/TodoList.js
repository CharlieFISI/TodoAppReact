import TodoItem from './TodoItem';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers';

const TodoList = ({ todos = [], setTodos = () => {} }) => {
  const handleEditToDo = (id, newDescription, newPriority) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, description: newDescription, priority: newPriority }
          : todo
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      setTodos((prevTodos) => {
        const firstId = prevTodos.findIndex((todo) => todo.id === active.id);
        const secondId = prevTodos.findIndex((todo) => todo.id === over.id);
        return arrayMove(todos, firstId, secondId);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
    >
      {todos.length > 0 ? (
        <div className="max-h-screen touch-pan-y snap-y snap-mandatory scrollbar">
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
                onEdit={handleEditToDo}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </SortableContext>
        </div>
      ) : (
        <div className="text-center text-gray-500">No hay tareas</div>
      )}
    </DndContext>
  );
};

export default TodoList;
