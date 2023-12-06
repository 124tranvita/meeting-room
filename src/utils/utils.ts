import { getDayInMonth } from "./date-func";
import * as Constants from "../common/constants";

export const capitalize = (value: string) => {
  if (!value) return "";

  const firstChar = value.slice(0, 1);

  return firstChar.toUpperCase() + value.slice(1);
};

export const getRepeatType = (value: string) => {
  if (!value) return "";

  switch (value) {
    case Constants.RepeatType.Daily:
      return "day";
    case Constants.RepeatType.Weekly:
      return "week";
    case Constants.RepeatType.Monthly:
      return "month";
    case Constants.RepeatType.Yearly:
      return "year";
    default:
      return "none";
  }
};

export const getRepeatType2 = (value: string) => {
  if (!value) return "";

  switch (value) {
    case Constants.RepeatType.Daily:
      return "Daily";
    case Constants.RepeatType.Weekly:
      return "Weekly";
    case Constants.RepeatType.Monthly:
      return "Monthly";
    case Constants.RepeatType.Yearly:
      return "Yearly";
    default:
      return "None";
  }
};

export const getDayPulldownData = () => {
  const allDays = getDayInMonth();

  return allDays && allDays.length > 0
    ? allDays.map((item) => {
        return {
          label: String(item),
          value: String(item),
        };
      })
    : [];
};

export const getBookingType = (value: string) => {
  if (!value) return "";

  switch (value) {
    case Constants.BookingType.External:
      return "External";
    case Constants.BookingType.Internal:
      return "Internal";
    default:
      return "";
  }
};

export const getConfirmStatus = (value: string) => {
  if (!value) return "";

  switch (value) {
    case Constants.ConfirmStatus.Confirmed:
      return "Confirmed";
    case Constants.ConfirmStatus.Tentative:
      return "Tentative";
    default:
      return "";
  }
};
