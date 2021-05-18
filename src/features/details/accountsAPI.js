export function fetchAccounts() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: ['Mike', 'Greg', 'Bob', 'Sue'] }), 500)
  );
}
