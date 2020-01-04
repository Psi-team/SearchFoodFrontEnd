import {
  GET_COUNTY_SUCCESS,
  GET_COUNTY_FAILURE,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAILURE,
} from '../constants';

export const externalInfo = (state = { county: [], district: [] }, action) => {
  switch (action.type) {
    case GET_COUNTY_SUCCESS:
      return {
        ...state,
        county: action.payload,
      };
    case GET_DISTRICT_SUCCESS:
      return {
        ...state,
        district: action.payload,
      };
    case GET_COUNTY_FAILURE:
    case GET_DISTRICT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
