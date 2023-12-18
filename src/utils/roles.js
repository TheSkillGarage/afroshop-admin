export const getRoles = (role) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "super_admin":
      return "Super Admin";
  }
};
