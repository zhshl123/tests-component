import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';
import { Text } from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_DRV_ID, COOKIE_DRV_TITLE } from '../common/statics';
import {designReview } from './components';

export const checkDesignReviewInfo = {
    using: (designReviewInfo: DataTable) => {
        return Task.where(`#actor checks design review information`,
            designReview.checkReadOnlyLabelValue('Category', designReviewInfo.rowsHash().Category, SUCCEEDED),
            Ensure.eventually(Text.of(designReview.lookupInputFieldSingleValue('Primary Project')), includes(designReviewInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(designReview.lookupInputFieldSingleValue('Primary Contract')), includes(designReviewInfo.rowsHash().PrimaryContract)),
            designReview.checkTextInputFieldValue('ID', Cookie.called(COOKIE_DRV_ID).value(), SUCCEEDED),
            designReview.checkTextInputFieldValue('Title', Cookie.called(COOKIE_DRV_TITLE).value(), SUCCEEDED),
            designReview.checkDateInputFieldValue('Date Reported', designReviewInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteDesignReview = () => {
    return Task.where(`#actor deletes design review information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}