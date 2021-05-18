import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAccounts } from './accountsAPI';

const initialState = {
  data: [],
  status: 'idle',
};

export const getAccounts = createAsyncThunk(
  'counter/fetchAccounts',
  async () => {
    const response = await fetchAccounts();
    console.log({  response  });
    return response.data;
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    deleteAccount: (state, action) => {
      console.log({ state, action });
      state.data = state.data.filter(
        (accountName) => accountName !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      });
  },
});

export const { deleteAccount } = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.data;

export default accountsSlice.reducer;
