import { type CalendarDate, type CalendarDateRequired } from '@oracle/oraclejet-preact/utils/UNSAFE_calendarDateUtils';
export declare const compareCalendarDates: (val1: CalendarDateRequired, val2: CalendarDateRequired) => 0 | 1 | -1;
export declare const assertCompleteDate: (date: CalendarDate) => asserts date is CalendarDateRequired;
