import React from 'react';

export function History({ viewedAccounts, getAccountDetails }) {
  const reviewAccount = (e) => {
    getAccountDetails(e.target.innerText);
  };
  return (
    <>
      <p>Last viewed accounts:</p>
      {
        viewedAccounts.slice(1, 4).map((el, i) => (
          <button key={`lva${i}`} onClick={reviewAccount}>
            {el}
          </button>
        ))
      }
    </>
  );
}
