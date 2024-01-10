import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals, includes } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Cookie, Text } from '@serenity-js/web'

import { DELETE, OK, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_CO_SUBJECT_NAME } from '../common/statics';
import { CO } from './components';

export const checkCOGeneralInfo = {
    using: (changeOrderInfo: DataTable) => {
        return Task.where(`#actor check change order general information`,
            Ensure.eventually(Text.of(CO.readOnlyFieldLink('Primary Project')), includes(changeOrderInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(CO.readOnlyFieldLink('Primary Contract')), includes(changeOrderInfo.rowsHash().PrimaryContract)),
            CO.checkReadOnlyFieldLinkValue('Contractor', changeOrderInfo.rowsHash().Contractor, SUCCEEDED),
            Ensure.eventually(Attribute.called('value').of(CO.dateInputField('Issue Date')), equals(changeOrderInfo.rowsHash().IssueDate)),
            Ensure.eventually(Attribute.called('value').of(CO.textInputField('Subject')), equals(Cookie.called(COOKIE_CO_SUBJECT_NAME).value())),
        )
    }
}

export const deleteCO = () =>
    Task.where(`#actor add change order`,
        clickButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))

    )