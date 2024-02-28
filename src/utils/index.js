import Cookies from 'js-cookies'
import { AFROADMIN_TOKEN } from './constants';

  // Set a cookie that expires in 3 hours
  const expirationTimeInMinutes = 3 * 60;
  export const expirationDate = new Date(new Date().getTime() + (expirationTimeInMinutes * 60 * 1000));
  
  export const setCookieWithExpiry = (value) => Cookies.set(AFROADMIN_TOKEN , value, { expires: expirationDate, path: "/", secure: process.env.NODE_ENV === "production" });
  
  export const getTokenFromCookie = () =>  Cookies.get(AFROADMIN_TOKEN );
  
  export const removeTokenFromCookie = () => Cookies.remove(AFROADMIN_TOKEN  , { path: '/' })