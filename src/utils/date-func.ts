import * as DateFns from "date-fns";

/** Format DateString to Date
 * @param dateStr - date in string format
 * @returns - date in Date format
 */
export const formatToDate = (dateStr: string): Date => {
  const formattedDate: Date = DateFns.parseISO(dateStr);

  if (!DateFns.isValid(formattedDate)) {
    throw new Error(
      `${dateStr} is invalid.Input should be yyyy-mm-dd or yyyyMMddd.`
    );
  }

  return formattedDate;
};

/** Compare date is before
 * @param date - compare date
 * @param compareDate - date to be compared
 * @returns - boolean if date is before
 */
export const isBefore = (
  date: Date | string,
  compareDate: Date | string
): boolean => {
  const formattedDate = date instanceof Date ? date : formatToDate(date);
  const formattedCompareDate =
    compareDate instanceof Date ? compareDate : formatToDate(compareDate);

  return DateFns.isBefore(formattedDate, formattedCompareDate);
};

/** Format the date to given format */
export const dateFormatter = (
  value: string | Date,
  dateFormat = "dd/MM/yyyy"
) => {
  const formattedDate = value instanceof Date ? value : formatToDate(value);
  return DateFns.format(formattedDate, dateFormat);
};

/** Format date to ISO 8601 */
export const formatISO8601 = (value: string | Date) => {
  const formattedDate = value instanceof Date ? value : formatToDate(value);
  return DateFns.formatISO(formattedDate);
};

/** Format date to ISO 8601 without plus GMT timezone */
export const formatWithOutTimezone = (value: string | Date) => {
  const formattedDate = value instanceof Date ? value : formatToDate(value);
  return formattedDate.toISOString().substring(0, 16);
};

/** Return the array of all days in month */
export const getDayInMonth = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1; // months are 0-based

  const days = new Date(currentYear, currentMonth, 0).getDate();

  return Array.from({ length: days }, (_, i) => i + 1);
};

/** Calculation hours duration between 2 value */
export const getDuration = (value1: string | Date, value2: string | Date) => {
  const start = value1 instanceof Date ? value1 : formatToDate(value1);
  const end = value2 instanceof Date ? value2 : formatToDate(value2);

  const durationObj = DateFns.intervalToDuration({ start, end });

  const years = durationObj.years ? `${durationObj.years} years(s)` : "";
  const months = durationObj.months ? `${durationObj.months} month(s)` : "";
  const days = durationObj.days ? `${durationObj.days} day(s)` : "";
  const hours = durationObj.hours ? `${durationObj.hours} hour(s)` : "";
  const minutes = durationObj.minutes ? `${durationObj.minutes} minute(s)` : "";

  const arr = [years, months, days, hours, minutes].filter((item) => item);

  return arr.join(" ");
};
