import {
  apiGetStoreType,
  apiCreateStore,
  apiGetStores,
  apiGetStore,
  apiLeaveMessage,
} from '../helpers/apis';

import Datas from '../models/datas';

const fakeData = Datas();

export const shopService = {
  getStoreType,
  createStore,
  searchStore,
  fetchStore,
  createMessage,
};

function getStoreType() {
  // return apiGetStoreType();
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve({ data: fakeData.getStoreTypes });
    }, 1000);
  });
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
  // return apiGetStores(encodeData);
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve({ data: fakeData.search });
    }, 2000);
  });
}

function fetchStore(data) {
  // return apiGetStore({ store_id: data });
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve({ data: fakeData.storeDetail });
    }, 2000);
  });
}

function createMessage(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (key === 'pic') {
      formData.append(`${key}[]`, val);
    } else {
      formData.append(key, val);
    }
  });
  return apiLeaveMessage(formData);
}
