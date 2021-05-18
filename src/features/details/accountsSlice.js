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
    console.log({ response });
    return response;
  }
);
export const getAccount = createAsyncThunk(
  'counter/fetchAccount',
  async (id) => {
    const response = await fetchAccount(id);
    // const transformData = await response.map((el) => ({
    //   id: el.id,
    //   name: `${el.nameFirst} ${el.nameLast}`,
    //   email: el.email,
    //   ip: el.ip,
    // }));
    console.log('asdf', { response });
    return response;
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    deleteAccount: (state, action) => {
      console.log({ state, action });
      state.names = state.names.filter(
        (accountName) => accountName !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDatalist.pending, (state) => {
        state.status = 'loading';
        console.log(state.status);
      })
      .addCase(getDatalist.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(state.status);
        state.names = action.payload;
      })
      .addCase(getAccount.pending, (state) => {
        state.status = 'loading';
        console.log(state.status);
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(state.status);
        state.obj = action.payload;
        if (
          state.history.length > 0 &&
          state.history[0].id === action.payload.id
        )
          return;
        state.history = [...new Set([action.payload, ...state.history])];
      });
  },
});

export const { deleteAccount } = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.names;
export const selectAccountObj = (state) => state.accounts.obj;
export const selectHistory = (state) => state.accounts.history;

export default accountsSlice.reducer;
