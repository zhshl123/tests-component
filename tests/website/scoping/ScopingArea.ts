import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions'
import { Duration,Task,Wait} from '@serenity-js/core';
import { isVisible } from '@serenity-js/web'

import { ADDSCOPINGAREA, FAILED,OK,SAVE} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,clickSectionButton,messagePopupBox} from '../common';
import { ScopingAreaForm} from './ScopingAreaForm';

export const addScopingArea = {
    using: (scopingArea:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            clickSectionButton.using(ADDSCOPINGAREA),
            Wait.for(Duration.ofSeconds(2)),
            fillScopingAreaForm.using(
                scopingArea.rowsHash().ScopingAreaDisplayName,
                scopingArea.rowsHash().ScopingAreaDefaultName,
                scopingArea.rowsHash().IsActive,
                scopingArea.rowsHash().DefaultStatus,
                scopingArea.rowsHash().Description),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(4)),
            Ensure.eventually(messagePopupBox(), isVisible()),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const fillScopingAreaForm = {
    using: (ScopingAreaDisplayName:string,ScopingAreaDefaultName:string,IsActive:string,DefaultStatus:string,Description:string) => {
        return Task.where(`#actor Input all fields`,
            ScopingAreaForm.fillTextInputField('Scoping Area Display Name',ScopingAreaDisplayName),
            ScopingAreaForm.fillTextInputField('Scoping Area Default Name',ScopingAreaDefaultName),
            ScopingAreaForm.clickSingleCheckBox('Is Active',IsActive),
            ScopingAreaForm.selectDropdownItem('Default Status',DefaultStatus),
            ScopingAreaForm.fillTextInputField('Description',Description),
        )
    }
}

export const checkScopingAreaInfo = {
    using: (scopingArea:DataTable) => {
        return Task.where(`#actor can see the new Scoping Area `,
            ScopingAreaForm.checkTextInputFieldValue('Scoping Area Display Name',scopingArea.rowsHash().ScopingAreaDisplayName,FAILED),
            ScopingAreaForm.checkTextInputFieldValue('Scoping Area Default Name',scopingArea.rowsHash().ScopingAreaDefaultName,FAILED),      
        )
    }
}

export const editScopingArea = {
    Using: (scopingArea:DataTable) => {
        return Task.where(`#actor click Edit button and edit fields `,
            ScopingAreaForm.clickNewEditIcon(),
            Wait.for(Duration.ofSeconds(4)),
            ScopingAreaForm.fillTextInputField('Scoping Area Display Name',scopingArea.rowsHash().ScopingAreaDisplayName),
            ScopingAreaForm.clickSingleCheckBox('Is Active',scopingArea.rowsHash().IsActive),
            ScopingAreaForm.fillTextInputField('Description',scopingArea.rowsHash().Description),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(4)),
        )
    }
}

export const deleteScopingArea = {
    Using: () => {
        return Task.where(`#actor click Edit button and edit fields `,
            ScopingAreaForm.clickNewDelteIcon(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(4)),
        )
    }
}
