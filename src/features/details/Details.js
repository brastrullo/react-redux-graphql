import React from 'react';

export function Details({ accountObj }) {
  return (
    <>
      {accountObj ? (
        <div>
          <p>{accountObj.name}</p>
          <p>{accountObj.email}</p>
        </div>
      ) : (
        <p>No account displayed.</p>
      )}
    </>
  );
}
