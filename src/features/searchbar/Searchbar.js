import React, { useState, useEffect } from 'react';

export function Searchbar({ accountNames, getAccountDetails }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const DISABLED = !value.length > 0;
  useEffect(() => {
    console.log({ value });
  }, [value]);

  const inputHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    setError('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValue('');
    const id = accountNames.find((obj) => obj.name === value)?.id;
    if (!id) {
      setError('Account not found');
    }
    getAccountDetails(id);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="account">Choose an account:</label>
      <input
        list="account-names"
        type="text"
        name="account"
        value={value}
        onChange={inputHandler}
      />
      {accountNames && (
        <datalist id="account-names">
          {accountNames.map((obj, i) => (
            <option key={`acc${i}`} value={obj.name} />
          ))}
        </datalist>
      )}
      <input type="submit" disabled={DISABLED} value="display" />
      {error && <p>{error}</p>}
    </form>
  );
}
