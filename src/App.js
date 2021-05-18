import React, { useEffect, useState } from 'react';
import './App.css';
import { Searchbar } from './features/searchbar/Searchbar';
import { Details } from './features/details/Details';
import { History } from './features/history/History';

function App() {
  const [accountObj, setAccountObj] = useState(null);
  const [viewedAccounts, setViewedAccounts]  = useState([]);
  const [accountNames, setAccountNames] = useState(null);

  useEffect(() => {
    setAccountNames(['Mike', 'Greg', 'Bob', "Sue"]);
  }, []);
  useEffect(() => {
    if (accountObj) console.log(accountObj.name);
  }, [accountObj]);
  useEffect(() => {
    console.log(viewedAccounts)
  }, [viewedAccounts]);

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
      <Details accountObj={accountObj} />
      <History viewedAccounts={viewedAccounts}  />
    </div>
  );
}

export default App;
