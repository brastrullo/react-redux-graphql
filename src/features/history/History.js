import React from 'react';

export function History({ viewedAccounts, getAccountDetails }) {
  const reviewAccount = (e) => {
    getAccountDetails(e.target.dataset.id);
  };
  return (
    <>
      <p>Last viewed accounts:</p>
      {viewedAccounts.slice(1, 4).map((el, i) => (
        <button
          key={`lva${i}`}
          onClick={reviewAccount}
          data-id={el.id}
          className="text-sm text-blue-600 underline mx-1"
        >
          {`${el.nameFirst} ${el.nameLast}`}
        </button>
      ))}
    </>
  );
}
