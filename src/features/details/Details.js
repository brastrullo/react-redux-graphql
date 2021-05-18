import React, { useState } from 'react';

export function Details({ accountObj, deleteHandler }) {
  const [showIP, setShowIP] = useState(false);
  const deleteAccount = () => {
    deleteHandler(accountObj.id);
  };
  return (
    <>
      {Object.keys(accountObj).length > 0 ? (
        <div className="bg-gray-100 max-w-lg mx-auto my-8 rounded-lg p-4">
          <p className="flex justify-center align-items">
            <span className="text-4xl text-blue-900 font-bold">{`${accountObj.nameFirst} ${accountObj.nameLast}`}</span>
            <button
              onClick={deleteAccount}
              title="delete account"
              className="m-2 text-red-600"
            >
              x
            </button>
          </p>
          <p className="text-lg">{accountObj.email}</p>
          <div className="mt-4">
            <p className="p-0 text-gray-800 text-sm">
              {showIP ? accountObj.ip : 'ip:hidden'}
            </p>
            <button
              onClick={() => setShowIP(!showIP)}
              className="bg-gray-700 text-white text-xs py-0 px-1 rounded-sm"
            >
              {`${showIP ? 'hide' : 'show'} ip`}
            </button>
          </div>
        </div>
      ) : (
        <p>No account displayed.</p>
      )}
    </>
  );
}
