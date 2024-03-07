import axios from "axios";

export const fetchUserRole = async (url, userData) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(userData?.jwt && { Authorization: `Bearer ${userData?.jwt}` }),
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
