import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../store/todos/reducer';

const localStorageMiddleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem('__todos__items__', JSON.stringify(store.getState()));
};

export const store = configureStore({
  reducer: {
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});
