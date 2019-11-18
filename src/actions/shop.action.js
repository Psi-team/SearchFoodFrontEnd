import { shopService, externalService } from '../services';
import { validator } from '../helpers/validator';
import { history } from '../helpers/history';

export const shopActions = {
  getCountry,
  getDistrict,
  getStoreType,
  createStore,
};

const GET_COUNTY_SUCCESS = 'GET_COUNTY_SUCCESS';
const GET_COUNTY_FAILURE = 'GET_COUNTY_FAILURE';
const GET_DISTRICT_SUCCESS = 'GET_DISTRICT_SUCCESS';
const GET_DISTRICT_FAILURE = 'GET_DISTRICT_FAILURE';
const GET_STORE_TYPE_SUCCESS = 'GET_STORE_TYPE_SUCCESS';
const GET_STORE_TYPE_FAILURE = 'GET_STORE_TYPE_FAILURE';
const CREATE_STORE_REQUEST = 'CREATE_STORE_REQUEST';
const CREATE_STORE_SUCCESS = 'CREATE_STORE_SUCCESS';
const CREATE_STORE_FAILURE = 'CREATE_STORE_FAILURE';

function getCountry() {
  return dispatch => {
    externalService.getCounty().then(
      data => dispatch({ type: GET_COUNTY_SUCCESS, county: data.countyItem }),
      error => dispatch({ type: GET_COUNTY_FAILURE, error })
    );
  };
}

function getDistrict(cityId) {
  return dispatch => {
    externalService.getDistrict(cityId).then(
      data => dispatch({ type: GET_DISTRICT_SUCCESS, district: data.townItem }),
      error => dispatch({ type: GET_DISTRICT_FAILURE, error })
    );
  };
}

function getStoreType() {
  return dispatch => {
    shopService.getStoreType().then(
      data => dispatch({ type: GET_STORE_TYPE_SUCCESS, storeType: data.data }),
      error => dispatch({ type: GET_STORE_TYPE_FAILURE, error })
    );
  };
}

function createStore(data) {
  try {
    validator({ type: 'createStore', data });
    return dispatch => {
      dispatch({ type: CREATE_STORE_REQUEST });
      data['city'] = data['city'].split('-')[1];
      data['district'] = data['district'].join('');
      externalService
        .addressToLatLong(data.city + data.district + data.address)
        .then(
          latLong => shopService.createStore({ ...data, latLong }),
          error => dispatch({ type: CREATE_STORE_FAILURE, error })
        )
        .then(
          data => {
            // TODO: there are some problem in page transfer.
            history.push('/');
            dispatch({ type: CREATE_STORE_SUCCESS, store: data.data });
          },
          error => dispatch({ type: CREATE_STORE_FAILURE, error: error.response.data.message })
        );
    };
  } catch ({ message }) {
    return { type: CREATE_STORE_FAILURE, error: message };
  }
}
