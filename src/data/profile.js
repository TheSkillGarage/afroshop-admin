import { ProfileImage } from "../images";

const daysOfTheWeek = [
  { label: "Sun", value: "sunday" },
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thur", value: "thursday" },
  { label: "Fri", value: "friday" },
  { label: "Sat", value: "saturday" },
];
const deliveryOptions = [
  { value: "pickUp", label: "Pick-Up" },
  { value: "delivery", label: "Delivery" },
];
const destinationOptions = [
  {
    label: "Within 5km",
    value: "Within 5km",
  },
  {
    label: "Between 5 to 10km",
    value: "Between 5 to 10km",
  },
  {
    label: "Between 10 to 15km",
    value: "Between 10 to 15km",
  },
  {
    label: "Between 15 to 20km",
    value: "Between 15 to 20km",
  },
  {
    label: "Over 20km",
    value: "Over 20km",
  },
];
export const pricingTypeOptions = [
  {
    label: 'per KG',
    value: 'per KG',
  },
  {
    label: 'per Lb',
    value: 'per Lb',
  },
  {
    label: 'per G',
    value: 'per g',
  },
  {
    label: 'per Dz',
    value: 'per Dz',
  },
]
const deliveryData = [
  // {
  //   label: "Within 5 km",
  //   value: "$15",
  // },
  // {
  //   label: "Between 5 to 10 km",
  //   value: "$20",
  // },
  // {
  //   label: "Between 10 to 15 km",
  //   value: "$25",
  // },
];
const holidayMockData = [
  // {
  //   label: "New Year",
  //   value: "Sun, Jan 1, 2023",
  // },
  // {
  //   label: "Good Friday",
  //   value: "Fri, Apr 7, 2023",
  // },
  // {
  //   label: "Easter Monday",
  //   value: "Mon, Apr 10, 2023",
  // },
];

const holidayOptions = [
  {
    label: "New Year",
    value: "New Year",
  },
  {
    label: "Good Friday",
    value: "Good Friday",
  },
  {
    label: "Easter Monday",
    value: "Easter Monday",
  },
  {
    label: "Victoria Day",
    value: "Victoria Day",
  },
  {
    label: "Jean-Baptiste Day",
    value: "Jean-Baptiste Day",
  },
  {
    label: "Canada Day",
    value: "Canada Day",
  },
];

const deliveryStartTimes = [
  {
    label: "8:00AM",
    value: "8:00AM",
  },
  {
    label: "9:00AM",
    value: "9:00AM",
  },
  {
    label: "10:00AM",
    value: "10:00AM",
  },
  {
    label: "11:00AM",
    value: "11:00AM",
  },
  {
    label: "12:00PM",
    value: "12:00PM",
  },
];
const deliveryEndTimes = [
  {
    label: "7:00PM",
    value: "7:00PM",
  },
  {
    label: "8:00PM",
    value: "8:00PM",
  },
  {
    label: "9:00PM",
    value: "9:00PM",
  },
  {
    label: "10:00PM",
    value: "10:00PM",
  },
  {
    label: "11:00PM",
    value: "11:00PM",
  },
];
const deliverySlots = [
  { label: "6 Hours", value: 6 },
  { label: "8 Hours", value: 8 },
  { label: "10 Hours", value: 10 },
  { label: "Next Day", value: 24 },
];
const restPeriods = [
  { label: "1 Hours", value: 1 },
  { label: "2 Hours", value: 2 },
  { label: "3 Hours", value: 3 },
  { label: "4 Hours", value: 4 },
];
const storeInitialState = {
  days: [],
  profile_image: null,
  profile_image_data: null,
  store_name: "",
  address: "",
  email: "",
  deliveryOption: [],
  openingTime: "",
  closingTime: "",
  deliveryStartTime: "",
  deliveryEndTime: "",
  deliverySlot: "",
  restPeriod: "",
  country: "",
  postal_code: "",
  state: "",
  city: "",
};
const profileInitialState = {
  store: storeInitialState,
  delivery: deliveryData,
  holidays: holidayMockData,
};

export {
  daysOfTheWeek,
  deliveryEndTimes,
  deliveryOptions,
  deliverySlots,
  deliveryStartTimes,
  destinationOptions,
  deliveryData,
  holidayMockData,
  holidayOptions,
  storeInitialState,
  profileInitialState,
  restPeriods
};
