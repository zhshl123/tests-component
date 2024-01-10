"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarDate = exports.calendarYear = exports.calendarMonth = exports.calendarMonthList = exports.calendarTopMiddleButton = exports.dateToday = exports.calendarBoxs = exports.fillSpecialDate = exports.clickCalendarDate = exports.clickCalendarYear = exports.clickCalendarMonth = exports.clickCalendarToday = exports.checkCalendarBox = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 检查Calendar弹出框
 * @returns
 */
const checkCalendarBox = () => core_1.Task.where(`#actor check calendar box`, assertions_1.Ensure.eventually((0, exports.calendarBoxs)(), (0, assertions_1.isPresent)()));
exports.checkCalendarBox = checkCalendarBox;
/**
 * 点击日历的当天时间
 * @returns
 */
const clickCalendarToday = (calendarNth = 0) => core_1.Task.where(`#actor click calendar date today`, web_1.Click.on((0, exports.dateToday)(calendarNth)));
exports.clickCalendarToday = clickCalendarToday;
/**
 * 点击日历的月份
 * @returns
 */
const clickCalendarMonth = (calendarNth, date) => {
    const month = date.split('/')[1];
    return core_1.Task.where(`#actor click calendar month`, web_1.Click.on((0, exports.calendarMonth)(calendarNth, month)));
};
exports.clickCalendarMonth = clickCalendarMonth;
/**
 * 点击日历的年份
 * @returns
 */
const clickCalendarYear = (calendarNth, date) => {
    const year = date.split('/')[0];
    return core_1.Task.where(`#actor click calendar year`, web_1.Click.on((0, exports.calendarTopMiddleButton)(calendarNth)), web_1.Click.on((0, exports.calendarTopMiddleButton)(calendarNth)), web_1.Click.on((0, exports.calendarYear)(calendarNth, year)));
};
exports.clickCalendarYear = clickCalendarYear;
/**
 * 点击日历的日期
 * @param calendarNth 日历从上往下数的序号 第一个为0， 以此类推
 * @param date 日期 eg: 2023/07/22
 * @returns
 */
const clickCalendarDate = (calendarNth, date) => {
    const montNumber = Number(date.split('/')[1]) - 1;
    const dateNew = date.split('/')[0] + '/' + montNumber + '/' + date.split('/')[2].replace(/^0+/, '');
    // calendarNth = calendarNth-1
    return core_1.Task.where(`#actor click calendar date`, (0, exports.clickCalendarYear)(calendarNth, date), (0, exports.clickCalendarMonth)(calendarNth, date), web_1.Click.on((0, exports.calendarDate)(calendarNth, dateNew)));
};
exports.clickCalendarDate = clickCalendarDate;
/**
 * 要输入的日期
 * @param date 日期 eg: 07/22/2023
 * @returns
 */
const fillSpecialDate = (date) => {
    const array = date.split('');
    return core_1.Task.where(`#actor click calendar date`, web_1.Press.the(array[0], array[1], web_1.Key.ArrowRight, array[3], array[9], web_1.Key.ArrowRight, array[6], array[7], array[8], array[9]));
};
exports.fillSpecialDate = fillSpecialDate;
const calendarBoxs = () => web_1.PageElements.located(web_1.By.css('.k-widget.k-calendar'))
    .describedAs('Contreact Time Line calendar boxs');
exports.calendarBoxs = calendarBoxs;
const dateToday = (calendarNth) => web_1.PageElement.located(web_1.By.css('.k-nav-today'))
    .of((0, exports.calendarBoxs)().nth(calendarNth))
    .describedAs('Contreact Time Line today');
exports.dateToday = dateToday;
const calendarTopMiddleButton = (calendarNth) => web_1.PageElement.located(web_1.By.css(`[data-action="nav-up"]`))
    .of((0, exports.calendarBoxs)().nth(calendarNth))
    .describedAs('Calendar Top Middle Button');
exports.calendarTopMiddleButton = calendarTopMiddleButton;
/**
 * 月份的集合
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns
 */
const calendarMonthList = (calendarNth) => web_1.PageElements.located(web_1.By.css(`[role="gridcell"]`))
    .of((0, exports.calendarBoxs)().nth(calendarNth))
    .describedAs('Calendar grid list');
exports.calendarMonthList = calendarMonthList;
/**
 *
 * @param calendarNth 日历的序号
 * @param month 月份 eg:08
 * @returns
 */
const calendarMonth = (calendarNth, month) => (0, exports.calendarMonthList)(calendarNth)
    .nth(Number(month) - 1)
    .describedAs('Calendar month ' + month);
exports.calendarMonth = calendarMonth;
/**
 * 日历的年份
 * @param calendarNth 日立的序号
 * @param year 年份 eg: 2023
 * @returns
 */
const calendarYear = (calendarNth, year) => web_1.PageElement.located(web_1.By.css(`[data-value="${year}/0/1"]`))
    .of((0, exports.calendarBoxs)().nth(calendarNth))
    .describedAs('calendar year ' + year);
exports.calendarYear = calendarYear;
/**
 *
 * @param calendarNth 日历的序号
 * @param date 日期：yyyy/mm/dd eg:2023/06/23
 * @returns
 */
const calendarDate = (calendarNth, date) => {
    const day = date.split('/')[2];
    return web_1.PageElement.located(web_1.By.cssContainingText(`[data-value="${date}"]`, day))
        .of((0, exports.calendarBoxs)().nth(calendarNth))
        .describedAs('Calendar date ' + date);
};
exports.calendarDate = calendarDate;
//# sourceMappingURL=CalendarPopup.js.map