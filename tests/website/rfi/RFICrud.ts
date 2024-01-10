/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Attribute, Text } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_RFI_ID } from '../common/statics';
import { RFI } from './EditRFI';

export const addRFI = {
    using: (RFIInfo: DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'),
            RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editRFI = {
    using: (RFIInfo: DataTable) => {
        return Task.where(`#actor edit all fields and save `,
            RFI.setCookie(COOKIE_RFI_ID, Attribute.called('value').of(RFI.textInputField('ID'))),
            RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'),
            RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title),
            RFI.selectSpecialDate('Date Reported', RFIInfo.rowsHash().DateReported, 0),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkRFI = {
    using: (RFIInfo: DataTable) => {
        return Task.where(`#actor check fields`,
            Ensure.eventually(Text.of(RFI.lookupInputFieldSingleValue('Primary Project')), includes(RFIInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(RFI.lookupInputFieldSingleValue('Primary Contract')), includes(RFIInfo.rowsHash().PrimaryContract)),
            RFI.checkTextInputFieldValue('Title', RFIInfo.rowsHash().Title, SUCCEEDED),
            RFI.checkDateInputFieldValue('Date Reported', RFIInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }
}