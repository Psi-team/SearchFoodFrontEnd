export const shopService = { getStoreType };

function getStoreType() {
  return fetch('http://localhost:3001/storeType')
    .then(res => res.json());
}