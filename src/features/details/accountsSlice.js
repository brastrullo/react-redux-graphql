import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDatalist, fetchAccount } from './accountsAPI';

const initialState = {
  names: [],
  obj: {},
  history: [],
  status: 'idle',
};

export const getDatalist = createAsyncThunk(
  'counter/fetchDatalist',
  async () => {
    const response = await fetchDatalist();
    return response;
  }
);
export const getAccount = createAsyncThunk(
  'counter/fetchAccount',
  async (id) => {
    const response = await fetchAccount(id);
    return response;
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    deleteAccount: (state, action) => {
      state.obj = {};
      console.log(state.names, state.history);
      if (state.names.length > 0) {
        state.names = state.names.filter((obj) => obj.id !== action.payload.id);
      }
      if (state.history.length > 0) {
        state.history = state.history.filter(
          (obj) => obj.id !== action.payload.id
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDatalist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDatalist.fulfilled, (state, action) => {
        state.status = 'idle';
        state.names = action.payload;
      })
      .addCase(getAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.obj = action.payload;
        if (
          state.history.length > 0 &&
          state.history[0].id === action.payload.id
        )
          return;
        state.history = [
          action.payload,
          ...state.history.filter((obj) => obj.id !== action.payload.id),
        ];
      });
  },
});

export const { deleteAccount } = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.names;
export const selectAccountObj = (state) => state.accounts.obj;
export const selectHistory = (state) => state.accounts.history;

export default accountsSlice.reducer;
