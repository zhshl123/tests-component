import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CPS_ID, COOKIE_CPS_TITLE } from '../common/statics'
import { cps } from './components'

export const addCPS = {

    using: (CPSInfo: DataTable) => {
        return Task.where(`#actor adds product submittal information`,
            // 填入必填字段
            fillCpsRequiredFields.using(CPSInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillCpsRequiredFields = {
    using: (CPSInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills product submittal required fields`,
            // 填入必填字段
            cps.selectDropdownItem('Category', CPSInfo.rowsHash().Category),
            cps.selectItemInlookupPopup('Primary Project', CPSInfo.rowsHash().PrimaryProject, 'Project Name'),
            cps.selectItemInlookupPopup('Primary Contract', CPSInfo.rowsHash().PrimaryContract, 'Contract Name'),
            cps.fillTextInputField('ID', CPSInfo.rowsHash().ID + timestamp),
            cps.setCookie(COOKIE_CPS_ID, CPSInfo.rowsHash().ID + timestamp),
            cps.fillTextInputField('Title', CPSInfo.rowsHash().Title+ timestamp),
            cps.setCookie(COOKIE_CPS_TITLE, CPSInfo.rowsHash().Title+ timestamp),
            cps.selectSpecialDate('Date Reported',CPSInfo.rowsHash().DateReported,0),
        )
    }

}