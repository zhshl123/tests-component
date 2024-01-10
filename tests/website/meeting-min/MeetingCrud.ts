import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Attribute } from '@serenity-js/web';

import { DELETE,OK,SAVE, SAVE_CONTINUE} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_MEETING_NO } from '../common/statics';
import { meeting } from './EditMeeting';

export const addMeeting = {
    using: (meetingInfo:DataTable) => {
        const Start_Date = meetingInfo.rowsHash().StartTime.split(' ')[0]
        const Start_Time = meetingInfo.rowsHash().StartTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().StartTime.split(' ')[2]
        const Finish_Date = meetingInfo.rowsHash().FinishTime.split(' ')[0]
        const Finish_Time = meetingInfo.rowsHash().FinishTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().FinishTime.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            meeting.fillTextInputField('Subject',meetingInfo.rowsHash().Subject),
            meeting.selectSpecialDate('Start Time',Start_Date,0),
            meeting.selectClock('Start Time',Start_Time),
            meeting.selectSpecialDate('Finish Time',Finish_Date,1),
            meeting.selectClock('Finish Time',Finish_Time),
            meeting.fillTextInputField('Location',meetingInfo.rowsHash().Location),
            meeting.selectItemInlookupPopup('Primary Contract',meetingInfo.rowsHash().PrimaryContract,'Contract Name'),
            clickButton.using(SAVE_CONTINUE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deleteMeeting = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const editMeeting = {
    using: (meetingInfo:DataTable) => {
        const Start_Date = meetingInfo.rowsHash().StartTime.split(' ')[0]
        const Start_Time = meetingInfo.rowsHash().StartTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().StartTime.split(' ')[2]
        const Finish_Date = meetingInfo.rowsHash().FinishTime.split(' ')[0]
        const Finish_Time = meetingInfo.rowsHash().FinishTime.split(' ')[1] + ' ' + meetingInfo.rowsHash().FinishTime.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            meeting.setCookie(COOKIE_MEETING_NO,Attribute.called('value').of(meeting.textInputFieldA('Meeting No.'))),
            meeting.fillTextInputField('Subject',meetingInfo.rowsHash().Subject),
            meeting.selectSpecialDate('Start Time',Start_Date,0),
            meeting.selectClock('Start Time',Start_Time),
            meeting.selectSpecialDate('Finish Time',Finish_Date,1),
            meeting.selectClock('Finish Time',Finish_Time),
            meeting.fillTextInputField('Location',meetingInfo.rowsHash().Location),
            meeting.selectItemInlookupPopup('Primary Contract',meetingInfo.rowsHash().PrimaryContract,'Contract Name'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}
