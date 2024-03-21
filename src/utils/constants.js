import Cookies from "js-cookie";
export const BACKEND_URL = process.env.REACT_APP_API_URL.replace('/api', '')

export const AFROADMIN_TOKEN = 'afroadmin-auth-token'

export const renderValidUrl = (url) => {
  if (url?.startsWith('http://') || url?.startsWith('https://') ||  url?.includes('http://')) {
    // Absolute URL, return as is
    return url;
  } else {
    // Relative URL, append backendUrl
    return BACKEND_URL + url;
  }
}; 
export const getCookieFromToken = () => Cookies.get(AFROADMIN_TOKEN);
