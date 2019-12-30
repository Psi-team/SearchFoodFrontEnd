import { shopService, externalService } from '../../services';
import { validator } from '../../helpers/validator';
import {
  GET_STORETYPE_REQUEST,
  GET_STORETYPE_SUCCESS,
  GET_STORETYPE_FAILURE,
  CREATE_STORE_REQUEST,
  CREATE_STORE_SUCCESS,
  CREATE_STORE_FAILURE,
  SEARCH_STORE_REQUEST,
  SEARCH_STORE_SUCCESS,
  SEARCH_STORE_FAILURE,
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
} from '../constants';

export const shopActions = {
  getStoreType,
  createStore,
  searchStores,
  fetchStore,
  createMessage,
};

function getStoreType() {
  return dispatch => {
    dispatch({ type: GET_STORETYPE_REQUEST });
    shopService.getStoreType().then(
      data => dispatch({ type: GET_STORETYPE_SUCCESS, payload: data.data }),
      error => dispatch({ type: GET_STORETYPE_FAILURE, payload: error })
    );
  };
}

function createStore(data) {
  try {
    validator({ type: 'createStore', data });
    return dispatch => {
      dispatch({ type: CREATE_STORE_REQUEST });
      externalService
        .addressToLatLong(data.city + data.district + data.address)
        .then(
          latLong => shopService.createStore({ ...data, latLong }),
          error => dispatch({ type: CREATE_STORE_FAILURE, error })
        )
        .then(
          () => {
            dispatch({ type: CREATE_STORE_SUCCESS });
          },
          error =>
            dispatch({
              type: CREATE_STORE_FAILURE,
              error: error.response.data.message,
            })
        );
    };
  } catch ({ message }) {
    return { type: CREATE_STORE_FAILURE, payload: message };
  }
}

function searchStores(data) {
  return dispatch => {
    dispatch({ type: SEARCH_STORE_REQUEST });
    shopService.searchStore(data).then(
      data => {
        dispatch({ type: SEARCH_STORE_SUCCESS, payload: data.data });
      },
      error => {
        dispatch({
          type: SEARCH_STORE_FAILURE,
          payload: error.response.data.message,
        });
      }
    );
  };
}

function fetchStore(storeId) {
  return dispatch => {
    dispatch({ type: FETCH_STORE_REQUEST });
    shopService.fetchStore(storeId).then(
      data => {
        dispatch({ type: FETCH_STORE_SUCCESS, payload: data.data });
      },
      error => {
        dispatch({
          type: FETCH_STORE_FAILURE,
          payload: error.response.data.message,
        });
      }
    );
  };
}

function createMessage(data) {
  return dispatch => {
    dispatch({ type: CREATE_MESSAGE_REQUEST });
    shopService.createMessage(data).then(
      data => {
        dispatch({ type: CREATE_MESSAGE_SUCCESS });
        window.location.reload();
      },
      error => {
        dispatch({
          type: CREATE_MESSAGE_FAILURE,
          error: error.response.data.message,
        });
      }
    );
  };
}
