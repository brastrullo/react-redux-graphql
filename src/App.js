import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAccount,
  selectAccounts,
} from './features/details/accountsSlice';
import './App.css';
import { Searchbar } from './features/searchbar/Searchbar';
import { Details } from './features/details/Details';
import { History } from './features/history/History';

function App() {
  const accounts = useSelector(selectAccounts);
  const dispatch = useDispatch();
  const [accountObj, setAccountObj] = useState(null);
  const [viewedAccounts, setViewedAccounts]  = useState([]);
  const [accountNames, setAccountNames] = useState(null);

  useEffect(() => {
    setAccountNames(accounts);
  }, [accounts]);
  useEffect(() => {
    if (accountObj) console.log(accountObj.name);
  }, [accountObj]);
  useEffect(() => {
    console.log(viewedAccounts)
  }, [viewedAccounts]);

  const deleteHandler = () => {
    dispatch(deleteAccount());
    setAccountObj(null);
  };

  const getAccountDetails = (value) => {
    const obj = getAccountData(value);
    const account = obj.name;
    setAccountObj(obj);
    updateHistory(account);
  };

  const getAccountData = (name) => ({
    name,
    email: `${name}@gmail.com`,
  });

  const updateHistory = (account) => {
    if (viewedAccounts[0] === account) return;
    setViewedAccounts((accounts) => [...new Set([account, ...accounts])]);
  };

  return (
    <div className="App">
      <Searchbar
        accountNames={accountNames}
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
