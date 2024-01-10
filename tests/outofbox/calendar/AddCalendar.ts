import { DataTable } from '@cucumber/cucumber'
import { includes } from '@serenity-js/assertions'
import { Check, Duration, Task, Wait } from '@serenity-js/core'
import {Text} from '@serenity-js/web'

import { CANCEL, OK, SAVE } from '../../DefaultStaticParams'
import { clickActionButton, clickButton, clickMessagePopupButton, formatted_now, messagePopupContent } from '../common'
import { COOKIE_CALENDAR_NAME } from '../common/statics'
import { calendar } from './components/EditCalendarFields'

export const addCalendar = {
    using: (calendarInfo: DataTable) => {
        return Task.where(`#actor add calendar with ${calendarInfo}`,
            fillCalendarGeneralInfo.using(calendarInfo),
            clickButton.using(SAVE),
            Check.whether(
                Text.of(messagePopupContent()), includes('Duplicate')
            ).andIfSo(
                clickMessagePopupButton.using(OK),
                clickActionButton.using(CANCEL)
            ),
            Wait.for(Duration.ofSeconds(5))

        )
    }
}

export const fillCalendarGeneralInfo = {
    using: (calendarInfo: DataTable) => {
        const timeStamp = formatted_now
        return Task.where(`#actor fill calendar general information`,
            calendar.fillTextInputField('Calendar Name', calendarInfo.rowsHash().CalendarName + timeStamp),
            calendar.setCookie(COOKIE_CALENDAR_NAME, calendarInfo.rowsHash().CalendarName + timeStamp),
            calendar.fillTextInputField('Standard Working Hours', calendarInfo.rowsHash().StandardWorkingHours),
            Wait.for(Duration.ofSeconds(5)),
            calendar.fillTextInputField('Note', calendarInfo.rowsHash().Note + timeStamp),
        )
    }
}

