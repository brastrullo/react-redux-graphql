import React, { useState } from 'react';

export function Searchbar({ accountNames, getAccountDetails }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const DISABLED = !value.length > 0;

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
    <form
      onSubmit={submitHandler}
      className="flex max-w-sm my-2 mx-auto align-items"
    >
      <label htmlFor="account" className="text-xs flex my-auto">
        Select account:
      </label>
      <input
        list="account-names"
        type="text"
        name="account"
        value={value}
        onChange={inputHandler}
        className="border-b-2 border-gray-200"
      />
      {accountNames && (
        <datalist id="account-names">
          {accountNames.map((obj, i) => (
            <option key={`acc${i}`} value={obj.name} />
          ))}
        </datalist>
      )}
      <input
        type="submit"
        disabled={DISABLED}
        value="select"
        className={
          'text-white text-bold bg-blue-600 text-xs m-1 p-2 disabled:opacity-50'
        }
      />
      {error && <p>{error}</p>}
    </form>
  );
}
