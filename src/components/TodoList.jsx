import TodoItem from './TodoItem';
import {
  SortableContext,
  verticalListSortingStrategy,
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
import { useAppDispatch, useAppSelector } from '../hooks/store';
import {
  selectTodos,
  getTodosStatus,
  getTodosError,
  getTodosAsync,
  reorderTodosAction
} from '../store/todos/reducer';
import { useEffect } from 'react';

const TodoList = () => {
  const todosStatus = useAppSelector(getTodosStatus);
  const error = useAppSelector(getTodosError);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(getTodosAsync());
    }
  }, [todosStatus, dispatch]);

  let content;
  if (todosStatus === 'loading') {
    content = <div>Cargando...</div>;
  } else if (todosStatus === 'succeeded') {
    content = todos.map((todo) => <TodoItem key={todo.id} {...todo} />);
  } else if (todosStatus === 'failed') {
    content = <div>Error: {error}</div>;
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      dispatch(reorderTodosAction({ oldIndex, newIndex }));
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
        <div className="flex flex-col touch-pan-y snap-y snap-mandatory scrollbar">
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {content}
          </SortableContext>
        </div>
      ) : (
        <div className="text-center text-gray-500">No hay tareas</div>
      )}
    </DndContext>
  );
};

export default TodoList;
