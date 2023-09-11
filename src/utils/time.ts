import dayjs from "dayjs";
import dayjsIsToday from "dayjs/plugin/isToday";

dayjs.extend(dayjsIsToday);

export const hasWeekPassedFromNow = (date: Date) => {
  const dateWithoutTime = dayjs(date).format("YYYY-MM-DD");
  const diff = dayjs().diff(dateWithoutTime, "day");

  return diff >= 7;
};

export const isPastYear = (date: Date) => dayjs().isAfter(date, "year");

export const isToday = (date: Date) => dayjs(date).isToday();

export const formatTime = (date: Date) => {
  if (isToday(date)) {
    return dayjs(date).format("HH:mm");
  } else if (!hasWeekPassedFromNow(date)) {
    return dayjs(date).format("ddd");
  } else if (isPastYear(date)) {
    return dayjs(date).format("D MMM YYYY");
  } else {
    return dayjs(date).format("D MMM");
  }
};

export const formatTimeExtended = (date: Date) => {
  if (isToday(date)) {
    return dayjs(date).format("HH:mm");
  } else if (!hasWeekPassedFromNow(date)) {
    return dayjs(date).format("ddd [at] HH:mm");
  } else if (isPastYear(date)) {
    return dayjs(date).format("D MMM YYYY [at] HH:mm");
  } else {
    return dayjs(date).format("D MMM [at] HH:mm");
  }
};
