/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Task } from '@serenity-js/core';
import { Attribute } from '@serenity-js/web';

import { SAVE_CONTINUE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, waitMessagePopupBoxVisible} from '../common';
import { COOKIE_SA_ID } from '../common/statics';
import { SA } from './EditSA';

export const addSA = {
    using: (SAInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            SA.setCookie(COOKIE_SA_ID,Attribute.called('value').of(SA.textInputField('ID'))),
            SA.selectItemInlookupPopup('Primary Project',SAInfo.rowsHash().PrimaryProject,'Project Name'),
            SA.selectItemInlookupPopup('Primary Contract',SAInfo.rowsHash().PrimaryContract,'Contract Name'),
            SA.fillTextInputField('Title',SAInfo.rowsHash().Title),
            clickButton.using(SAVE_CONTINUE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editSA = {
    using: (SAInfo:DataTable) => {
        return Task.where(`#actor edit all fields and save `,
            SA.selectItemInlookupPopup('Primary Project',SAInfo.rowsHash().PrimaryProject,'Project Name'),
            SA.selectItemInlookupPopup('Primary Contract',SAInfo.rowsHash().PrimaryContract,'Contract Name'),
            SA.fillTextInputField('Title',SAInfo.rowsHash().Title),
            SA.selectSpecialDate('Date Reported',SAInfo.rowsHash().DateReported,0),
            clickButton.using(SAVE_CONTINUE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkSA = {
    using: (SAInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            SA.checkTextInputFieldValue('Title',SAInfo.rowsHash().Title,SUCCEEDED),
            SA.checkDateInputFieldValue('Date Reported',SAInfo.rowsHash().DateReported,SUCCEEDED),
        )
    }
}