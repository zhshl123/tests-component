"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewProject = exports.checkTimesheet = exports.deleteTimesheet = exports.editTimesheet = exports.addTimesheet = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditProjectFields_1 = require("../project/components/EditProjectFields");
const EditTimesheet_1 = require("./EditTimesheet");
exports.addTimesheet = {
    using: (timesheetInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditTimesheet_1.timesheet.selectItemInlookupPopup('Resource', web_1.Cookie.called(statics_1.COOKIE_RESOURCE_NAME).value(), 'Resource ID'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditTimesheet_1.timesheet.selectItemInlookupPopup('Project', web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value(), 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditTimesheet_1.timesheet.selectSpecialDate('Start Date', timesheetInfo.rowsHash().StartDate, 0), EditTimesheet_1.timesheet.selectSpecialDate('End Date', timesheetInfo.rowsHash().EndDate, 1), EditTimesheet_1.timesheet.selectDropdownItem('Timesheet Type', timesheetInfo.rowsHash().TimesheetType), EditTimesheet_1.timesheet.fillNumberInputField('Working Hours', timesheetInfo.rowsHash().WorkingHours), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editTimesheet = {
    using: (timesheetInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditTimesheet_1.timesheet.selectSpecialDate('Start Date', timesheetInfo.rowsHash().StartDate, 0), EditTimesheet_1.timesheet.selectSpecialDate('End Date', timesheetInfo.rowsHash().EndDate, 1), EditTimesheet_1.timesheet.selectDropdownItem('Timesheet Type', timesheetInfo.rowsHash().TimesheetType), EditTimesheet_1.timesheet.fillNumberInputField('Working Hours', timesheetInfo.rowsHash().WorkingHours), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deleteTimesheet = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.checkTimesheet = {
    using: (timesheetInfo) => {
        return core_1.Task.where(`#actor check fields`, EditTimesheet_1.timesheet.checkDateInputFieldValue('Start Date', timesheetInfo.rowsHash().StartDate, DefaultStaticParams_1.SUCCEEDED), EditTimesheet_1.timesheet.checkDateInputFieldValue('End Date', timesheetInfo.rowsHash().EndDate, DefaultStaticParams_1.SUCCEEDED), EditTimesheet_1.timesheet.checkDropdownInputFieldValue('Timesheet Type', timesheetInfo.rowsHash().TimesheetType, DefaultStaticParams_1.SUCCEEDED), EditTimesheet_1.timesheet.checkNumberInputFieldValue('Working Hours', timesheetInfo.rowsHash().WorkingHours, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.addNewProject = {
    using: (projectInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor submit add project information`, EditTimesheet_1.timesheet.fillTextInputField('Project1', projectInfo.rowsHash().Project + timestamp), EditTimesheet_1.timesheet.setCookie(statics_1.COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + timestamp), EditTimesheet_1.timesheet.selectLookupDropdownItem('Department', projectInfo.rowsHash().Department), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditTimesheet_1.timesheet.selectDropdownItem('Program', projectInfo.rowsHash().Program), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditTimesheet_1.timesheet.selectItemInRelationshipAttributeInLookupPopup('Project Manager', projectInfo.rowsHash().ProjectManager, 'Resource ID'), EditTimesheet_1.timesheet.setCookie(statics_1.COOKIE_RESOURCE_NAME, projectInfo.rowsHash().ProjectManager), common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible());
    }
};
//# sourceMappingURL=TimesheetCrud.js.map