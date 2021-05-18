import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDatalist, fetchAccount } from './accountsAPI';

const initialState = {
  data: [],
  obj: {},
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
      state.data = state.data.filter(
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
        state.data = action.payload;
      })
      .addCase(getAccount.pending, (state) => {
        state.status = 'loading';
        console.log(state.status);
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(state.status);
        state.obj = action.payload;
      });
  },
});

export const { deleteAccount } = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts.data;
export const selectAccountObj = (state) => state.accounts.obj;

export default accountsSlice.reducer;
