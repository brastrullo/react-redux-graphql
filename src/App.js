import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const [accountDisplayed, setAccountDisplayed] = useState(null);
  const [viewedAccounts, setViewedAccounts]  = useState([]);
  const [accountNames, setAccountNames] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    console.log({value})
  }, [value])
  useEffect(() => {
    setAccountNames(['Mike', 'Greg', 'Bob', "Sue"]);
  }, []);
  useEffect(() => {
    if (accountDisplayed) console.log(accountDisplayed.name)
  }, [accountDisplayed]);
  useEffect(() => {
    console.log(viewedAccounts)
  }, [viewedAccounts]);
  const inputHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  }
  const getAccountDetails = (e) => {
    e.preventDefault();
    setValue("");
    inputRef.current.value="";
    showAccountDetails();
  };
  const getAccountData = (name) => ({
    name,
    email: `${name}@gmail.com`
  })
  const showAccountDetails = () => {
    const obj = getAccountData(value)
    const accountName = obj.name;
    setAccountDisplayed(obj);
    if (viewedAccounts[0] === accountName) return
    setViewedAccounts(accounts => [...new Set([accountName, ...accounts])])
  }
  const reviewAccount = (e) => {
    console.log(e.target.innerText)
  }
  return (
    <div className="App">
      <form onSubmit={getAccountDetails}>
        <label htmlFor="account">Choose an account:</label>
        <input
          ref={inputRef}
          list="account-names"
          type="text"
          name="account"
          onChange={inputHandler}
        />
        {accountNames && (
          <datalist id="account-names">
            {accountNames.map((val, i) => (
              <option key={`acc${i}`} value={val} />
            ))}
          </datalist>
        )}
        <input type="submit" disabled={!value.length > 0} value="display"/>
      </form>
      { accountDisplayed ?
        <div>
          <p>{accountDisplayed.name}</p>
          <p>{accountDisplayed.email}</p>
        </div>
        : <p>No account displayed.</p>
      } 
      <div>
        <p>Last viewed accounts:</p>
        { viewedAccounts.length > 0 ?
          (
            viewedAccounts.slice(1, 4).map((el, i) => 
              <span key={`lva${i}`} onClick={reviewAccount}>{el}</span>
            )
          ) : <span> No accounts viewed yet.</span>
        }
      </div>
    </div>
  );
}

export default App;
