import React, { useState, useEffect, useRef } from 'react';

export function Searchbar({ accountNames, getAccountDetails }) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const inputHandler = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setValue('');
    inputRef.current.value = '';
    getAccountDetails(value);
  };

  return (
    <form onSubmit={submitHandler}>
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
      <input type="submit" disabled={!value.length > 0} value="display" />
    </form>
  );
}
