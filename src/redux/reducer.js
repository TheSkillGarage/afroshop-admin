import {
  deliveryData,
  holidayMockData,
  profileInitialState,
} from "../data/profile";
import sectionData from "../data/roles-section-data";
import ROLES_DATA from "../data/rolesAndPermissions";


const INITIAL_STATE = {
  isFetching: false,
  sections: sectionData,
  roles: ROLES_DATA,
  delivery: deliveryData,
  holidays: holidayMockData,
  profile: profileInitialState,
  users: ROLES_DATA,
  isSidebarToggled: false,
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
    case "UPDATE_PROFILE_INFO":
      return {
        ...previousState,
        profile: action.profile,
      };
    case "ADD_DELIVERY_DATA":
      return {
        ...previousState,
        delivery: action.delivery,
      };

    case "ADD_HOLIDAY_DATA":
      return {
        ...previousState,
        holidays: action.holidays,
      };
    case "ADD_USER_ROLE":
      return {
        ...previousState,
        users: action.roles,
        actions: action.sections,
        permission: action.permission,
      };
    case "UPDATE_USER_ROLE":
      return {
        ...previousState,
        roles: action.roles,
      };
    case "ADD_ROLE_ACTION":
      return {
        ...previousState,
        sections: action.sections,
      };
    case "SIDEBAR_TOGGLE":
      return {
        ...previousState,
        isSidebarToggled: !action.toggle,
      }
    default:
      return previousState;
  }
};
