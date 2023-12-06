import * as Constants from "../common/constants";
import { getDayInMonth } from "./date-func";

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
      break;
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
