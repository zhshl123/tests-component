import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'
import {Text} from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CSO_ID, COOKIE_CSO_TITLE } from '../common/statics'
import { cso } from './components'

export const checkCSOInfo = {
    using: (CSOInfo: DataTable) => {
        return Task.where(`#actor checks Others-Contractor Submittal information`,
            cso.checkReadOnlyLabelValue('Category', CSOInfo.rowsHash().Category, SUCCEEDED),
            Ensure.eventually(Text.of(cso.lookupInputFieldSingleValue('Primary Project')), includes(CSOInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(cso.lookupInputFieldSingleValue('Primary Contract')), includes(CSOInfo.rowsHash().PrimaryContract)),
            cso.checkTextInputFieldValue('ID', Cookie.called(COOKIE_CSO_ID).value(), SUCCEEDED),
            cso.checkTextInputFieldValue('Title', Cookie.called(COOKIE_CSO_TITLE).value(), SUCCEEDED),
            cso.checkDateInputFieldValue('Date Reported', CSOInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteCSO = () => {
    return Task.where(`#actor deletes Others-Contractor Submittal information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}

