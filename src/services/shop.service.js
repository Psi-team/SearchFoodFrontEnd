import {
  apiGetStoreType,
  apiCreateStore,
  apiGetStores,
  apiGetStore,
  apiLeaveMessage,
} from '../helpers/apis';

export const shopService = {
  getStoreType,
  createStore,
  searchStore,
  fetchStore,
  createMessage,
};

function getStoreType() {
  return apiGetStoreType();
}

function createStore(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (typeof val === 'object' && !['logo', 'images'].includes(key)) {
      formData.append(key, JSON.stringify(val));
    } else {
      formData.append(key, val);
    }
  });

  return apiCreateStore(formData);
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

function fetchStore(data) {
  return apiGetStore({ store_id: data });
}

function createMessage(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    formData.append(key, val);
  });
  return apiLeaveMessage(formData);
}
