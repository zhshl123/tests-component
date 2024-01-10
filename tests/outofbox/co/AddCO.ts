import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { SAVE } from '../../DefaultStaticParams'
import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CO_SUBJECT_NAME } from '../common/statics'
import { CO } from './components'

export const addChangeOrder = {
    using: (changeOrderInfo: DataTable) => {
        return Task.where(`#actor add change order`,
            fillCORequiredFields.using(changeOrderInfo),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const fillCORequiredFields = {
    using: (changeOrderInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill change order required fields`,
            CO.selectItemInlookupPopup('Primary Project', changeOrderInfo.rowsHash().PrimaryProject, 'Project Name'),
            CO.selectItemInlookupPopup('Primary Contract', changeOrderInfo.rowsHash().PrimaryContract, 'Contract Name'),
            Wait.for(Duration.ofSeconds(5)),
            CO.selectSpecialDate('Issue Date', changeOrderInfo.rowsHash().IssueDate, 0),
            CO.selectItemInlookupPopup('Contractor', changeOrderInfo.rowsHash().Contractor, 'Vendor ID'),
            CO.fillTextInputField('Subject', changeOrderInfo.rowsHash().Subject + timestamp),
            CO.setCookie(COOKIE_CO_SUBJECT_NAME, changeOrderInfo.rowsHash().Subject + timestamp)
        )
    }
}