/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Attribute,Text } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_DSI_NO } from '../common/statics';
import { DSI } from './EditDSI';

export const addDSI = {
    using: (DSIInfo: DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            DSI.setCookie(COOKIE_DSI_NO, Attribute.called('value').of(DSI.textInputField('DSI No.'))),
            DSI.selectItemInlookupPopup('Primary Project', DSIInfo.rowsHash().PrimaryProject, 'Project Name'),
            DSI.selectItemInlookupPopup('Primary Contract', DSIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            DSI.fillTextInputField('Subject', DSIInfo.rowsHash().Subject),
            DSI.selectItemInlookupPopup('Designer', DSIInfo.rowsHash().Designer, 'Vendor Name'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editDSI = {
    using: (DSIInfo: DataTable) => {
        return Task.where(`#actor edit all fields and save `,
            DSI.selectItemInlookupPopup('Primary Project', DSIInfo.rowsHash().PrimaryProject, 'Project Name'),
            DSI.selectItemInlookupPopup('Primary Contract', DSIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            DSI.fillTextInputField('Subject', DSIInfo.rowsHash().Subject),
            DSI.selectItemInlookupPopup('Designer', DSIInfo.rowsHash().Designer, 'Vendor Name'),
            DSI.selectSpecialDate('Issuance Date', DSIInfo.rowsHash().IssuanceDate, 0),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkDSI = {
    using: (DSIInfo: DataTable) => {
        return Task.where(`#actor check fields`,
            Ensure.eventually(Text.of(DSI.lookupInputFieldSingleValue('Primary Project')), includes(DSIInfo.rowsHash().PrimaryProject)),
            Ensure.eventually(Text.of(DSI.lookupInputFieldSingleValue('Primary Contract')), includes(DSIInfo.rowsHash().PrimaryContract)),
            DSI.checkLookupInputFieldSingleValue('Designer', DSIInfo.rowsHash().Designer, SUCCEEDED),
            DSI.checkTextInputFieldValue('Subject', DSIInfo.rowsHash().Subject, SUCCEEDED),
            DSI.checkDateInputFieldValue('Issuance Date', DSIInfo.rowsHash().IssuanceDate, SUCCEEDED),
        )
    }
}