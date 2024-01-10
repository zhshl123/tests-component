import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_CSO_ID, COOKIE_CSO_TITLE } from '../common/statics'
import { cso } from './components'

export const addCSO = {

    using: (CSOInfo: DataTable) => {
        return Task.where(`#actor adds Others-Contractor Submittal information`,
            // 填入必填字段
            fillCSORequiredFields.using(CSOInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}


export const addODS = {

    using: (ODSInfo: DataTable) => {
        return Task.where(`#actor adds Other-Designer Submittal information`,
            // 填入必填字段
            fillCSORequiredFields.using(ODSInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillCSORequiredFields = {
    using: (CSOInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills Other-Designer Submittal required fields`,
            // 填入必填字段
            cso.selectDropdownItem('Category', CSOInfo.rowsHash().Category),
            cso.selectItemInlookupPopup('Primary Project', CSOInfo.rowsHash().PrimaryProject, 'Project Name'),
            cso.selectItemInlookupPopup('Primary Contract', CSOInfo.rowsHash().PrimaryContract, 'Contract Name'),
            cso.fillTextInputField('ID', CSOInfo.rowsHash().ID + timestamp),
            cso.setCookie(COOKIE_CSO_ID, CSOInfo.rowsHash().ID + timestamp),
            cso.fillTextInputField('Title', CSOInfo.rowsHash().Title+ timestamp),
            cso.setCookie(COOKIE_CSO_TITLE, CSOInfo.rowsHash().Title+ timestamp),
            cso.selectSpecialDate('Date Reported',CSOInfo.rowsHash().DateReported,0),
        )
    }

}