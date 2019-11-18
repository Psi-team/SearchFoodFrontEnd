const initState = { county: [], district: [] };

export const county = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COUNTY_SUCCESS':
      return {
        county: action.county,
        district: [],
      };
    case 'GET_COUNTY_FAILURE':
    case 'GET_DISTRICT_FAILURE':
    case 'GET_LAT_LONG_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    case 'GET_DISTRICT_SUCCESS':
      return {
        ...state,
        district: action.district,
      };
    case 'GET_LAT_LONG_SUCCESS':
      return {
        ...state,
        latLong: action.latLong,
      };
    default:
      return state;
  }
};

export const storeType = (state = {}, action) => {
  switch (action.type) {
    case 'GET_STORE_TYPE_SUCCESS':
      return {
        ...action.storeType,
      };
    case 'GET_STORE_TYPE_FAILURE':
      return {
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
