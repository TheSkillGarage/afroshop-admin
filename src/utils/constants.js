export const BACKEND_URL = process.env.REACT_APP_API_URL.replace('/api', '')

export const renderValidUrl = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Absolute URL, return as is
    return url;
  } else {
    // Relative URL, append backendUrl
    return BACKEND_URL + url;
  }
};