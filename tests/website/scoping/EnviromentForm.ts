import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { TabForm } from './ConductProjectScoping';

export const saveEnvironmentTabForm = {
    using: (EnvironmentTabForm: DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            Click.on(TabForm.scopingAreaTab('Environment')),
            FillEnvironmentTabForm.using(
                EnvironmentTabForm.rowsHash().EnvironmentJustifications,
                EnvironmentTabForm.rowsHash().EnvironmentNotes,
                EnvironmentTabForm.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const FillEnvironmentTabForm = {
    using: (EnvironmentJustifications: string, EnvironmentNotes: string, ScopingStatus: string) => {
        return Task.where(`#actor Input all fields`,
            TabForm.fillTextInputField('Environment Justifications', EnvironmentJustifications),
            TabForm.fillTextInputField('Environment Notes', EnvironmentNotes),
            TabForm.selectDropdownItem('Scoping Status', ScopingStatus),
        )
    }
}

export const checkEnvironmentSaveResult = {
    using: (EnvironmentTabForm: DataTable) => {
        return Task.where(`#actor check general information`,
            TabForm.checkTextInputFieldValue('Environment Justifications', EnvironmentTabForm.rowsHash().EnvironmentJustifications, SUCCEEDED),
            TabForm.checkTextInputFieldValue('Environment Notes', EnvironmentTabForm.rowsHash().EnvironmentNotes, SUCCEEDED),
            TabForm.checkDropdownInputFieldValue('Scoping Status', EnvironmentTabForm.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }

}

