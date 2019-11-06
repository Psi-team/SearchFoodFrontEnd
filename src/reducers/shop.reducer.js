const initState = { county: [], district: [] };

export const county = (state = initState, action) => {
  switch (action.type) {
    case 'GET_COUNTY_SUCCESS':
      return {
        county: action.county,
        district: []
      }
    case 'GET_COUNTY_FAILURE':
    case 'GET_DISTRICT_FAILURE':
    case 'GET_LAT_LONG_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'GET_DISTRICT_SUCCESS':
      return {
        ...state,
        district: action.district
      }
    case 'GET_LAT_LONG_SUCCESS':
      return {
        test: 'hello'
      }
    default:
      return state;
  }
}