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
  const ACCOUNTS_CONNECTED = Object.keys(accounts).length > 0;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDatalist());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <p>
        Accounts Ready: <span>{`${ACCOUNTS_CONNECTED}`}</span>
      </p>
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
