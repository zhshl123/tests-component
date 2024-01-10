import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'
import {Text} from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_DESIGN_SUBMITTAL_ID, COOKIE_DESIGN_SUBMITTAL_TITLE } from '../common/statics'
import { designSubmittal } from './components'

export const checkDesignSubmittalInfo = {
    using: (designSubmittalInfo: DataTable) => {
        return Task.where(`#actor checks Others-Contractor Submittal information`,
            Ensure.eventually(Text.of(designSubmittal.lookupInputFieldSingleValue('Primary Project')), includes(designSubmittalInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(designSubmittal.lookupInputFieldSingleValue('Primary Contract')), includes(designSubmittalInfo.rowsHash().PrimaryContract)),
            designSubmittal.checkTextInputFieldValue('Submittal ID', Cookie.called(COOKIE_DESIGN_SUBMITTAL_ID).value(), SUCCEEDED),
            designSubmittal.checkTextInputFieldValue('Title', Cookie.called(COOKIE_DESIGN_SUBMITTAL_TITLE).value(), SUCCEEDED),
            designSubmittal.checkDateInputFieldValue('Date Reported', designSubmittalInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteDesignSubmittal = () => {
    return Task.where(`#actor deletes Others-Contractor Submittal information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}

