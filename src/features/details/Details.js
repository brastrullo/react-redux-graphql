import React from 'react';

export function Details({ accountObj, deleteHandler }) {
  const deleteAccount = () => {
    deleteHandler(accountObj.name);
  };
  return (
    <>
      {accountObj ? (
        <div>
          <p>
            {accountObj.name} <button onClick={deleteAccount}>delete</button>
          </p>
          <p>{accountObj.email}</p>
        </div>
      ) : (
        <p>No account displayed.</p>
      )}
    </>
  );
}
