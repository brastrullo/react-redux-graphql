import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAccount,
  getDatalist,
  deleteAccount,
  selectAccounts,
  selectAccountObj,
  selectHistory,
} from './features/details/accountsSlice';
import './App.css';
import { Searchbar } from './features/searchbar/Searchbar';
import { Details } from './features/details/Details';
import { History } from './features/history/History';

function App() {
  const accounts = useSelector(selectAccounts);
  const accountObj = useSelector(selectAccountObj);
  const history = useSelector(selectHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatalist());
  }, []);
  useEffect(() => {
    if (Object.keys(accountObj) > 0) console.log(accountObj.name);
  }, [accountObj]);

  const deleteHandler = (account) => {
    dispatch(deleteAccount(account));
  };

  const getAccountDetails = (id) => {
    dispatch(getAccount(id));
  };

  return (
    <div className="App">
      <Searchbar
        accountNames={accounts}
        getAccountDetails={getAccountDetails}
      />
      <Details accountObj={accountObj} deleteHandler={deleteHandler} />
      {history.length > 0 && (
        <History
          viewedAccounts={history}
          getAccountDetails={getAccountDetails}
        />
      )}
    </div>
  );
}

export default App;
