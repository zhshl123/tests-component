import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, isVisible } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { formatted_now } from '../../website/common';
import { clickButton, targetButton } from '../common';
import { buttonInAlertMessageBox, checkAndClosePopupWindow, iconInAlertMessageBox } from '../common/PopupWindow';
import { COOKIE_RESOURCE_ID } from '../common/statics/StaticCookie';
import { resourceAdd, resourceEdit } from './components/AddResourceFields';

export class ResourceCrud {

    addByRequiredFields = (resourceInfo: DataTable) => {
        return Task.where(`#actor add Resource`,
            this.fillResourceRequiredField(resourceInfo),

            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
        )
    }

    fillResourceRequiredField = (resourceInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill Inspection Report required field`,

            resourceAdd.fillTextInputField('Resource ID', resourceInfo.rowsHash().ResourceID + timestamp),
            resourceAdd.setCookie(COOKIE_RESOURCE_ID, resourceInfo.rowsHash().ResourceID + timestamp),
            resourceAdd.fillResourceTextInputField('Resource Name', 1, resourceInfo.rowsHash().ResourceName),
            resourceAdd.selectDropdownItem('Resource Type', resourceInfo.rowsHash().ResourceTypeID),
            Wait.for(Duration.ofSeconds(2)),
            resourceAdd.clickRadioButton('Status', resourceInfo.rowsHash().IsActive),

        )
    }

    checkRequiredFields = (resourceInfo: DataTable) => {
        return Task.where(`#actor check resource information`,
            resourceEdit.checkTextInputFieldValue('Resource ID', Cookie.called(COOKIE_RESOURCE_ID).value(), SUCCEEDED),
            resourceEdit.checkTextInputFieldValue('Resource Name', resourceInfo.rowsHash().ResourceName, SUCCEEDED),
            resourceEdit.checkDropdownFieldValue('Resource Type', resourceInfo.rowsHash().ResourceTypeID, SUCCEEDED),
            resourceEdit.checkSelectedRadioButton('Status', resourceInfo.rowsHash().IsActive, SUCCEEDED),
        )
    }

    delete = () =>
        Task.where(`#actor delete resource`,
            clickButton.using(DELETE),
            Ensure.eventually(iconInAlertMessageBox(), isVisible()),
            Click.on(buttonInAlertMessageBox(OK)),
            Wait.for(Duration.ofSeconds(3)),
        )

}

export const resourceCrud = new ResourceCrud()