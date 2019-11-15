import { apiGetStoreType, apiCreateStore } from '../apis';

export const shopService = { getStoreType, createStore };

function getStoreType() {
  return apiGetStoreType();
}

function createStore(data) {
  return apiCreateStore(data);
}