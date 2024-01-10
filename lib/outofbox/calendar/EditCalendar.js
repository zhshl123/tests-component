"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCalendarInfo = exports.deleteCalendar = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCalendarFields_1 = require("./components/EditCalendarFields");
exports.deleteCalendar = {
    using: (calendarName) => {
        return core_1.Task.where(`#actor delete calendar ${calendarName}`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkCalendarInfo = {
    using: (calendarInfo) => {
        return core_1.Task.where(`#actor check calendar information with ${calendarInfo}`, EditCalendarFields_1.calendar.checkTextInputFieldValue('Calendar Name', web_1.Cookie.called(statics_1.COOKIE_CALENDAR_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditCalendarFields_1.calendar.checkTextInputFieldValue('Standard Working Hours', calendarInfo.rowsHash().StandardWorkingHours, DefaultStaticParams_1.SUCCEEDED), EditCalendarFields_1.calendar.checkTextInputFieldValue('Note', web_1.Cookie.called(statics_1.COOKIE_CALENDAR_NAME).value(), DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=EditCalendar.js.map