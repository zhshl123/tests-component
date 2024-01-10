import { DataTable } from '@cucumber/cucumber';
import { isPresent } from '@serenity-js/assertions';
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { EDIT, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, openPage } from '../common';
import { pageTabs } from '../common/abstract';
import { BROWSE_INSPECTION_REPORT } from '../common/statics/PageName';
import { browseInspectionReport, inspectionReportAdd } from './components/EditInspectionReportFields';
import { inspectionReportLineItem } from './components/InspectionReportLineItemFields';

export class InspectionReportLineItemCrud {

    openLineItemPage = (reportName: string) =>
        Task.where(`#actor open inspection report line item page`,
            openPage.using(BROWSE_INSPECTION_REPORT),
            Wait.for(Duration.ofSeconds(3)),
            browseInspectionReport.checkSearchResult(1, reportName, SUCCEEDED),
            browseInspectionReport.clickButtonInGrid(EDIT),
            inspectionReportAdd.checkPopupWindow(0),
            pageTabs.clickTab('Line Item'),
            Wait.for(Duration.ofSeconds(5))
        )


    addAllFields = (lineItemInfo: DataTable) => {

        return Task.where(`#actor add inspection report line item`,
            this.deleteOldLineItems(),
            clickButton.using('Add Line'),
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 4, lineItemInfo.rowsHash().SOVItem),
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 5, lineItemInfo.rowsHash().PrimeSub),
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 6, lineItemInfo.rowsHash().TradePosition),
            inspectionReportLineItem.fillTextInputCell('Labor', 1, 7, lineItemInfo.rowsHash().NumberOfWorkers),
            inspectionReportLineItem.fillTextInputCell('Labor', 1, 8, lineItemInfo.rowsHash().HoursWorked),
            inspectionReportLineItem.fillTextAreaInputCell('Labor', 1, 9, lineItemInfo.rowsHash().Notes),

            clickButton.using('Add Line', 1),
            inspectionReportLineItem.selectDropdownItem('Equipment', 1, 4, lineItemInfo.rowsHash().SOVItem_E),
            inspectionReportLineItem.selectDropdownItem('Equipment', 1, 5, lineItemInfo.rowsHash().Status),
            inspectionReportLineItem.fillTextInputCell('Equipment', 1, 6, lineItemInfo.rowsHash().Quantity_E),
            inspectionReportLineItem.fillTextInputCell('Equipment', 1, 7, lineItemInfo.rowsHash().HoursWorked_E),
            inspectionReportLineItem.fillTextAreaInputCell('Equipment', 1, 8, lineItemInfo.rowsHash().Notes_E),

            clickButton.using('Add Line', 2),
            inspectionReportLineItem.selectDropdownItem('Material', 1, 4, lineItemInfo.rowsHash().SOVItem_M),
            inspectionReportLineItem.selectDropdownItem('Material', 1, 5, lineItemInfo.rowsHash().Unit),
            inspectionReportLineItem.fillTextInputCell('Material', 1, 6, lineItemInfo.rowsHash().Quantity_M),
            inspectionReportLineItem.fillTextAreaInputCell('Material', 1, 7, lineItemInfo.rowsHash().Notes_M),
            // 提交保存
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    updateAllFields = (lineItemInfo: DataTable) => {
        return Task.where(`#actor update inspection report line item information`,
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 4, lineItemInfo.rowsHash().SOVItem),
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 5, lineItemInfo.rowsHash().PrimeSub),
            inspectionReportLineItem.selectDropdownItem('Labor', 1, 6, lineItemInfo.rowsHash().TradePosition),
            inspectionReportLineItem.fillTextInputCell('Labor', 1, 7, lineItemInfo.rowsHash().NumberOfWorkers),
            inspectionReportLineItem.fillTextInputCell('Labor', 1, 8, lineItemInfo.rowsHash().HoursWorked),
            inspectionReportLineItem.fillTextAreaInputCell('Labor', 1, 9, lineItemInfo.rowsHash().Notes),

            inspectionReportLineItem.selectDropdownItem('Equipment', 1, 4, lineItemInfo.rowsHash().SOVItem_E),
            inspectionReportLineItem.selectDropdownItem('Equipment', 1, 5, lineItemInfo.rowsHash().Status),
            inspectionReportLineItem.fillTextInputCell('Equipment', 1, 6, lineItemInfo.rowsHash().Quantity_E),
            inspectionReportLineItem.fillTextInputCell('Equipment', 1, 7, lineItemInfo.rowsHash().HoursWorked_E),
            inspectionReportLineItem.fillTextAreaInputCell('Equipment', 1, 8, lineItemInfo.rowsHash().Notes_E),

            inspectionReportLineItem.selectDropdownItem('Material', 1, 4, lineItemInfo.rowsHash().SOVItem_M),
            inspectionReportLineItem.selectDropdownItem('Material', 1, 5, lineItemInfo.rowsHash().Unit),
            inspectionReportLineItem.fillTextInputCell('Material', 1, 6, lineItemInfo.rowsHash().Quantity_M),
            inspectionReportLineItem.fillTextAreaInputCell('Material', 1, 7, lineItemInfo.rowsHash().Notes_M),
            // 提交保存
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }



    delete = (lineItemInfo: DataTable) => {
        return Task.where(`#actor delete inspection report line item information`,
            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Labor', Number(lineItemInfo.rowsHash().No)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickcheckboxInGrid('Labor', Number(lineItemInfo.rowsHash().No)),
                clickButton.using('Remove'),
            ),

            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Equipment', Number(lineItemInfo.rowsHash().No_E)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickcheckboxInGrid('Equipment', Number(lineItemInfo.rowsHash().No_E)),
                clickButton.using('Remove', 1),
            ),

            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Material', Number(lineItemInfo.rowsHash().No_M)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickcheckboxInGrid('Material', Number(lineItemInfo.rowsHash().No_M)),
                clickButton.using('Remove', 2),
            ),

            // 提交保存
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }



    checkAllFieldsInfo = (lineItemInfo: DataTable) => {

        return Task.where(`#actor check inspection report line item information`,
            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Labor', Number(lineItemInfo.rowsHash().No)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().SOVItem, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().PrimeSub, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().TradePosition, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().NumberOfWorkers, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().HoursWorked, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Labor', 1, lineItemInfo.rowsHash().Notes, SUCCEEDED),
            ),
            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Equipment', Number(lineItemInfo.rowsHash().No_E)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.checkGridCellValue('Equipment', 1, lineItemInfo.rowsHash().SOVItem_E, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Equipment', 1, lineItemInfo.rowsHash().Status, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Equipment', 1, lineItemInfo.rowsHash().Quantity_E, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Equipment', 1, lineItemInfo.rowsHash().HoursWorked_E, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Equipment', 1, lineItemInfo.rowsHash().Notes_E, SUCCEEDED),
            ),
            Check.whether(
                inspectionReportLineItem.checkboxInGrid('Material', Number(lineItemInfo.rowsHash().No_M)), isPresent()
            ).andIfSo(
                inspectionReportLineItem.checkGridCellValue('Material', 1, lineItemInfo.rowsHash().SOVItem_M, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Material', 1, lineItemInfo.rowsHash().Unit, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Material', 1, lineItemInfo.rowsHash().Quantity_M, SUCCEEDED),
                inspectionReportLineItem.checkGridCellValue('Material', 1, lineItemInfo.rowsHash().Notes_M, SUCCEEDED),
            )
        )
    }



    deleteOldLineItems = () => {

        return Task.where(`#actor open inspection report line item page`,
            Wait.for(Duration.ofSeconds(2)),
            Check.whether(
                inspectionReportLineItem.gridListCell('Labor', 1, 4), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickSelectAllcheckbox('Labor'),
                clickButton.using('Remove'),
                inspectionReportAdd.setCookie('deleteLineitemFalg', 'true')
            ),

            Check.whether(
                inspectionReportLineItem.gridListCell('Equipment', 1, 4), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickSelectAllcheckbox('Equipment'),
                clickButton.using('Remove', 1),
                inspectionReportAdd.setCookie('deleteLineitemFalg', 'true')
            ),

            Check.whether(
                inspectionReportLineItem.gridListCell('Material', 1, 4), isPresent()
            ).andIfSo(
                inspectionReportLineItem.clickSelectAllcheckbox('Material'),
                clickButton.using('Remove', 2),
                inspectionReportAdd.setCookie('deleteLineitemFalg', 'true')
            ),

            Check.whether(
                Cookie.called('deleteLineitemFalg'), isPresent()
            ).andIfSo(
                clickButton.using(SAVE),
                Wait.for(Duration.ofSeconds(5),
                )
            )
        )
    }

}

export const inspectionReportLineItemCrud = new InspectionReportLineItemCrud()