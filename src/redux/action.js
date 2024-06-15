import axios from "axios";
import { renderValidUrl } from "../utils/constants";
import { getTokenFromCookie } from "../utils";
import { toast } from "react-toastify";

export const userLogin = (user) => (dispatch) => {
  dispatch({
    type: "LOGIN_USER",
    payload: user,
  });
};
export const updateStore = (store) => (dispatch) => {
  dispatch({
    type: "UPDATE_STORE",
    payload: store,
  });
};
export const logOutUser = () => (dispatch) => {
  dispatch({
    type: "LOG_OUT",
  });
};
export const setStoreExistStatus = (value) => (dispatch) => {
  dispatch({
    type: "SET_STORE_EXIST",
    payload: value,
  });
};
export const fetchData = async (dispatch, url, type, token) => {
  dispatch({ type: "API_REQUEST_START", payload: type });
  try {
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    dispatch({ type: "API_REQUEST_SUCCESS", payload: type });
    dispatch({ type: "GET_API_REQUEST", hash: { [type]: data } });
  } catch (error) {
    dispatch({ type: "API_REQUEST_FAILURE", payload: type, error });
  } 
};

export const deleteRequest = async (url, token) => {
  try {
    const response = await fetch(renderValidUrl(url), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return [true, responseData];
  } catch (error) {
    console.error("Error:", error);
    return [false, error];
  }
};

export const updateUser = (user) => dispatch => {
  dispatch({
    type: 'UPDATE_USER',
    payload: user,
  })
}

export const addActionRole = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_ROLE_ACTION",
    ...hash,
  });
};

export const addUserRole = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_USER_ROLE",
    ...hash,
  });
};

export const handleAvatarSubmit = async (image, id) => {
  if (image?.length === 0) {
    toast.error("File is required*", {
      hideProgressBar: true,
    });
    return;
  }
  try {
    const files = new FormData();
    files.append("files", image);
    files.append("storeId", `${id}`);
    const { data } = await axios.post(`/upload`, files, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });
    if (!data) {
      throw new Error("error uploading image");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserRole = (hash) => (dispatch) => {
  dispatch({
    type: "UPDATE_USER_ROLE",
    ...hash,
  });
};

export const sidebarToggle = (hash) => (dispatch) => {
  dispatch({
    type: "SIDEBAR_TOGGLE",
    ...hash,
  });
};

export const addProduct = (hash) => (dispatch) => {
  dispatch({
    type: "ADD_PRODUCT",
    ...hash,
  });
};

export const editProduct = (productsData) => (dispatch) => {
  dispatch({
    type: "EDIT_PRODUCT",
    payload: productsData
  });
};

export const editProductAsDraft = (productsData) => (dispatch) => {
  dispatch({
    type: "EDIT_PRODUCT_AS_DRAFT",
    payload: productsData
  });
};

export const discardDraft = (hash) => (dispatch) => {
  dispatch({
    type: "RESET_STORE",
  });
};

export const getStoreData = (userID, token) => async (dispatch) => {
  await fetchData(dispatch, `stores/${userID}`, "store", token);
};

export const getProductData = (storeID, token) => async (dispatch) => {
  await fetchData(
    dispatch,
    `products?storeID=${storeID}`,
    "productsData",
    token
  );
};

export const getOrdersData = (storeID, token) => async (dispatch) => {
  await fetchData(dispatch, `orders?storeID=${storeID}`, "ordersData", token);
};

export const postRequest = (url, data, token = null) => {
  return fetch(renderValidUrl(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      ...(token && { Authorization: `Bearer ${token}` }),
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return [true, responseData];
  } catch (error) {
    console.error("Error:", error);
    return [false, error];
  }
};

export const handleImageUpload = async (images, collectionName, id = null) => {
  if (!images || images.length === 0) {
    throw new Error("Files are required!")
  }

  const token = getTokenFromCookie();
  const uploadConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const uploadedImageIds = [];

  try {
    for (const image of images) {
      const formData = new FormData();
      formData.append("files", image);
      formData.append("field", "images");

      if (id) {
        formData.append("ref", collectionName);
        formData.append("refId", `${id}`);
      }

      const { data } = await axios.post(`/upload`, formData, uploadConfig);
      if (!data || !data[0] || !data[0].id) {
        throw new Error("Error uploading image");
      }
      uploadedImageIds.push(data[0].id);
    }

    return [true, uploadedImageIds];
  } catch (error) {
    console.error("Error uploading images:", error);
    return [false, error];
  }
};