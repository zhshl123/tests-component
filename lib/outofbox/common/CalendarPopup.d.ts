/**
 * 检查Calendar弹出框
 * @returns
 */
export declare const checkCalendarBox: () => any;
/**
 * 点击日历的当天时间
 * @returns
 */
export declare const clickCalendarToday: (calendarNth?: number) => any;
/**
 * 点击日历的月份
 * @returns
 */
export declare const clickCalendarMonth: (calendarNth: number, date: string) => any;
/**
 * 点击日历的年份
 * @returns
 */
export declare const clickCalendarYear: (calendarNth: number, date: string) => any;
/**
 * 点击日历的日期
 * @param calendarNth 日历从上往下数的序号 第一个为0， 以此类推
 * @param date 日期 eg: 2023/07/22
 * @returns
 */
export declare const clickCalendarDate: (calendarNth: number, date: string) => any;
/**
 * 要输入的日期
 * @param date 日期 eg: 07/22/2023
 * @returns
 */
export declare const fillSpecialDate: (date: string) => any;
export declare const calendarBoxs: () => any;
export declare const dateToday: (calendarNth: number) => any;
export declare const calendarTopMiddleButton: (calendarNth: number) => any;
/**
 * 月份的集合
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns
 */
export declare const calendarMonthList: (calendarNth: number) => any;
/**
 *
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns
 */
export declare const calendarMonth: (calendarNth: number, month: string) => any;
/**
 * 日历的年份
 * @param calendarNth 日立的序号
 * @param year 年份 eg: 2023
 * @returns
 */
export declare const calendarYear: (calendarNth: number, year: string) => any;
/**
 *
 * @param calendarNth 日历的序号
 * @param date 日期：yyyy/mm/dd eg:2023/06/23
 * @returns
 */
export declare const calendarDate: (calendarNth: number, date: string) => any;
