import React from 'react';

export function Details({ accountObj, deleteAccount }) {
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
