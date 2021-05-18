import React from 'react';

export function History({ viewedAccounts }) {
  const reviewAccount = (e) => {
    console.log(e.target.innerText);
  };
  return (
    <div>
      <p>Last viewed accounts:</p>
      {viewedAccounts.length > 0 ? (
        viewedAccounts.slice(1, 4).map((el, i) => (
          <span key={`lva${i}`} onClick={reviewAccount}>
            {el}
          </span>
        ))
      ) : (
        <span> No accounts viewed yet.</span>
      )}
    </div>
  );
}
