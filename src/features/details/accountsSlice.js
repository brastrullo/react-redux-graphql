import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAccounts } from './accountsAPI';

const initialState = {
  data: [],
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchAccounts',
  async () => {
    const response = await fetchAccounts();
    return response.data;
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    deleteAccount: (state, action) => {
      state.data = state.data.filter(
        (accountName) => accountName !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { deleteAccount } = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.data;

export default accountsSlice.reducer;
