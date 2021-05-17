import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [accountDisplayed, setAccountDisplayed] = useState(null);
  const [selectedAccount, setSelectedAccount]  = useState(null);
  const [viewedAccounts, setViewedAccounts]  = useState([]);
  const [accountNames, setAccountNames] = useState(null);
  useEffect(() => {
    setAccountNames(['Jim', 'Tim', 'Kim']);
  }, []);
  useEffect(() => {
    console.log({selectedAccount})
  }, [selectedAccount]);
  const onBlurHandler = (e) => {
    e.preventDefault();
    setSelectedAccount(e.target.value);
  }
  const getAccountDetails = (e) => {
    e.preventDefault();
    showAccountDetails();
  };
  const showAccountDetails = () => {
    const getAccountData = (name) => ({
      name,
      email: `${name}@gmail.com`
    })
    const obj = getAccountData(selectedAccount)
    setAccountDisplayed(obj);
    if (selectedAccount !== null) {
      setViewedAccounts(accounts => [...accounts, selectedAccount])
    }
  }
  return (
    <div className="App">
      <div>
        <label htmlFor="account">Choose an account:</label>
        <input
          list="account-names"
          type="text"
          name="account"
          onBlur={onBlurHandler}
        />
        {accountNames && (
          <datalist id="account-names">
            {accountNames.map((val, i) => (
              <option key={`acc${i}`} value={val} />
            ))}
          </datalist>
        )}
        <button onClick={getAccountDetails}>select</button>
      </div>
      { accountDisplayed &&
        <div>
          <p>{accountDisplayed.name}</p>
          <p>{accountDisplayed.email}</p>
        </div>
      }
      <div> 
        <p>Last viewed accounts:</p>
        {
          viewedAccounts.map((el, i) => 
            <span key={`lva${i}`}>{el}</span>
          )
        }
      </div>
    </div>
  );
}

export default App;
