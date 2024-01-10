"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillScheduleRequiredFields = exports.addSchedule = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addSchedule = {
    using: (scheduleInfo) => {
        return core_1.Task.where(`#actor add schedule`, common_1.clickSectionButton.using(DefaultStaticParams_1.ADD), core_1.Wait.for(core_1.Duration.ofSeconds(5)), exports.fillScheduleRequiredFields.using(scheduleInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillScheduleRequiredFields = {
    using: (scheduleInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill schedule required fields`, components_1.schedule.fillTextInputField('Schedule Name', scheduleInfo.rowsHash().ScheduleName + timestamp), components_1.schedule.setCookie(statics_1.COOKIE_SCHEDULE_NAME, scheduleInfo.rowsHash().ScheduleName + timestamp), components_1.schedule.setCookie(statics_1.COPIED_COOKIE_SCHEDULE_NAME, scheduleInfo.rowsHash().ScheduleName + timestamp + ' - Copy1'), components_1.schedule.selectDropdownItem('Schedule Status', scheduleInfo.rowsHash().ScheduleStatus), components_1.schedule.selectSpecialDate('Status Date', scheduleInfo.rowsHash().StatusDate, 0));
    }
};
//# sourceMappingURL=AddSchecule.js.map