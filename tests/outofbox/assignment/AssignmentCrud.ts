import { DataTable } from '@cucumber/cucumber';
import { Duration,Task,Wait} from '@serenity-js/core';
import { Attribute, Click } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton,clickMessagePopupButton,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_ASSIGNMENT_ID } from '../common/statics';
import { Assignment} from './EditAssignment';

export const addAssignment = {
    using: (AssignmentName: string, FrequencyType: string, AssignmentType: string, InspectionType: string, AssignTo: string, StartTime: string, EndTime: string) => {
        const Start_Date = StartTime.split(' ')[0]
        const Start_Time = StartTime.split(' ')[1] + ' ' + StartTime.split(' ')[2]
        const End_Date = EndTime.split(' ')[0]
        const End_Time = EndTime.split(' ')[1] + ' ' + EndTime.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            Assignment.fillTextInputField('Assignment Name',AssignmentName),
            Assignment.selectDropdownItemLast('Frequency Type',FrequencyType),
            Assignment.selectDropdownItemLast('Assignment Type',AssignmentType),
            Assignment.selectDropdownItemLast('Inspection Type',InspectionType),
            Wait.for(Duration.ofSeconds(3)),
            Assignment.selectItemInlookupPopup('Assign To',AssignTo,'Resource ID'),
            
            Assignment.selectSpecialDate('Start Time',Start_Date,0),
            Assignment.selectClock('Start Time',Start_Time),
            Assignment.selectSpecialDate('End Time',End_Date,1),
            Assignment.selectClock('End Time',End_Time),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editAssignment = {
    using: (AssignmentInfo:DataTable) => {
        const Start_Date = AssignmentInfo.rowsHash().StartTime.split(' ')[0]
        const Start_Time = AssignmentInfo.rowsHash().StartTime.split(' ')[1] + ' ' + AssignmentInfo.rowsHash().StartTime.split(' ')[2]
        const End_Date = AssignmentInfo.rowsHash().EndTime.split(' ')[0]
        const End_Time = AssignmentInfo.rowsHash().EndTime.split(' ')[1] + ' ' + AssignmentInfo.rowsHash().EndTime.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            Assignment.setCookie(COOKIE_ASSIGNMENT_ID,Attribute.called('value').of(Assignment.textInputFieldA('Assignment ID'))),
            Assignment.fillTextInputField('Assignment Name',AssignmentInfo.rowsHash().AssignmentName),
            Assignment.selectDropdownItemLast('Frequency Type',AssignmentInfo.rowsHash().FrequencyType),
            Assignment.selectDropdownItemLast('Inspection Type',AssignmentInfo.rowsHash().InspectionType),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(Assignment.ralationshipAttributeLookupFieldClearIcon('Assign To')),
            Assignment.selectItemInlookupPopup('Assign To',AssignmentInfo.rowsHash().AssignTo,'Resource ID'),
            Assignment.selectSpecialDate('Start Time',Start_Date,0),
            Assignment.selectClock('Start Time',Start_Time),
            Assignment.selectSpecialDate('End Time',End_Date,1),
            Assignment.selectClock('End Time',End_Time),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkAssignmentInfo = {
    using: (AssignmentName:string) => {
        return Task.where(`#actor check fields`,
            Assignment.clickGeneralTab(),
            Wait.for(Duration.ofSeconds(2)),
            Assignment.checkTextInputFieldValue('Assignment Name',AssignmentName,SUCCEEDED)
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