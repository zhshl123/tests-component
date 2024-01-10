import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie, Text } from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CSH_ID, COOKIE_CSH_TITLE } from '../common/statics'
import { csh } from './components'

export const checkCSHInfo = {
    using: (CSHInfo: DataTable) => {
        return Task.where(`#actor checks construction schedule information`,
            csh.checkDropdownInputFieldValue('Category', CSHInfo.rowsHash().Category, SUCCEEDED),
            Ensure.eventually(Text.of(csh.lookupInputFieldSingleValue('Primary Project')), includes(CSHInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(csh.lookupInputFieldSingleValue('Primary Contract')), includes(CSHInfo.rowsHash().PrimaryContract)),
            csh.checkTextInputFieldValue('ID', Cookie.called(COOKIE_CSH_ID).value(), SUCCEEDED),
            csh.checkTextInputFieldValue('Title', Cookie.called(COOKIE_CSH_TITLE).value(), SUCCEEDED),
            csh.checkDateInputFieldValue('Date Reported', CSHInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteCSH = () => {
    return Task.where(`#actor deletes construction schedule information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}

