const initState = {
  county: [],
  district: [],
  storeType: {},
  error: '',
  loading: false,
};

export const storeInfo = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COUNTY_REQUEST':
    case 'GET_STORE_TYPE_REQUEST':
    case 'GET_LAT_LONG_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_COUNTY_SUCCESS':
      return {
        ...state,
        loading: Object.keys(state.storeType).length === 0,
        county: action.county,
      };
    case 'GET_DISTRICT_SUCCESS':
      return {
        ...state,
        loading: false,
        district: action.district,
      };
    case 'GET_STORE_TYPE_SUCCESS':
      return {
        ...state,
        loading: state.county.length === 0,
        storeType: action.storeType,
      };
    case 'GET_LAT_LONG_SUCCESS':
      return {
        ...state,
        loading: false,
        latLong: action.latLong,
      };
    case 'GET_COUNTY_FAILURE':
    case 'GET_DISTRICT_FAILURE':
    case 'GET_STORE_TYPE_FAILURE':
    case 'GET_LAT_LONG_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const createStore = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_STORE_REQUEST':
      return {
        loading: true,
      };
    case 'CREATE_STORE_SUCCESS':
      return {
        store: action.store,
      };
    case 'CREATE_STORE_FAILURE':
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export const searchStore = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_STORE_REQUEST':
      return {
        loading: true,
      };
    case 'SEARCH_STORE_SUCCESS':
      return {
        loading: false,
        storeList: action.list,
      };
    case 'SEARCH_STORE_FAILURE':
      return {
        error: action.error,
      };
    default:
      return state;
  }
};
