import sectionData from "../data/roles-section-data";
import ROLES_DATA from "../data/rolesAndPermissions";

const INITIAL_STATE = {
  isFetching: false,
  sections: sectionData,
  users: ROLES_DATA,
};

export const reducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...previousState,
        isFetching: action.isFetching,
      };
    case "SET_ERROR":
      return {
        ...previousState,
        error: action.error,
        isFetching: false,
      };
    case "GET_API_REQUEST":
      return {
        ...previousState,
        ...action.hash,
        isFetching: false,
      };
    case "ADD_USER_ROLE":
      return {
        ...previousState,
        users: action.users,
        actions: action.sections,
        permission: action.permission,
      };
    case "UPDATE_USER_ROLE":
      return {
        ...previousState,
        users: action.users,
      };
    case "ADD_ROLE_ACTION":
      return {
        ...previousState,
        sections: action.sections,
      };
    default:
      return previousState;
  }
};
