import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAccount,
  getDatalist,
  deleteAccount,
  selectAccounts,
  selectAccountObj,
} from './features/details/accountsSlice';
import './App.css';
import { Searchbar } from './features/searchbar/Searchbar';
import { Details } from './features/details/Details';
import { History } from './features/history/History';

function App() {
  const accounts = useSelector(selectAccounts);
  const accountObj = useSelector(selectAccountObj);
  const dispatch = useDispatch();
  // const [accountObj, setAccountObj] = useState({});
  const [viewedAccounts, setViewedAccounts] = useState([]);
  useEffect(() => {
    dispatch(getDatalist());
  }, []);
  useEffect(() => {
    if (Object.keys(accountObj) > 0) console.log(accountObj.name);
  }, [accountObj]);
  useEffect(() => {
    console.log({ viewedAccounts });
  }, [viewedAccounts]);

  const deleteHandler = (account) => {
    dispatch(deleteAccount(account));
    // setAccountObj({});
  };

  const getAccountDetails = (id) => {
    dispatch(getAccount(id));
    console.log({accountObj})
    updateHistory();
  };

  const updateHistory = () => {
    console.log({ accountObj, viewedAccounts });
    if (viewedAccounts.length > 0 && (viewedAccounts[0].id === accountObj.id)) return;
    setViewedAccounts((accounts) => [...new Set([accountObj, ...accounts])]);
  };

  return (
    <div className="App">
      <Searchbar
        accountNames={accounts}
        getAccountDetails={getAccountDetails}
      />
      <Details accountObj={accountObj} deleteHandler={deleteHandler} />
      {viewedAccounts.length > 0 && (
        <History
          viewedAccounts={viewedAccounts}
          getAccountDetails={getAccountDetails}
        />
      )}
    </div>
  );
}

export default App;
