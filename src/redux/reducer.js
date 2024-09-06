import sectionData from "../data/roles-section-data";

const PRIVATE_INITIAL_STATE = {
  productsData: null,
  ordersData: null,
  storeID: 0,
  stores: null,
  addresses: [],
  roles: [],
  isAuthenticated: false,
  storeExists: null,
  loadingStates: null,
  user: null,
  productDrafts: [],
  productCategories: []
};

const INITIAL_STATE = {
  ...PRIVATE_INITIAL_STATE,
  sections: sectionData,
  isSidebarToggled: false,
};

export const reducer = (previousState = INITIAL_STATE, action) => {
  switch (action.type) {
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
      if (action.error) {
        console.error(action.error);
      }
      return {
        ...previousState,
        loadingStates: {
          ...previousState.loadingStates,
          [action.payload]: false, // Set loading state to false for the requestId
        },
      };
    case "GET_API_REQUEST":
      return {
        ...previousState,
        ...action.hash,
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
    case "UPDATE_STORES":
      return {
        ...previousState,
        stores: action.payload,
      };
    case "SET_STORE_ID":
      return {
        ...previousState,
        storeID: action.payload,
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
    case "EDIT_PRODUCT":
      return {
        ...previousState,
        productsData: action.payload,
      };
    case "EDIT_PRODUCT_AS_DRAFT":
      return {
        ...previousState,
        productDrafts: action.payload
      };
    case "RESET_STORE":
      return INITIAL_STATE;
    default:
      return previousState;
  }
};
