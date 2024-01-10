"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCalendarGeneralInfo = exports.addCalendar = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCalendarFields_1 = require("./components/EditCalendarFields");
exports.addCalendar = {
    using: (calendarInfo) => {
        return core_1.Task.where(`#actor add calendar with ${calendarInfo}`, exports.fillCalendarGeneralInfo.using(calendarInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Check.whether(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)('Duplicate')).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), common_1.clickActionButton.using(DefaultStaticParams_1.CANCEL)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillCalendarGeneralInfo = {
    using: (calendarInfo) => {
        const timeStamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill calendar general information`, EditCalendarFields_1.calendar.fillTextInputField('Calendar Name', calendarInfo.rowsHash().CalendarName + timeStamp), EditCalendarFields_1.calendar.setCookie(statics_1.COOKIE_CALENDAR_NAME, calendarInfo.rowsHash().CalendarName + timeStamp), EditCalendarFields_1.calendar.fillTextInputField('Standard Working Hours', calendarInfo.rowsHash().StandardWorkingHours), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditCalendarFields_1.calendar.fillTextInputField('Note', calendarInfo.rowsHash().Note + timeStamp));
    }
};
//# sourceMappingURL=AddCalendar.js.map