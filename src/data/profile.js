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
  { value: "pick-up", label: "Pick-Up" },
  { value: "delivery", label: "Delivery" },
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
  { label: "1 Hours", value: "1" },
  { label: "2 Hours", value: "2" },
  { label: "3 Hours", value: "3" },
  { label: "4 Hours", value: "4" },
];

export {
  daysOfTheWeek,
  deliveryEndTimes,
  deliveryOptions,
  deliverySlots,
  deliveryStartTimes,
};
