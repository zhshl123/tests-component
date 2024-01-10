import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton } from '../common';
import { scopingGeneral } from './ScopingGeneralTabFields';

export const saveScopingGeneralInfo = {
    using: (scopingGeneralInfo: DataTable) => {
        return Task.where(`#actor save scoping general tab information`,
            scopingGeneral.fillTextInputField('Project Scoping Scenario', scopingGeneralInfo.rowsHash().ProjectScopingScenario),
            scopingGeneral.fillTextInputField('Notes', scopingGeneralInfo.rowsHash().Notes),
            scopingGeneral.fillTextInputField('Project Justification', scopingGeneralInfo.rowsHash().ProjectJustification),
            scopingGeneral.fillTextInputField('Project Description', scopingGeneralInfo.rowsHash().ProjectDescription),
            scopingGeneral.selectDropdownItem('Scoping Status', scopingGeneralInfo.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkScopingGeneralInfo = {
    using: (scopingGeneralInfo: DataTable) => {
        return Task.where(`#actor check scoping general tab  information`,
            scopingGeneral.checkTextInputFieldValue('Project Scoping Scenario', scopingGeneralInfo.rowsHash().ProjectScopingScenario, SUCCEEDED),
            scopingGeneral.checkTextInputFieldValue('Notes', scopingGeneralInfo.rowsHash().Notes, SUCCEEDED),
            scopingGeneral.checkTextInputFieldValue('Project Justification', scopingGeneralInfo.rowsHash().ProjectJustification, SUCCEEDED),
            scopingGeneral.checkTextInputFieldValue('Project Description', scopingGeneralInfo.rowsHash().ProjectDescription, SUCCEEDED),
            scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingGeneralInfo.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }

}

export const saveScopingEnviromentInfo = {
    using: (scopingEviromentInfo: DataTable) => {
        return Task.where(`#actor save scoping environment tab information`,
            scopingGeneral.fillTextInputField('Environment Justifications', scopingEviromentInfo.rowsHash().EnvironmentJustifications),
            scopingGeneral.fillTextInputField('Environment Notes', scopingEviromentInfo.rowsHash().EnvironmentNotes),
            scopingGeneral.selectDropdownItem('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkScopingEnviromentInfo = {
    using: (scopingEviromentInfo: DataTable) => {
        return Task.where(`#actor check scoping environment tab information`,
            scopingGeneral.checkTextInputFieldValue('Environment Justifications', scopingEviromentInfo.rowsHash().EnvironmentJustifications, SUCCEEDED),
            scopingGeneral.checkTextInputFieldValue('Environment Notes', scopingEviromentInfo.rowsHash().EnvironmentNotes, SUCCEEDED),
            scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }
}

export const saveScopingPublicSafetyInfo = {
    using: (scopingEviromentInfo: DataTable) => {
        return Task.where(`#actor save scoping public safety tab information`,
            scopingGeneral.fillTextInputField('Public Safety Justification', scopingEviromentInfo.rowsHash().PublicSafetyJustification),
            scopingGeneral.fillTextInputField('Public Safety Notes', scopingEviromentInfo.rowsHash().PublicSafetyNotes),
            scopingGeneral.selectDropdownItem('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkScopingPublicSafetyInfo = {
    using: (scopingEviromentInfo: DataTable) => {
        return Task.where(`#actor check scoping Public Safety tab information`,
            scopingGeneral.checkTextInputFieldValue('Public Safety Justification', scopingEviromentInfo.rowsHash().PublicSafetyJustification, SUCCEEDED),
            scopingGeneral.checkTextInputFieldValue('Public Safety Notes', scopingEviromentInfo.rowsHash().PublicSafetyNotes, SUCCEEDED),
            scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }
}