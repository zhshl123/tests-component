import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';
import {Text} from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_CSP_ID, COOKIE_CSP_TITLE } from '../common/statics';
import { csp } from './components';

export const checkCSPInfo = {
    using: (CSPInfo: DataTable) => {
        return Task.where(`#actor checks safety plan information`,
            csp.checkDropdownInputFieldValue('Category', CSPInfo.rowsHash().Category, SUCCEEDED),
            Ensure.eventually(Text.of(csp.lookupInputFieldSingleValue('Primary Project')), includes(CSPInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(csp.lookupInputFieldSingleValue('Primary Contract')), includes(CSPInfo.rowsHash().PrimaryContract)),
            csp.checkTextInputFieldValue('ID', Cookie.called(COOKIE_CSP_ID).value(), SUCCEEDED),
            csp.checkTextInputFieldValue('Title', Cookie.called(COOKIE_CSP_TITLE).value(), SUCCEEDED),
            csp.checkDateInputFieldValue('Date Reported', CSPInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }

}

export const deleteCSP = () => {
    return Task.where(`#actor deletes safety plan information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))

    )
}