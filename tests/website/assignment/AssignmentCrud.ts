import { DataTable } from '@cucumber/cucumber';
import { isPresent } from '@serenity-js/assertions';
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, isVisible } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, formatted_now } from '../common';
import { clickMessagePopupButton } from '../common/messagePopup';
import { COOKIE_ASSIGNMENT_ID, COOKIE_ASSIGNMENT_NAME } from '../common/statics';
import { assignment } from './EditAssignment';

export const addAssignment = {
    using: (assignmentName: string, frequencyType: string, assignmentType: string, inspectionType: string, AssignTo: string, StartTime: string, EndTime: string) => {
        const Start_Date = StartTime.split(' ')[0]
        const Start_Time = StartTime.split(' ')[1] + ' ' + StartTime.split(' ')[2]
        const End_Date = EndTime.split(' ')[0]
        const End_Time = EndTime.split(' ')[1] + ' ' + EndTime.split(' ')[2]
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            assignment.fillTextInputField('Assignment Name', assignmentName + timestamp),
            assignment.setCookie(COOKIE_ASSIGNMENT_NAME, assignmentName + timestamp),
            assignment.selectDropdownItemLast('Frequency Type', frequencyType),
            assignment.selectDropdownItemLast('Assignment Type', assignmentType),
            assignment.selectDropdownItemLast('Inspection Type', inspectionType),
            Wait.for(Duration.ofSeconds(3)),
            assignment.selectItemInlookupPopup('Assign To', AssignTo, 'Resource Name'),
            Check.whether(
                assignment.dateInputField('Start Time'), isPresent()
            ).andIfSo(
                assignment.selectSpecialDate('Start Time', Start_Date, 0),
                assignment.selectClock('Start Time', Start_Time),
            ),
            Check.whether(
                assignment.dateInputField('End Time'), isPresent()
            ).andIfSo(
                assignment.selectSpecialDate('End Time', End_Date, 1),
                assignment.selectClock('End Time', End_Time),
            ),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const editAssignment = {
    using: (assignmentInfo: DataTable) => {
        const Start_Date = assignmentInfo.rowsHash().StartTime.split(' ')[0]
        const Start_Time = assignmentInfo.rowsHash().StartTime.split(' ')[1] + ' ' + assignmentInfo.rowsHash().StartTime.split(' ')[2]
        const End_Date = assignmentInfo.rowsHash().EndTime.split(' ')[0]
        const End_Time = assignmentInfo.rowsHash().EndTime.split(' ')[1] + ' ' + assignmentInfo.rowsHash().EndTime.split(' ')[2]
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            assignment.setCookie(COOKIE_ASSIGNMENT_ID, Attribute.called('value').of(assignment.autoIdInputField('Assignment ID'))),
            assignment.fillTextInputField('Assignment Name', assignmentInfo.rowsHash().AssignmentName),
            assignment.setCookie(COOKIE_ASSIGNMENT_NAME, assignmentInfo.rowsHash().AssignmentName + timestamp),
            assignment.selectDropdownItemLast('Frequency Type', assignmentInfo.rowsHash().FrequencyType),
            assignment.selectDropdownItemLast('Inspection Type', assignmentInfo.rowsHash().InspectionType),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(assignment.ralationshipAttributeLookupFieldClearIcon('Assign To')),
            assignment.selectItemInlookupPopup('Assign To', assignmentInfo.rowsHash().AssignTo, 'Resource Name'),

            assignment.selectSpecialDate('Start Time', Start_Date, 0),
            assignment.selectClock('Start Time', Start_Time),
            assignment.selectSpecialDate('End Time', End_Date, 1),
            assignment.selectClock('End Time', End_Time),

            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkAssignmentInfo = {
    using: (assignmentInfo: DataTable) => {
        return Task.where(`#actor check fields`,
            assignment.checkTextInputFieldValue('Assignment Name', assignmentInfo.rowsHash().AssignmentName, SUCCEEDED),
            assignment.checkDropdownInputFieldValue('Frequency Type', assignmentInfo.rowsHash().FrequencyType, SUCCEEDED),
            assignment.checkDropdownInputFieldValue('Inspection Type', assignmentInfo.rowsHash().InspectionType, SUCCEEDED),
            Wait.for(Duration.ofSeconds(3)),
            assignment.checkRelationshipAttributeLookupInputFieldMultiValue('Assign To', assignmentInfo.rowsHash().AssignTo, SUCCEEDED),
            Check.whether(
                assignment.dateInputField('Start Time'), isVisible()
            ).andIfSo(
                assignment.checkDateInputFieldValue('Start Time', assignmentInfo.rowsHash().StartTime, SUCCEEDED),
            ),
            Check.whether(
                assignment.dateInputField('End Time'), isVisible()
            ).andIfSo(
                assignment.checkDateInputFieldValue('End Time', assignmentInfo.rowsHash().EndTime, SUCCEEDED),
            )
        )
    }
}

export const deleteAssignment = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}