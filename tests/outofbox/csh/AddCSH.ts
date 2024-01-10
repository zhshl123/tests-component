import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CSH_ID, COOKIE_CSH_TITLE } from '../common/statics'
import { csh } from './components'

export const addCSH = {

    using: (CSHInfo: DataTable) => {
        return Task.where(`#actor adds construction schedule information`,
            // 填入必填字段
            fillCSHRequiredFields.using(CSHInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillCSHRequiredFields = {
    using: (CSHInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills construction schedule required fields`,
            // 填入必填字段
            csh.selectDropdownItem('Category', CSHInfo.rowsHash().Category),
            csh.selectItemInlookupPopup('Primary Project', CSHInfo.rowsHash().PrimaryProject, 'Project Name'),
            csh.selectItemInlookupPopup('Primary Contract', CSHInfo.rowsHash().PrimaryContract, 'Contract Name'),
            csh.fillTextInputField('ID', CSHInfo.rowsHash().ID + timestamp),
            csh.setCookie(COOKIE_CSH_ID, CSHInfo.rowsHash().ID + timestamp),
            csh.fillTextInputField('Title', CSHInfo.rowsHash().Title+ timestamp),
            csh.setCookie(COOKIE_CSH_TITLE, CSHInfo.rowsHash().Title+ timestamp),
            csh.selectSpecialDate('Date Reported',CSHInfo.rowsHash().DateReported,0),
        )
    }

}