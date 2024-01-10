import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_DESIGN_SUBMITTAL_ID, COOKIE_DESIGN_SUBMITTAL_TITLE } from '../common/statics'
import { designSubmittal } from './components'

export const addDesignSubmittal = {

    using: (designSubmittalInfo: DataTable) => {
        return Task.where(`#actor adds Design Submittal information`,
            // 填入必填字段
            fillRequiredFields.using(designSubmittalInfo),

            // 提交
            clickButton.using('Save & Continue'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

const fillRequiredFields = {
    using: (designSubmittalInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills Design Submittal required fields`,
            // 填入必填字段
            designSubmittal.selectItemInlookupPopup('Primary Project', designSubmittalInfo.rowsHash().PrimaryProject, 'Project Name'),
            Wait.for(Duration.ofSeconds(3)),
            designSubmittal.selectItemInlookupPopup('Primary Contract', designSubmittalInfo.rowsHash().PrimaryContract, 'Contract Name'),
            Wait.for(Duration.ofSeconds(3)),
            designSubmittal.fillTextInputField('Submittal ID', designSubmittalInfo.rowsHash().ID + timestamp),
            designSubmittal.setCookie(COOKIE_DESIGN_SUBMITTAL_ID, designSubmittalInfo.rowsHash().ID + timestamp),
            designSubmittal.fillTextInputField('Title', designSubmittalInfo.rowsHash().Title+ timestamp),
            designSubmittal.setCookie(COOKIE_DESIGN_SUBMITTAL_TITLE, designSubmittalInfo.rowsHash().Title+ timestamp),
            designSubmittal.selectSpecialDate('Date Reported',designSubmittalInfo.rowsHash().DateReported,0),
        )
    }

}