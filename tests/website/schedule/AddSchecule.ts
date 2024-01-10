import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';

import { ADD, SAVE } from '../../DefaultStaticParams';
import { clickButton, clickSectionButton, formatted_now, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_SCHEDULE_NAME, COPIED_COOKIE_SCHEDULE_NAME } from '../common/statics';
import { schedule } from './components';

export const addSchedule = {
    using: (scheduleInfo: DataTable) => {
        return Task.where(`#actor add schedule`,
            clickSectionButton.using(ADD),
            Wait.for(Duration.ofSeconds(5)),
            fillScheduleRequiredFields.using(scheduleInfo),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const fillScheduleRequiredFields = {
    using: (scheduleInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill schedule required fields`,
            schedule.fillTextInputField('Schedule Name', scheduleInfo.rowsHash().ScheduleName + timestamp),
            schedule.setCookie(COOKIE_SCHEDULE_NAME, scheduleInfo.rowsHash().ScheduleName + timestamp),
            schedule.setCookie(COPIED_COOKIE_SCHEDULE_NAME, scheduleInfo.rowsHash().ScheduleName + timestamp + ' - Copy1'),
            schedule.selectDropdownItem('Schedule Status', scheduleInfo.rowsHash().ScheduleStatus),
            schedule.selectSpecialDate('Status Date', scheduleInfo.rowsHash().StatusDate,0)
        )
    }
}

