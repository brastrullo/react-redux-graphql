import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../features/details/accountsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});
