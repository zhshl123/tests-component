import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CSP_ID, COOKIE_CSP_TITLE } from '../common/statics'
import { csp } from './components'

export const addCSP = {

    using: (CSPInfo: DataTable) => {
        return Task.where(`#actor adds safety paln information`,
            // 填入必填字段
            fillCSPRequiredFields.using(CSPInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillCSPRequiredFields = {
    using: (CSPInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills safety paln required fields`,
            // 填入必填字段
            csp.selectDropdownItem('Category', CSPInfo.rowsHash().Category),
            csp.selectItemInlookupPopup('Primary Project', CSPInfo.rowsHash().PrimaryProject, 'Project Name'),
            csp.selectItemInlookupPopup('Primary Contract', CSPInfo.rowsHash().PrimaryContract, 'Contract Name'),
            csp.fillTextInputField('ID', CSPInfo.rowsHash().ID + timestamp),
            csp.setCookie(COOKIE_CSP_ID, CSPInfo.rowsHash().ID + timestamp),
            csp.fillTextInputField('Title', CSPInfo.rowsHash().Title+ timestamp),
            csp.setCookie(COOKIE_CSP_TITLE, CSPInfo.rowsHash().Title+ timestamp),
            csp.selectSpecialDate('Date Reported',CSPInfo.rowsHash().DateReported,0),
        )
    }

}