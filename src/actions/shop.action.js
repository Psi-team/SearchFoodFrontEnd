import { shopService, externalService } from '../services';
import { validator } from '../helpers/validator';
import { history } from '../helpers/history';

export const shopActions = {
  getCounty,
  getDistrict,
  getStoreType,
  postStoreData,
  searchStoreData,
};

const GET_COUNTY_REQUEST = 'GET_COUNTY_REQUEST';
const GET_COUNTY_SUCCESS = 'GET_COUNTY_SUCCESS';
const GET_COUNTY_FAILURE = 'GET_COUNTY_FAILURE';
const GET_DISTRICT_REQUEST = 'GET_DISTRICT_REQUEST';
const GET_DISTRICT_SUCCESS = 'GET_DISTRICT_SUCCESS';
const GET_DISTRICT_FAILURE = 'GET_DISTRICT_FAILURE';
const GET_STORE_TYPE_REQUEST = 'GET_STORE_TYPE_REQUEST';
const GET_STORE_TYPE_SUCCESS = 'GET_STORE_TYPE_SUCCESS';
const GET_STORE_TYPE_FAILURE = 'GET_STORE_TYPE_FAILURE';
const CREATE_STORE_REQUEST = 'CREATE_STORE_REQUEST';
const CREATE_STORE_SUCCESS = 'CREATE_STORE_SUCCESS';
const CREATE_STORE_FAILURE = 'CREATE_STORE_FAILURE';
const SEARCH_STORE_REQUEST = 'SEARCH_STORE_REQUEST';
const SEARCH_STORE_SUCCESS = 'SEARCH_STORE_SUCCESS';
const SEARCH_STORE_FAILURE = 'CREATE_STORE_FAILURE';

function getCounty() {
  return dispatch => {
    dispatch({ type: GET_COUNTY_REQUEST });
    externalService.getCounty().then(
      data => dispatch({ type: GET_COUNTY_SUCCESS, county: data.countyItem }),
      error => dispatch({ type: GET_COUNTY_FAILURE, error })
    );
  };
}

function getDistrict(cityId) {
  return dispatch => {
    dispatch({ type: GET_DISTRICT_REQUEST });
    externalService.getDistrict(cityId).then(
      data => dispatch({ type: GET_DISTRICT_SUCCESS, district: data.townItem }),
      error => dispatch({ type: GET_DISTRICT_FAILURE, error })
    );
  };
}

function getStoreType() {
  return dispatch => {
    dispatch({ type: GET_STORE_TYPE_REQUEST });
    shopService.getStoreType().then(
      data => dispatch({ type: GET_STORE_TYPE_SUCCESS, storeType: data.data }),
      error => dispatch({ type: GET_STORE_TYPE_FAILURE, error })
    );
  };
}

function postStoreData(data) {
  try {
    validator({ type: 'createStore', data });
    return dispatch => {
      dispatch({ type: CREATE_STORE_REQUEST });
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
          error =>
            dispatch({
              type: CREATE_STORE_FAILURE,
              error: error.response.data.message,
            })
        );
    };
  } catch ({ message }) {
    return { type: CREATE_STORE_FAILURE, error: message };
  }
}

function searchStoreData(data) {
  return dispatch => {
    dispatch({ type: SEARCH_STORE_REQUEST });
    shopService.searchStore(data).then(
      data => {
        dispatch({ type: SEARCH_STORE_SUCCESS, list: data.data });
      },
      error =>
        dispatch({
          type: SEARCH_STORE_FAILURE,
          error: error.response.data.message,
        })
    );
  };
}
