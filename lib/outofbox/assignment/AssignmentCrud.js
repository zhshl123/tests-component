"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.checkAssignmentInfo = exports.editAssignment = exports.addAssignment = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditAssignment_1 = require("./EditAssignment");
exports.addAssignment = {
    using: (AssignmentName, FrequencyType, AssignmentType, InspectionType, AssignTo, StartTime, EndTime) => {
        const Start_Date = StartTime.split(' ')[0];
        const Start_Time = StartTime.split(' ')[1] + ' ' + StartTime.split(' ')[2];
        const End_Date = EndTime.split(' ')[0];
        const End_Time = EndTime.split(' ')[1] + ' ' + EndTime.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditAssignment_1.Assignment.fillTextInputField('Assignment Name', AssignmentName), EditAssignment_1.Assignment.selectDropdownItemLast('Frequency Type', FrequencyType), EditAssignment_1.Assignment.selectDropdownItemLast('Assignment Type', AssignmentType), EditAssignment_1.Assignment.selectDropdownItemLast('Inspection Type', InspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditAssignment_1.Assignment.selectItemInlookupPopup('Assign To', AssignTo, 'Resource ID'), EditAssignment_1.Assignment.selectSpecialDate('Start Time', Start_Date, 0), EditAssignment_1.Assignment.selectClock('Start Time', Start_Time), EditAssignment_1.Assignment.selectSpecialDate('End Time', End_Date, 1), EditAssignment_1.Assignment.selectClock('End Time', End_Time), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editAssignment = {
    using: (AssignmentInfo) => {
        const Start_Date = AssignmentInfo.rowsHash().StartTime.split(' ')[0];
        const Start_Time = AssignmentInfo.rowsHash().StartTime.split(' ')[1] + ' ' + AssignmentInfo.rowsHash().StartTime.split(' ')[2];
        const End_Date = AssignmentInfo.rowsHash().EndTime.split(' ')[0];
        const End_Time = AssignmentInfo.rowsHash().EndTime.split(' ')[1] + ' ' + AssignmentInfo.rowsHash().EndTime.split(' ')[2];
        return core_1.Task.where(`#actor Input all fields and save `, EditAssignment_1.Assignment.setCookie(statics_1.COOKIE_ASSIGNMENT_ID, web_1.Attribute.called('value').of(EditAssignment_1.Assignment.textInputFieldA('Assignment ID'))), EditAssignment_1.Assignment.fillTextInputField('Assignment Name', AssignmentInfo.rowsHash().AssignmentName), EditAssignment_1.Assignment.selectDropdownItemLast('Frequency Type', AssignmentInfo.rowsHash().FrequencyType), EditAssignment_1.Assignment.selectDropdownItemLast('Inspection Type', AssignmentInfo.rowsHash().InspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(EditAssignment_1.Assignment.ralationshipAttributeLookupFieldClearIcon('Assign To')), EditAssignment_1.Assignment.selectItemInlookupPopup('Assign To', AssignmentInfo.rowsHash().AssignTo, 'Resource ID'), EditAssignment_1.Assignment.selectSpecialDate('Start Time', Start_Date, 0), EditAssignment_1.Assignment.selectClock('Start Time', Start_Time), EditAssignment_1.Assignment.selectSpecialDate('End Time', End_Date, 1), EditAssignment_1.Assignment.selectClock('End Time', End_Time), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkAssignmentInfo = {
    using: (AssignmentName) => {
        return core_1.Task.where(`#actor check fields`, EditAssignment_1.Assignment.clickGeneralTab(), core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditAssignment_1.Assignment.checkTextInputFieldValue('Assignment Name', AssignmentName, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteAssignment = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=AssignmentCrud.js.map