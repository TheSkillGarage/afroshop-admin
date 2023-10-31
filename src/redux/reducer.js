
const INITIAL_STATE = {
  isFetching: false,
}


export const reducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_IS_FETCHING':
      return {
        ...previousState,
        isFetching: action.isFetching
      };
    case 'SET_ERROR':
      return {
        ...previousState,
        error: action.error,
        isFetching: false
      };
    case 'GET_API_REQUEST':
      return {
        ...previousState,
        ...action.hash,
        isFetching: false
      }
    default:
      return previousState;
  }
}