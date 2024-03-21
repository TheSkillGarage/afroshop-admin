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

export const PasswordStrengthCheck = (password) => {
  const passwordStrength = {
    "1-upper-case-character": /[A-Z]/.test(password),
    "1-special-character": /[^a-zA-Z0-9]/.test(password),
    "8-characters": password.length >= 8,
}
 const criteriaCount = Object.values(passwordStrength).filter(Boolean).length;
 return {criteriaCount, passwordStrength};
}
