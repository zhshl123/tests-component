import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import {Cookie, Text} from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CPS_ID, COOKIE_CPS_TITLE } from '../common/statics'
import { cps } from './components'

export const checkCPSInfo = {
    using: (CPSInfo: DataTable) => {
        return Task.where(`#actor checks product submittal information`,
            cps.checkDropdownInputFieldValue('Category', CPSInfo.rowsHash().Category, SUCCEEDED),
            Ensure.eventually(Text.of(cps.lookupInputFieldSingleValue('Primary Project')), includes(CPSInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(cps.lookupInputFieldSingleValue('Primary Contract')), includes(CPSInfo.rowsHash().PrimaryContract)),
            cps.checkTextInputFieldValue('ID', Cookie.called(COOKIE_CPS_ID).value(), SUCCEEDED),
            cps.checkTextInputFieldValue('Title', Cookie.called(COOKIE_CPS_TITLE).value(), SUCCEEDED),
            cps.checkDateInputFieldValue('Date Reported', CPSInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteCPS = () => {
    return Task.where(`#actor deletes product submittal information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}