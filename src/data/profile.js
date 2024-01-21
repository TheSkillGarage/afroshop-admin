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
  { value: "pickup", label: "Pick-Up" },
  { value: "delivery", label: "Delivery" },
];
const destinationOptions = [
  {
    label: "Within 5 km",
    value: "Within 5 km",
  },
  {
    label: "Between 5 to 10 km",
    value: "Between 5 to 10 km",
  },
  {
    label: "Between 10 to 15 km",
    value: "Between 10 to 15 km",
  },
  {
    label: "Between 15 to 20 km",
    value: "Between 15 to 20 km",
  },
  {
    label: "Over 20 km",
    value: "Over 20 km",
  },
];
const deliveryData = [
  {
    label: "Within 5 km",
    value: "$15",
  },
  {
    label: "Between 5 to 10 km",
    value: "$20",
  },
  {
    label: "Between 10 to 15 km",
    value: "$25",
  },
];
const holidayMockData = [
  {
    label: "New Year",
    value: "Sun, Jan 1, 2023",
  },
  {
    label: "Good Friday",
    value: "Fri, Apr 7, 2023",
  },
  {
    label: "Easter Monday",
    value: "Mon, Apr 10, 2023",
  },
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
  { label: "1 Hours", value: "1 Hours" },
  { label: "2 Hours", value: "2 Hours" },
  { label: "3 Hours", value: "3 Hours" },
  { label: "4 Hours", value: "4 Hours" },
];
const storeInitialState = {
  days: [],
  profile_image: ProfileImage,
  profile_image_data: null,
  store_name: "Green Ranger",
  address: "No 3 Crimson Drive, CA",
  email: "greenranger@gmail.com",
  deliveryOption: [deliveryOptions[0], deliveryOptions[1]],
  deliveryStartTime: "10:00AM",
  deliveryEndTime: "9:00PM",
  deliverySlot: "2 Hours",
  restPeriod: "1 Hours",
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
};
