"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAssignment = exports.checkAssignmentInfo = exports.editAssignment = exports.addAssignment = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const messagePopup_1 = require("../common/messagePopup");
const statics_1 = require("../common/statics");
const EditAssignment_1 = require("./EditAssignment");
exports.addAssignment = {
    using: (assignmentName, frequencyType, assignmentType, inspectionType, AssignTo, StartTime, EndTime) => {
        const Start_Date = StartTime.split(' ')[0];
        const Start_Time = StartTime.split(' ')[1] + ' ' + StartTime.split(' ')[2];
        const End_Date = EndTime.split(' ')[0];
        const End_Time = EndTime.split(' ')[1] + ' ' + EndTime.split(' ')[2];
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditAssignment_1.assignment.fillTextInputField('Assignment Name', assignmentName + timestamp), EditAssignment_1.assignment.setCookie(statics_1.COOKIE_ASSIGNMENT_NAME, assignmentName + timestamp), EditAssignment_1.assignment.selectDropdownItemLast('Frequency Type', frequencyType), EditAssignment_1.assignment.selectDropdownItemLast('Assignment Type', assignmentType), EditAssignment_1.assignment.selectDropdownItemLast('Inspection Type', inspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditAssignment_1.assignment.selectItemInlookupPopup('Assign To', AssignTo, 'Resource Name'), core_1.Check.whether(EditAssignment_1.assignment.dateInputField('Start Time'), (0, assertions_1.isPresent)()).andIfSo(EditAssignment_1.assignment.selectSpecialDate('Start Time', Start_Date, 0), EditAssignment_1.assignment.selectClock('Start Time', Start_Time)), core_1.Check.whether(EditAssignment_1.assignment.dateInputField('End Time'), (0, assertions_1.isPresent)()).andIfSo(EditAssignment_1.assignment.selectSpecialDate('End Time', End_Date, 1), EditAssignment_1.assignment.selectClock('End Time', End_Time)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.editAssignment = {
    using: (assignmentInfo) => {
        const Start_Date = assignmentInfo.rowsHash().StartTime.split(' ')[0];
        const Start_Time = assignmentInfo.rowsHash().StartTime.split(' ')[1] + ' ' + assignmentInfo.rowsHash().StartTime.split(' ')[2];
        const End_Date = assignmentInfo.rowsHash().EndTime.split(' ')[0];
        const End_Time = assignmentInfo.rowsHash().EndTime.split(' ')[1] + ' ' + assignmentInfo.rowsHash().EndTime.split(' ')[2];
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditAssignment_1.assignment.setCookie(statics_1.COOKIE_ASSIGNMENT_ID, web_1.Attribute.called('value').of(EditAssignment_1.assignment.autoIdInputField('Assignment ID'))), EditAssignment_1.assignment.fillTextInputField('Assignment Name', assignmentInfo.rowsHash().AssignmentName), EditAssignment_1.assignment.setCookie(statics_1.COOKIE_ASSIGNMENT_NAME, assignmentInfo.rowsHash().AssignmentName + timestamp), EditAssignment_1.assignment.selectDropdownItemLast('Frequency Type', assignmentInfo.rowsHash().FrequencyType), EditAssignment_1.assignment.selectDropdownItemLast('Inspection Type', assignmentInfo.rowsHash().InspectionType), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(EditAssignment_1.assignment.ralationshipAttributeLookupFieldClearIcon('Assign To')), EditAssignment_1.assignment.selectItemInlookupPopup('Assign To', assignmentInfo.rowsHash().AssignTo, 'Resource Name'), EditAssignment_1.assignment.selectSpecialDate('Start Time', Start_Date, 0), EditAssignment_1.assignment.selectClock('Start Time', Start_Time), EditAssignment_1.assignment.selectSpecialDate('End Time', End_Date, 1), EditAssignment_1.assignment.selectClock('End Time', End_Time), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkAssignmentInfo = {
    using: (assignmentInfo) => {
        return core_1.Task.where(`#actor check fields`, EditAssignment_1.assignment.checkTextInputFieldValue('Assignment Name', assignmentInfo.rowsHash().AssignmentName, DefaultStaticParams_1.SUCCEEDED), EditAssignment_1.assignment.checkDropdownInputFieldValue('Frequency Type', assignmentInfo.rowsHash().FrequencyType, DefaultStaticParams_1.SUCCEEDED), EditAssignment_1.assignment.checkDropdownInputFieldValue('Inspection Type', assignmentInfo.rowsHash().InspectionType, DefaultStaticParams_1.SUCCEEDED), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditAssignment_1.assignment.checkRelationshipAttributeLookupInputFieldMultiValue('Assign To', assignmentInfo.rowsHash().AssignTo, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(EditAssignment_1.assignment.dateInputField('Start Time'), (0, web_1.isVisible)()).andIfSo(EditAssignment_1.assignment.checkDateInputFieldValue('Start Time', assignmentInfo.rowsHash().StartTime, DefaultStaticParams_1.SUCCEEDED)), core_1.Check.whether(EditAssignment_1.assignment.dateInputField('End Time'), (0, web_1.isVisible)()).andIfSo(EditAssignment_1.assignment.checkDateInputFieldValue('End Time', assignmentInfo.rowsHash().EndTime, DefaultStaticParams_1.SUCCEEDED)));
    }
};
exports.deleteAssignment = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=AssignmentCrud.js.map