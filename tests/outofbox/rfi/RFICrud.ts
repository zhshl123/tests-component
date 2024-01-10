/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, formatted_now } from '../common';
import { COOKIE_RFI_ID } from '../common/statics';
import { RFI } from './EditRFI';

export const addRFI = {
    using: (RFIInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            RFI.selectDropdownItem('Category', RFIInfo.rowsHash().Category),
            RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'),
            RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title + timestamp),
            RFI.setCookie(COOKIE_RFI_ID, RFIInfo.rowsHash().Title + timestamp),
            RFI.fillTextInputField('Submittal ID', RFIInfo.rowsHash().SubmittalID + timestamp),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const editRFI = {
    using: (RFIInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor edit all fields and save `,

            RFI.selectItemInlookupPopup('Primary Project', RFIInfo.rowsHash().PrimaryProject, 'Project Name'),
            RFI.selectItemInlookupPopup('Primary Contract', RFIInfo.rowsHash().PrimaryContract, 'Contract Name'),
            RFI.fillTextInputField('Title', RFIInfo.rowsHash().Title + timestamp),
            RFI.setCookie(COOKIE_RFI_ID, RFIInfo.rowsHash().Title + timestamp),
            RFI.selectSpecialDate('Date Reported', RFIInfo.rowsHash().DateReported, 0),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkRFI = {
    using: (RFIInfo: DataTable) => {
        return Task.where(`#actor check fields`,
            RFI.checkTextInputFieldValue('Title', Cookie.called(COOKIE_RFI_ID).value(), SUCCEEDED),
            RFI.checkDateInputFieldValue('Date Reported', RFIInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }
}