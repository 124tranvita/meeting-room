export enum Events {
  None,
  Init,
  Submit,
}

export enum BookingType {
  Internal = "I",
  External = "E",
}

export enum ConfirmStatus {
  Confirmed = "1",
  Tentative = "0",
}

export enum RepeatType {
  None = "0",
  Daily = "1",
  Weekly = "2",
  Monthly = "3",
  Yearly = "4",
}

export enum MonthlyType {
  Absolute = "1",
  Relative = "2",
}

export const REP_DAY = [
  { label: "Sun", name: "repDay0" },
  { label: "Mon", name: "repDay1" },
  { label: "Tue", name: "repDay2" },
  { label: "Web", name: "repDay3" },
  { label: "Thu", name: "repDay4" },
  { label: "Fri", name: "repDay5" },
  { label: "Sat", name: "repDay6" },
];

export const BOOKING_TYPE_ITEM = [
  { label: "External", value: "E" },
  { label: "Internal", value: "I" },
];

export const MONTH_RELATIVE_ORD = [
  { label: "first", value: "1" },
  { label: "second", value: "2" },
  { label: "third", value: "3" },
  { label: "fourth", value: "4" },
  { label: "fifth", value: "5" },
  { label: "last", value: "-1" },
  { label: "second last", value: "-2" },
  { label: "third last", value: "-3" },
  { label: "fourth last", value: "-4" },
  { label: "fifth last", value: "-5" },
];

export const MONTH_RELATIVE_DAY = [
  { label: "Sunday", value: "SU" },
  { label: "Monday", value: "MO" },
  { label: "Tuesday", value: "TU" },
  { label: "Wednesday", value: "WE" },
  { label: "Thursday", value: "TH" },
  { label: "Friday", value: "FR" },
  { label: "Saturday", value: "SA" },
];
