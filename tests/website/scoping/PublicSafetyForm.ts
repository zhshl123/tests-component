import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { TabForm } from './ConductProjectScoping';

export const savePublicSafetyTabForm = {
    using: (publicSafetyTabForm: DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            Click.on(TabForm.scopingAreaTab('Public Safety')),
            FillPulicSafetyTabForm.using(
                publicSafetyTabForm.rowsHash().PublicSafetyJustification,
                publicSafetyTabForm.rowsHash().PublicSafetyNotes,
                publicSafetyTabForm.rowsHash().ScopingStatus),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const FillPulicSafetyTabForm = {
    using: (publicSafetyJustification: string, publicSafetyNotes: string, scopingStatus: string) => {
        return Task.where(`#actor Input all fields`,
            TabForm.fillTextInputField('Public Safety Justification', publicSafetyJustification),
            TabForm.fillTextInputField('Public Safety Notes', publicSafetyNotes),
            TabForm.selectDropdownItem('Scoping Status', scopingStatus)
        )
    }
}

export const checkPublicSafetySaveResult = {
    using: (publicSafetyTabForm: DataTable) => {
        return Task.where(`#actor check general information`,
            TabForm.checkTextInputFieldValue('Public Safety Justification', publicSafetyTabForm.rowsHash().PublicSafetyJustification, SUCCEEDED),
            TabForm.checkTextInputFieldValue('Public Safety Notes', publicSafetyTabForm.rowsHash().PublicSafetyNotes, SUCCEEDED),
            TabForm.checkDropdownInputFieldValue('Scoping Status', publicSafetyTabForm.rowsHash().ScopingStatus, SUCCEEDED)
        )
    }

}

