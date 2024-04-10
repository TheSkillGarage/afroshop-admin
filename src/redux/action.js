import axios from "axios";
import { renderValidUrl } from "../utils/constants";

export const fetchData = async (dispatch, url, type, token) => {
  dispatch({ type: 'SET_IS_FETCHING', isFetching: true });

  try {
    const { data } = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });
    dispatch({ type: 'GET_API_REQUEST', hash: { [type]: data } });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', error });
  }
};

export const deleteRequest = async (url, token) => {
  try {
    const response = await fetch(renderValidUrl(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return [true, responseData];
  } catch (error) {
    console.error('Error:', error);
    return [false, error];
  }
};

export const userLogin = (user) => dispatch => {
  dispatch({
    type: 'LOGIN_USER',
    payload: user,
  });
};

export const logOutUser = () => dispatch => {
  dispatch({
    type: 'LOG_OUT',
  });
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

export const addProduct = (hash) => dispatch => {
  dispatch({
    type: 'ADD_PRODUCT',
    ...hash,
  })
}

export const editProduct = (hash) => dispatch => {
  dispatch({
    type: 'EDIT_PRODUCT',
    ...hash,
  });
};

export const discardDraft = (hash) => dispatch => {
  dispatch({
    type: 'DISCARD_DRAFT',
    ...hash,
  })
}

export const getStoreData = (userID, token) => async (dispatch) => {
  await fetchData(dispatch, `stores/${userID}`, 'storeData', token);
}

export const getProductData = (storeID, token) => async (dispatch) => {
  await fetchData(dispatch, `products?storeID=${storeID}`, 'productsData', token);
}

export const getOrdersData = (storeID, token) => async (dispatch) => {
  await fetchData(dispatch, `orders?storeID=${storeID}`, 'ordersData', token);
}

export const resetStore = () => dispatch => {
  dispatch({
    type: 'RESET_STORE',
  })
}


export const postRequest = (url, data, token = null) => {
  return fetch(renderValidUrl(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      return [true, responseData];
    })
    .catch((error) => {
      //console.error("Error:", error);
      return [false, error];
    });
};

export const putRequest = async (url, data, token = null) => {
  try {
    const response = await fetch(renderValidUrl(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return [true, responseData];
  } catch (error) {
    console.error('Error:', error);
    return [false, error];
  }
};
