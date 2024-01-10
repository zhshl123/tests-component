import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { TabForm } from './ConductProjectScoping';

export const saveGeneralTabForm = {
    using: (generalTabForm: DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            Click.on(TabForm.scopingAreaTab('General')),
            FillGeneralTabForm.using(
                generalTabForm.rowsHash().ProjectScopingScenario,
                generalTabForm.rowsHash().Notes,
                generalTabForm.rowsHash().ProjectJustification,
                generalTabForm.rowsHash().ProjectDescription,
                generalTabForm.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const FillGeneralTabForm = {
    using: (projectScopingScenario: string, Notes: string, projectJustification: string, projectDescription: string, scopingStatus: string) => {
        return Task.where(`#actor Input all fields`,
            TabForm.fillTextInputField('Project Scoping Scenario', projectScopingScenario),
            TabForm.fillTextInputField('Notes', Notes),
            TabForm.fillTextInputField('Project Justification', projectJustification),
            TabForm.fillTextInputField('Project Description', projectDescription),
            TabForm.selectDropdownItem('Scoping Status', scopingStatus),
        )
    }
}

export const checkGeneralSaveResult = {
    using: (generalTabForm: DataTable) => {
        return Task.where(`#actor check general information`,
            TabForm.checkTextInputFieldValue('Project Scoping Scenario', generalTabForm.rowsHash().ProjectScopingScenario, SUCCEEDED),
            TabForm.checkTextInputFieldValue('Notes', generalTabForm.rowsHash().Notes, SUCCEEDED),
            TabForm.checkTextInputFieldValue('Project Justification', generalTabForm.rowsHash().ProjectJustification, SUCCEEDED),
            TabForm.checkTextInputFieldValue('Project Description', generalTabForm.rowsHash().ProjectDescription, SUCCEEDED),
            TabForm.checkDropdownInputFieldValue('Scoping Status', generalTabForm.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }

}

