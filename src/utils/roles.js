
export const getRoles = (role) => {
  console.log(role);
  switch (role) {
    case "admin":
      return "Admin";
    case "super_admin":
      return "Super Admin";
  }
};
export const getPermissionCount = (sections) => {
  let count = 0;
  sections.map((c) =>
    c?.value === true
      ? Object.values(c?.action).map((v) => (v === true ? count+=1 : count))
      : count
  );

  return count;
};
