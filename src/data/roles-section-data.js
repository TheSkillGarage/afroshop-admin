const actions = {
  create: false,
  edit: false,
  view: false,
  delete: false,
};

const sectionData = [
  {
    value: false,
    label: "Overview",
    action: actions,
  },
  {
    value: false,
    label: "Orders",
    action: actions,
  },
  {
    value: false,
    label: "Products",
    action: actions,
  },
  {
    value: false,
    label: "Payments",
    action: actions,
  },
  {
    value: false,
    label: "Profile",
    action: actions,
  },
  {
    value: false,
    label: "Roles & Permissions",
    action: actions,
  },
  {
    value: false,
    label: "Support",
    action: actions,
  },
];

export default sectionData;
