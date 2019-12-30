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
} from '../constants';

export const storeType = (state = { loading: false, types: {} }, action) => {
  switch (action.type) {
    case GET_STORETYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STORETYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        types: action.payload,
      };
    case GET_STORETYPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createStore = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case CREATE_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchStores = (
  state = { loading: false, stores: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: action.payload,
      };
    case SEARCH_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const storeDetail = (state = { loading: false, store: {} }, action) => {
  switch (action.type) {
    case FETCH_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        store: action.payload,
      };
    case FETCH_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createMessage = (state = { loading: false }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_STORE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
