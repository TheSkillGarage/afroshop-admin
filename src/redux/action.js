import axios from "axios";
import { renderValidUrl } from "../utils/constants";

export const fetchData = async (dispatch, url, type) => {
  dispatch({ type: "SET_IS_FETCHING", isFetching: true });

  try {
    const { data } = await axios.get(url);
    dispatch({ type: "GET_API_REQUEST", hash: { [type]: data } });
  } catch (error) {
    dispatch({ type: "SET_ERROR", error });
  }
};

export const addActionRole = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_ROLE_ACTION",
    ...hash,
  });
};
export const updateProfile = (hash) => (dispatch) => {
  dispatch({
    type: "UPDATE_PROFILE_INFO",
    ...hash
  })
};
export const addUserRole = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_USER_ROLE",
    ...hash,
  });
};
export const addDeliveryData = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_DELIVERY_DATA",
    ...hash,
  });
};
export const addHolidayData = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_HOLIDAY_DATA",
    ...hash,
  });
};


export const updateUserRole = (hash) => (dispatch) => {
  dispatch({
    type: "UPDATE_USER_ROLE",
    ...hash,
  });
};

export const sidebarToggle = (hash) => dispatch => {
  dispatch({
    type: 'SIDEBAR_TOGGLE',
    ...hash,
  });
};

export const editProduct = (hash) => dispatch => {
  dispatch({
    type: 'EDIT_PRODUCT',
    ...hash,
  });
};
export const draftProductInfo = (hash) => dispatch => {
  dispatch({
    type: 'DRAFT_PRODUCT_INFO',
    ...hash,
  });
};
export const deleteDraftProductInfo = (hash) => dispatch => {
  dispatch({
    type: 'DELETE_DRAFT_PRODUCT_INFO',
    ...hash,
  })
}


export const postRequest = (url, data) => {
  return fetch(renderValidUrl(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      return [true, responseData];
    })
    .catch((error) => {
      console.error("Error:", error);
      return [false, error];
    });
};
