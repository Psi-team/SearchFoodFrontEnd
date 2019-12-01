import { apiGetStoreType, apiCreateStore, apiGetStores } from '../helpers/apis';

export const shopService = { getStoreType, createStore, searchStore };

function getStoreType() {
  return apiGetStoreType();
}

function createStore(data) {
  return apiCreateStore(data);
}

function searchStore(data) {
  // 中文亂碼，因此先進行encode，再由後端decode
  const encodeData = {
    foodType: encodeURI(data.foodType),
    city: encodeURI(data.city),
    district: encodeURI(data.district),
  };
  return apiGetStores(encodeData);
}
