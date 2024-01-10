let count = 0;
export const getRoles = (role) => {
  console.log(role);
  switch (role) {
    case "admin":
      return "Admin";
    case "super_admin":
      return "Super Admin";
  }
};
export const getPermissionCount = (actions) => {
  Object.values(actions).map((c) => (c === true ? count+=1 : count));
  console.log(count)

  // return count;
};
