import { DataTable } from '@cucumber/cucumber'
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'

import { DELETE, OK, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CALENDAR_NAME } from '../common/statics'
import { calendar } from './components/EditCalendarFields'

export const deleteCalendar = {
    using: (calendarName: string | Question<any>) => {

        return Task.where(`#actor delete calendar ${calendarName}`,
            clickActionButton.using(DELETE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkCalendarInfo = {
    using: (calendarInfo: DataTable) => {

        return Task.where(`#actor check calendar information with ${calendarInfo}`,
            calendar.checkTextInputFieldValue('Calendar Name', Cookie.called(COOKIE_CALENDAR_NAME).value(), SUCCEEDED),
            calendar.checkTextInputFieldValue('Standard Working Hours', calendarInfo.rowsHash().StandardWorkingHours, SUCCEEDED),
        )
    }
}