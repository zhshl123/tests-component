import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_PERMIT_NO } from '../common/statics';
import { permit } from './EditPermit';

export const addPermit = {
    using: (permitInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            permit.fillTextInputField('Permit No.',permitInfo.rowsHash().PermitNo + timestamp),
            permit.setCookie(COOKIE_PERMIT_NO,permitInfo.rowsHash().PermitNo + timestamp),
            permit.selectLookupDropdownItem('Category',permitInfo.rowsHash().Category),
            permit.selectLookupDropdownItem('Type',permitInfo.rowsHash().Type),
            permit.fillTextInputField('Applicant Name',permitInfo.rowsHash().ApplicantName),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editPermit = {
    using: (permitInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            permit.fillTextInputField('Permit No.',permitInfo.rowsHash().PermitNo + timestamp),
            permit.setCookie(COOKIE_PERMIT_NO,permitInfo.rowsHash().PermitNo + timestamp),
            permit.fillTextInputField('Applicant Name',permitInfo.rowsHash().ApplicantName),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deletePermit = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const checkPermit = {
    using: (permitInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            permit.checkTextInputFieldValue('Permit No.',Cookie.called(COOKIE_PERMIT_NO).value(),SUCCEEDED),
            permit.checkTextInputFieldValue('Applicant Name',permitInfo.rowsHash().ApplicantName,SUCCEEDED)
        )
    }
}