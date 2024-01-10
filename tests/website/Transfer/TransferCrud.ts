import { DataTable } from '@cucumber/cucumber';
import { Task } from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_TRANSFER_NUMBER } from '../common/statics';
import { transfer } from './EditTransfer';

export const addTransfer = {
    using: (transferInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            transfer.fillTextInputField('Transfer Number',transferInfo.rowsHash().TransferNumber + timestamp),
            transfer.setCookie(COOKIE_TRANSFER_NUMBER,transferInfo.rowsHash().TransferNumber + timestamp),
            transfer.fillTextInputField('Subject',transferInfo.rowsHash().Subject),
            transfer.fillTextInputField('Reason of Change',transferInfo.rowsHash().ReasonofChange),
            transfer.fillTextInputField('Description Of Change',transferInfo.rowsHash().DescriptionofChange),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editTransfer = {
    using: (transferInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            transfer.fillTextInputField('Transfer Number',transferInfo.rowsHash().TransferNumber + timestamp),
            transfer.setCookie(COOKIE_TRANSFER_NUMBER,transferInfo.rowsHash().TransferNumber + timestamp),
            transfer.selectDropdownItem('Status',transferInfo.rowsHash().Status),
            transfer.fillTextInputField('Subject',transferInfo.rowsHash().Subject),
            transfer.fillTextInputField('Reason of Change',transferInfo.rowsHash().ReasonofChange),
            transfer.fillTextInputField('Description Of Change',transferInfo.rowsHash().DescriptionofChange),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deleteTransfer = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}   

export const checkTransfer = {
    using: (transferInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            transfer.checkTextInputFieldValue('Transfer Number',Cookie.called(COOKIE_TRANSFER_NUMBER).value(),SUCCEEDED),
            transfer.checkDropdownInputFieldValue('Status',transferInfo.rowsHash().Status,SUCCEEDED),
            transfer.checkTextInputFieldValue('Subject',transferInfo.rowsHash().Subject,SUCCEEDED),
            transfer.checkTextInputFieldValue('Reason of Change',transferInfo.rowsHash().ReasonofChange,SUCCEEDED),
            transfer.checkTextInputFieldValue('Description Of Change',transferInfo.rowsHash().DescriptionofChange,SUCCEEDED),
        )
    }
}
