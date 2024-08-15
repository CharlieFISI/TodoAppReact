import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import {
  getData,
  updateData,
  updateDataStatus,
  createData,
  deleteData
} from '../../utilities/data';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await getData();
    if (res === 'error') {
      return alert('Error fetching data');
    }
    return res;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async ({ description, priority }) => {
    const res = await createData(description, priority);
    if (res === 'error') {
      return alert('Error creating todo');
    }
    return res;
  }
);

export const editTodoAsync = createAsyncThunk(
  'todos/editTodoAsync',
  async ({ id, description, priority }) => {
    const res = await updateData(id, description, priority);
    if (res === 'error') {
      return alert('Error updating todo');
    }
    return res;
  }
);

export const statusTodoChangeAsync = createAsyncThunk(
  'todos/statusTodoChangeAsync',
  async ({ id, status }) => {
    const res = await updateDataStatus(id, status);
    if (res === 'error') {
      return alert('Error updating status');
    }
    return res;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id) => {
    const res = await deleteData(id);
    if (res === 'error') {
      return alert('Error deleting todo');
    }
    return res;
  }
);

const initialState = {
  todos: [],
  status: 'idle',
  error: null
};

export const todoReducer = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodoAction: (state, action) => {
      const newTodo = { id: nanoid(), ...action.payload };
      state.todos = [...state.todos, newTodo];
    },
    editTodoAction: (state, action) => {
      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (existingTodo) {
        existingTodo.description = action.payload.description;
        existingTodo.priority = action.payload.priority;
      }
    },
    statusTodoChangeAction: (state, action) => {
      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (existingTodo) {
        existingTodo.status = action.payload.status;
      }
    },
    deleteTodoAction: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    reorderTodosAction: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      state.todos = arrayMove(state.todos, oldIndex, newIndex);
    },
    searchTodosAction: (state, action) => {
      return !action.payload
        ? state
        : state.filter((todo) =>
            todo.description
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          );
    },
    filterTodosStatusAction: (state, action) => {
      return state.filter((todo) => todo.status === action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Error updating todo');
          console.log(action.payload);
          return;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Error deleting todo');
          console.log(action.payload);
          return;
        }
      });
  }
});

export const selectTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;
export const getTodosError = (state) => state.todos.error;

export default todoReducer.reducer;
export const {
  getTodosAction,
  addTodoAction,
  editTodoAction,
  statusTodoChangeAction,
  deleteTodoAction,
  reorderTodosAction,
  searchTodosAction,
  filterTodosStatusAction
} = todoReducer.actions;
