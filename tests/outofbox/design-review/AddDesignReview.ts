import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import {COOKIE_DRV_ID, COOKIE_DRV_TITLE } from '../common/statics'
import { designReview } from './components'

export const addDesignReview = {

    using: (designReviewInfo: DataTable) => {
        return Task.where(`#actor adds design review information`,
            // 填入必填字段
            fillDesignReviewRequiredFields.using(designReviewInfo),

            // 提交
            clickButton.using('Save & Continue'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillDesignReviewRequiredFields = {
    using: (designReviewInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fills design review required fields`,
            // 填入必填字段
            designReview.selectDropdownItem('Category', designReviewInfo.rowsHash().Category),
            designReview.selectItemInlookupPopup('Primary Project', designReviewInfo.rowsHash().PrimaryProject, 'Project Name'),
            designReview.selectItemInlookupPopup('Primary Contract', designReviewInfo.rowsHash().PrimaryContract, 'Contract Name'),
            designReview.fillTextInputField('ID', designReviewInfo.rowsHash().ID + timestamp),
            designReview.setCookie(COOKIE_DRV_ID, designReviewInfo.rowsHash().ID + timestamp),
            designReview.fillTextInputField('Title', designReviewInfo.rowsHash().Title+ timestamp),
            designReview.setCookie(COOKIE_DRV_TITLE, designReviewInfo.rowsHash().Title+ timestamp),
            designReview.selectSpecialDate('Date Reported',designReviewInfo.rowsHash().DateReported,0),
        )
    }

}