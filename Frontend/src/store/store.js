import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});



export default store;
