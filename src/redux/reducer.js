import PRODUCT_DATA from "../data/products";
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
  roles: [],
  delivery: deliveryData,
  holidays: holidayMockData,
  profile: profileInitialState,
  isSidebarToggled: false,
  productsData: PRODUCT_DATA,
  draftProductInfo: [],
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
    case 'ADD_PRODUCT':
      const id = (Math.floor(Math.random() * 900000) + 100000).toString();
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear()).slice(2);

      const newProductObj = {
        id: id,
        SKU: id,
        dateAdded: `${day}/${month}/${year}`,
        status: action.status,
        ...action.productInfo,
      }

      const updatedProductsArray = [newProductObj, ...previousState.productsData];

      return {
        ...previousState,
        productsData: updatedProductsArray,
      }
    case "EDIT_PRODUCT":
      const updatedProductData = previousState.productsData.map(product => {
        if (product.SKU === action.sku) {
          return {
            ...product,
            ...action.productInfos
          };
        }
        return product;
      });
      return {
        ...previousState,
        productsData: updatedProductData,
      }
    case "DRAFT_PRODUCT_INFO":
      const { sku, productInfo } = action;
      const draftProductIndex = previousState.draftProductInfo.findIndex(product => product.sku === sku);

      if (draftProductIndex !== -1) {
        const updatedDrafts = [...previousState.draftProductInfo];
        updatedDrafts[draftProductIndex] = { sku, ...productInfo };

        return {
          ...previousState,
          draftProductInfo: updatedDrafts,
        };
      } else {
        const newDraft = { sku, ...productInfo };
        return {
          ...previousState,
          draftProductInfo: [...previousState.draftProductInfo, newDraft],
        };
      }
    case "DELETE_DRAFT_PRODUCT_INFO":
      const updatedDrafts = previousState.draftProductInfo.filter(product => product.sku !== action.sku);
      return {
        ...previousState,
        draftProductInfo: updatedDrafts,
      };
    default:
      return previousState;
  }
};
