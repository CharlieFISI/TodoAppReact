import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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

const filterAndSearchTodos = (
  todos,
  searchQuery,
  statusFilter,
  priorityFilter
) => {
  return todos.filter((todo) => {
    const matchesSearch = searchQuery
      ? todo.description.includes(searchQuery)
      : true;
    const matchesStatus =
      statusFilter !== 'all' ? todo.status === statusFilter : true;
    const matchesPriority =
      priorityFilter !== 'all' ? todo.priority === priorityFilter : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });
};

const initialState = {
  todos: [],
  todosFilter: [],
  isSearchActive: false,
  isFilterStatusActive: false,
  isFilterPriorityActive: false,
  status: 'idle',
  error: null
};

export const todoReducer = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodoAction: (state, action) => {
      const newTodo = { ...action.payload };
      if (state.isSearchActive || state.isFilterStatusActive)
        state.todosFilter = [...state.todosFilter, newTodo];
      state.todos = [...state.todos, newTodo];
    },
    editTodoAction: (state, action) => {
      const updateTodo = (todo) => {
        todo.description = action.payload.description;
        todo.priority = action.payload.priority;
      };

      if (state.isSearchActive || state.isFilterStatusActive) {
        const existingTodoFilter = state.todosFilter.find(
          (todo) => todo.id === action.payload.id
        );
        if (existingTodoFilter) {
          updateTodo(existingTodoFilter);
        }
      }

      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (existingTodo) {
        updateTodo(existingTodo);
      }
    },
    statusTodoChangeAction: (state, action) => {
      const updateTodo = (todo) => {
        todo.status = action.payload.status;
      };

      if (state.isSearchActive || state.isFilterStatusActive) {
        const existingTodoFilter = state.todosFilter.find(
          (todo) => todo.id === action.payload.id
        );
        if (existingTodoFilter) {
          updateTodo(existingTodoFilter);
        }
      }

      const existingTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (existingTodo) {
        updateTodo(existingTodo);
      }
    },
    deleteTodoAction: (state, action) => {
      if (state.isSearchActive || state.isFilterStatusActive) {
        state.todosFilter = state.todosFilter.filter(
          (todo) => todo.id !== action.payload
        );
      }
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    reorderTodosAction: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      state.isSearchActive || state.isFilterStatusActive
        ? (state.todosFilter = arrayMove(state.todosFilter, oldIndex, newIndex))
        : (state.todos = arrayMove(state.todos, oldIndex, newIndex));
    },
    searchTodosAction: (state, action) => {
      state.isSearchActive = !!action.payload;
      state.searchQuery = action.payload;
      state.todosFilter = filterAndSearchTodos(
        state.todos,
        action.payload,
        state.isFilterStatusActive ? state.statusFilter : 'all',
        state.isFilterPriorityActive ? state.priorityFilter : 'all'
      );
    },
    filterTodosStatusAction: (state, action) => {
      state.isFilterStatusActive = action.payload !== 'all';
      state.statusFilter = action.payload;
      state.todosFilter = filterAndSearchTodos(
        state.todos,
        state.isSearchActive ? state.searchQuery : '',
        action.payload,
        state.isFilterPriorityActive ? state.priorityFilter : 'all'
      );
    },
    filterTodosPriorityAction: (state, action) => {
      state.isFilterPriorityActive = action.payload !== 'all';
      state.priorityFilter = action.payload;
      state.todosFilter = filterAndSearchTodos(
        state.todos,
        state.isSearchActive ? state.searchQuery : '',
        state.isFilterStatusActive ? state.statusFilter : 'all',
        action.payload
      );
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
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Error creating todo');
          console.log(action.payload);
          return;
        }
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Error updating todo');
          console.log(action.payload);
          return;
        }
      })
      .addCase(statusTodoChangeAsync.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log('Error updating status');
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

export const selectTodos = (state) =>
  state.todos.isSearchActive ||
  state.todos.isFilterStatusActive ||
  state.todos.isFilterPriorityActive
    ? state.todos.todosFilter
    : state.todos.todos;
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
  filterTodosStatusAction,
  filterTodosPriorityAction
} = todoReducer.actions;
