import React, { useState } from 'react';

export function Details({ accountObj, deleteHandler }) {
  const [showIP, setShowIP] = useState(false);
  const deleteAccount = () => {
    deleteHandler(accountObj.id);
  };
  return (
    <>
      {Object.keys(accountObj).length > 0 ? (
        <div>
          <p>
            {`${accountObj.nameFirst} ${accountObj.nameLast}`}
            <button onClick={deleteAccount}>delete</button>
          </p>
          <p>{accountObj.email}</p>
          <button onClick={() => setShowIP(!showIP)}>
            {`${showIP ? 'hide' : 'show'} ip`}
          </button>
          {showIP && <span>{accountObj.ip}</span>}
        </div>
      ) : (
        <p>No account displayed.</p>
      )}
    </>
  );
}
