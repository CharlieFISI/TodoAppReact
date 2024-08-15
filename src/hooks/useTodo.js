import {
  getTodosAsync,
  addTodoAsync,
  addTodoAction,
  editTodoAsync,
  editTodoAction,
  statusTodoChangeAsync,
  statusTodoChangeAction,
  deleteTodoAsync,
  deleteTodoAction,
  searchTodosAction,
  filterTodosStatusAction
} from '../store/todos/reducer';
import { useAppDispatch } from './store';

export const useTodo = () => {
  const dispatch = useAppDispatch();

  const getTodos = async () => {
    const resultAction = await dispatch(getTodosAsync()).unwrap();
    if (resultAction === 'error') {
      return alert('Error al obtener las tareas');
    }
  };

  const addTodo = async (description, priority) => {
    const resultAction = await dispatch(
      addTodoAsync({ description, priority })
    ).unwrap();
    if (resultAction === 'error') {
      return alert('Error al editar la tarea');
    }
    dispatch(addTodoAction({ description, priority }));
  };

  const editTodo = async (id, description, priority) => {
    const resultAction = await dispatch(
      editTodoAsync({ id, description, priority })
    ).unwrap();
    if (resultAction === 'error') {
      return alert('Error al editar la tarea');
    }
    dispatch(editTodoAction({ id, description, priority }));
  };

  const statusChangeTodo = async (id, status) => {
    const resultAction = await dispatch(
      statusTodoChangeAsync({ id, status })
    ).unwrap();
    if (resultAction === 'error') {
      return alert('Error al cambiar el estado de la tarea');
    }
    dispatch(statusTodoChangeAction({ id, status }));
  };

  const deleteTodo = async (id) => {
    const resultAction = await dispatch(deleteTodoAsync(id)).unwrap();
    if (resultAction === 'error') {
      return alert('Error al eliminar la tarea');
    }
    dispatch(deleteTodoAction(id));
  };

  const searchTodos = async (search) => {
    dispatch(searchTodosAction(search));
  };

  const filterTodosStatus = async (status) => {
    dispatch(filterTodosStatusAction(status));
  };

  return {
    getTodos,
    addTodo,
    editTodo,
    statusChangeTodo,
    deleteTodo,
    searchTodos,
    filterTodosStatus
  };
};
