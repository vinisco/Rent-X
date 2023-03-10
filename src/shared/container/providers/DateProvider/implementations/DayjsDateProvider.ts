import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(end_date).diff(start_date, "hours");
  }
  compareInDays(start_date: Date, end_date: Date): number {
    return dayjs(end_date).diff(start_date, "days");
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  addDays(days: number): Date {
    return dayjs().add(days).toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
