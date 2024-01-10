import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { ADD, DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickActionButton, clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_PROJECT_NAME, COOKIE_RESOURCE_NAME } from '../common/statics';
import { project } from '../project/components/EditProjectFields';
import { timesheet } from './EditTimesheet';

export const addTimesheet = {
    using: (timesheetInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            timesheet.selectItemInlookupPopup('Resource',Cookie.called(COOKIE_RESOURCE_NAME).value(),'Resource ID'),
            Wait.for(Duration.ofSeconds(3)),
            timesheet.selectItemInlookupPopup('Project',Cookie.called(COOKIE_PROJECT_NAME).value(),'Project Name'),
            Wait.for(Duration.ofSeconds(3)),
            timesheet.selectSpecialDate('Start Date',timesheetInfo.rowsHash().StartDate,0),
            timesheet.selectSpecialDate('End Date',timesheetInfo.rowsHash().EndDate,1),
            timesheet.selectDropdownItem('Timesheet Type',timesheetInfo.rowsHash().TimesheetType),
            timesheet.fillNumberInputField('Working Hours',timesheetInfo.rowsHash().WorkingHours),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editTimesheet = {
    using: (timesheetInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            timesheet.selectSpecialDate('Start Date',timesheetInfo.rowsHash().StartDate,0),
            timesheet.selectSpecialDate('End Date',timesheetInfo.rowsHash().EndDate,1),
            timesheet.selectDropdownItem('Timesheet Type',timesheetInfo.rowsHash().TimesheetType),
            timesheet.fillNumberInputField('Working Hours',timesheetInfo.rowsHash().WorkingHours),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deleteTimesheet = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const checkTimesheet = {
    using: (timesheetInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            timesheet.checkDateInputFieldValue('Start Date',timesheetInfo.rowsHash().StartDate,SUCCEEDED),
            timesheet.checkDateInputFieldValue('End Date',timesheetInfo.rowsHash().EndDate,SUCCEEDED),
            timesheet.checkDropdownInputFieldValue('Timesheet Type',timesheetInfo.rowsHash().TimesheetType,SUCCEEDED),
            timesheet.checkNumberInputFieldValue('Working Hours',timesheetInfo.rowsHash().WorkingHours,SUCCEEDED),
        )
    }
}

export const addNewProject = {
    using: (projectInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor submit add project information`,
            timesheet.fillTextInputField('Project1',projectInfo.rowsHash().Project + timestamp),
            timesheet.setCookie(COOKIE_PROJECT_NAME,projectInfo.rowsHash().Project + timestamp),
            timesheet.selectLookupDropdownItem('Department',projectInfo.rowsHash().Department),
            Wait.for(Duration.ofSeconds(5)),
            timesheet.selectDropdownItem('Program',projectInfo.rowsHash().Program),
            Wait.for(Duration.ofSeconds(3)),
            timesheet.selectItemInRelationshipAttributeInLookupPopup('Project Manager',projectInfo.rowsHash().ProjectManager,'Resource ID'),
            timesheet.setCookie(COOKIE_RESOURCE_NAME,projectInfo.rowsHash().ProjectManager),
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
        )
    }
}