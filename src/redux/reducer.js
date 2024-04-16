import {
  deliveryData,
  holidayMockData,
  profileInitialState,
} from "../data/profile";
import sectionData from "../data/roles-section-data";


const PRIVATE_INITIAL_STATE = {
  productsData: null,
  storeData: null,
  ordersData: null,
  userStore: {},
  store: {},
  addresses: [],
  roles: [],
  isAuthenticated: false,
  storeExists: null,
  user: null,
};

const INITIAL_STATE = {
  ...PRIVATE_INITIAL_STATE,
  loadingStates: null,
  isFetching: false,
  sections: sectionData,
  delivery: deliveryData,
  holidays: holidayMockData,
  profile: profileInitialState,
  isSidebarToggled: false,
};

export const reducer = (previousState = INITIAL_STATE, action) => { 
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...previousState,
        isFetching: action.isFetching,
      };
    case "API_REQUEST_START":
      return {
        ...previousState,
        loadingStates: {
          ...previousState.loadingStates,
          [action.payload]: true, // Set loading state to true for the requestId
        },
      };
    case "API_REQUEST_SUCCESS":
    case "API_REQUEST_FAILURE":
      return {
        ...previousState,
        loadingStates: {
          ...previousState.loadingStates,
          [action.payload]: false, // Set loading state to false for the requestId
        },
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
    case "SET_STORE_EXIST":
      return {
        ...previousState,
        storeExists: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...previousState,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOG_OUT":
      return {
        ...previousState,
        ...PRIVATE_INITIAL_STATE,
      };
    case "UPDATE_USER":
      return {
        ...previousState,
        user: action.payload,
      };
    case "UPDATE_PROFILE_INFO":
      return {
        ...previousState,
        profile: action.profile,
      };
    case "UPDATE_STORE":
      return {
        ...previousState,
        store: action.payload,
      };
    case "UPDATE_STORE_1":
      return {
        ...previousState,
        store: action.payload,
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
      };
    case "ADD_PRODUCT":
      const id = (Math.floor(Math.random() * 900000) + 100000).toString();

      const newProductObj = {
        id: id,
        SKU: id,
        dateAdded: new Date(),
        status: action.status,
        ...action.productInfo,
        draft: {},
      };

      const updatedProductsArray = [
        newProductObj,
        ...previousState.productsData,
      ];

      return {
        ...previousState,
        productsData: updatedProductsArray,
      };
    case "EDIT_PRODUCT":
      const updatedProductData = previousState.productsData.map((product) => {
        if (product.SKU === action.sku) {
          switch (action.option) {
            case "draft":
              return {
                ...product,
                draft: action.productInfos,
                lastEdited: new Date(),
              };
            default:
              return {
                ...product,
                ...action.productInfos,
                draft: {},
                lastEdited: new Date(),
              };
          }
        }
        return product;
      });
      return {
        ...previousState,
        productsData: updatedProductData,
      };
    case "DISCARD_DRAFT":
      const updateProductDraft = previousState.productsData.map((product) => {
        if (product.SKU === action.sku) {
          return {
            ...product,
            draft: {},
            lastEdited: new Date(),
          };
        }
        return product;
      });
      return {
        ...previousState,
        productsData: updateProductDraft,
      };
    case "RESET_STORE":
      return INITIAL_STATE;
    default:
      return previousState;
  }
};
