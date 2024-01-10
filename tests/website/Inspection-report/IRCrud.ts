/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait} from '@serenity-js/core';
import { Attribute, Click } from '@serenity-js/web';

import { DELETE,OK,SAVE} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_REPORT_NO } from '../common/statics';
import { IR } from './EditIR';

export const addIR = {
    using: (reportName: string, inspectionType: string, inspectors: string, reportStatus: string, plannedInspectionDate: string) => {
        const Date = plannedInspectionDate.split(' ')[0]
        const Time = plannedInspectionDate.split(' ')[1] + ' ' + plannedInspectionDate.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            IR.fillTextInputField('Report Name',reportName),
            IR.selectDropdownItem('Inspection Type',inspectionType),
            Wait.for(Duration.ofSeconds(3)),
            IR.selectItemInlookupPopup('Inspectors',inspectors,'Resource ID'),
            IR.selectDropdownItem('Report Status',reportStatus),
            IR.selectSpecialDate('Planned Inspection Date',Date,0),
            IR.selectClock('Planned Inspection Date',Time),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deleteIR = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const editIR = {
    using: (IRInfo:DataTable) => {
        const Date = IRInfo.rowsHash().PlannedInspectionDate.split(' ')[0]
        const Time = IRInfo.rowsHash().PlannedInspectionDate.split(' ')[1] + ' ' + IRInfo.rowsHash().PlannedInspectionDate.split(' ')[2]
        return Task.where(`#actor Input all fields and save `,
            IR.setCookie(COOKIE_REPORT_NO,Attribute.called('value').of(IR.textInputFieldA('Report No.'))),
            IR.fillTextInputField('Report Name',IRInfo.rowsHash().ReportName),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(IR.ralationshipAttributeLookupFieldClearIcon('Inspectors')),
            IR.selectItemInlookupPopup('Inspectors',IRInfo.rowsHash().Inspectors,'Resource ID'),
            IR.selectDropdownItemA('Report Status',IRInfo.rowsHash().ReportStatus),
            IR.selectSpecialDate('Planned Inspection Date',Date,0),
            IR.selectClock('Planned Inspection Date',Time),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}