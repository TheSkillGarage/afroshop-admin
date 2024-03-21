import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AFROADMIN_TOKEN } from "./constants";
import axios from "axios";

// Set a cookie that expires in 3 hours
const expirationTimeInMinutes = 3 * 60;
export const expirationDate = new Date(
  new Date().getTime() + expirationTimeInMinutes * 60 * 1000
);

export const setCookieWithExpiry = (value) =>
  Cookies.set(AFROADMIN_TOKEN, value, {
    expires: expirationDate,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

export const getTokenFromCookie = () => Cookies.get(AFROADMIN_TOKEN);

export const removeTokenFromCookie = () =>
  Cookies.remove(AFROADMIN_TOKEN, { path: "/" });

export const handleAvatarSubmit = async (image, id) => {
  if (image?.length === 0) {
    toast.error("File is required*", {
      hideProgressBar: true,
    });
    return;
  }
  toast.info(`⏳ uploading image.....`, { autoClose: 2000 });
  try {
    const files = new FormData();
    files.append("files", image);
    files.append("storeId", `${id}`);

    const {
      data,
    } = await axios.post(`/upload`, files, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getTokenFromCookie()}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("error uploading image")
    console.log({ error });
  }
};
