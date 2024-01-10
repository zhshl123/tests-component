import { DataTable } from '@cucumber/cucumber'
import { Ensure, isPresent } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Click, Cookie } from '@serenity-js/web'

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { formatted_now } from '../../website/common'
import { clickButton, targetButton } from '../common'
import { alertMssageBox, buttonInAlertMessageBox, checkAndClosePopupWindow } from '../common/PopupWindow'
import { COOKIE_INSPECTION_REPORT_NAME } from '../common/statics/StaticCookie'
import { inspectionReportAdd, inspectionReportEdit } from './components/EditInspectionReportFields'

export class InpectionReportCrud {

    checkRequiredInfo = (inspectionReportInfo: DataTable) => {
        return Task.where(`#actor check Inspection Report information`,
            inspectionReportEdit.checkTextInputFieldValue('Report Name', Cookie.called(COOKIE_INSPECTION_REPORT_NAME).value(), SUCCEEDED),
            inspectionReportEdit.checkReadOnlyFieldValue('Inspection Type', inspectionReportInfo.rowsHash().InspectionType, SUCCEEDED),
            inspectionReportEdit.checkDropdownFieldValue('Inspector', inspectionReportInfo.rowsHash().Inspector, SUCCEEDED),
        )
    }



    updateRequiredInfo = (inspectionReportInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor update Inspection Report information`,
            inspectionReportEdit.fillTextInputField('Report Name', inspectionReportInfo.rowsHash().ReportName + timestamp),
            inspectionReportEdit.setCookie(COOKIE_INSPECTION_REPORT_NAME, inspectionReportInfo.rowsHash().ReportName + timestamp),
            Wait.for(Duration.ofSeconds(2)),
            inspectionReportEdit.clearDropdownSelectedItem('Inspector'),
            inspectionReportEdit.selectItemInPopup('Inspector', inspectionReportInfo.rowsHash().Inspector, 1, 0),
            inspectionReportEdit.fillDateInputField('Planned Inspection Date', inspectionReportInfo.rowsHash().PlannedInspectionDate),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
        )
    }



    delete = () =>
        Task.where(`#actor delete Inspection Report information`,
            clickButton.using(DELETE),
            Ensure.eventually(alertMssageBox(), isPresent()),
            Click.on(buttonInAlertMessageBox(OK)),
            Wait.for(Duration.ofSeconds(3)),
        )

    addByRequiredFields = (inspectionReportInfo: DataTable) => {
        return Task.where(`#actor add Inspection Report`,
            this.fillFields(inspectionReportInfo),
            Wait.for(Duration.ofSeconds(2)),
            Click.on(targetButton.getButton(SAVE)),
            checkAndClosePopupWindow()
        )
    }



    fillFields = (inspectionReportInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill Inspection Report required field`,

            inspectionReportAdd.fillTextInputField('Report Name', inspectionReportInfo.rowsHash().ReportName + timestamp),
            inspectionReportAdd.setCookie(COOKIE_INSPECTION_REPORT_NAME, inspectionReportInfo.rowsHash().ReportName + timestamp),
            inspectionReportAdd.selectDropdownItem('Inspection Type', inspectionReportInfo.rowsHash().InspectionType),
            Wait.for(Duration.ofSeconds(5)),

            inspectionReportAdd.selectItemInPopup('Inspector', inspectionReportInfo.rowsHash().Inspector, 1, 0),
            inspectionReportAdd.fillDateInputField('Planned Inspection Date', inspectionReportInfo.rowsHash().PlannedInspectionDate),

        )
    }


}

export const inspectionReportCrud = new InpectionReportCrud()