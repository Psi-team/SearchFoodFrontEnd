import { apiGetStoreType } from '../apis';

export const shopService = { getStoreType };

function getStoreType() {
  return apiGetStoreType();
}