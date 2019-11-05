export const register = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return {
        loading: true
      }
    case 'REGISTER_SUCCESS':
      return {
        ...action.user
      }
    case 'REGISTER_FAILURE':
      return {
        error: action.error
      }
    default:
      return state;
  }
}