import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Duration, List, Task, Wait } from '@serenity-js/core';
import { Attribute, Click } from '@serenity-js/web';

import { OK, SAVE } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { financialDetail } from './FinancialDetail';
import { financial } from './FinancialScoping';

export const saveFinancialSummary = {
    using: (financialTable: DataTable) => {
        const items = List.of(financialTable.hashes())
        return Task.where(`#actor Input all cell and save `,
            FillFinancialTable.using(items),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

const FillFinancialTable = {
    using: (items: List<any>) => {
        return Task.where(`#actor fill Table cell`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                financial.fillScopingSummaryTableCell(Number(item.row), 1, item.Previous),
                financial.fillScopingSummaryTableCell(Number(item.row), 2, item.FY1),
                financial.fillScopingSummaryTableCell(Number(item.row), 3, item.FY2),
                financial.fillScopingSummaryTableCell(Number(item.row), 4, item.FY3),
                financial.fillScopingSummaryTableCell(Number(item.row), 5, item.FY4),
                financial.fillScopingSummaryTableCell(Number(item.row), 6, item.FY5),
                financial.fillScopingSummaryTableCell(Number(item.row), 7, item.Future),
            )),
        )
    }
}

const FillDetail = {
    using: (items: List<any>) => {
        return Task.where(`#actor fill Table cell`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                financialDetail.searchScopingDetailProjectCostTableFundInPopup(Number(item.row) - 1, item.Fund),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 1, item.Previous),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 2, item.FY1),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 3, item.FY2),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 4, item.FY3),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 5, item.FY4),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 6, item.FY5),
                financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 7, item.Future),
                Click.on(financialDetail.scopingDetailProjectCostTableOptionButton(Number(item.row) - 1, 'Add a New Line Item')),
            )),
        )
    }
}

export const saveFinancialDetail = {
    using: (financialTable: DataTable) => {
        const items = List.of(financialTable.hashes())
        return Task.where(`#actor Input all cell and save `,
            financial.selectScopingType('Scoping Detail'),
            Wait.for(Duration.ofSeconds(5)),
            FillDetail.using(items),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const checkFinancialTable = {
    using: (financialTable: DataTable, expectedResult: string) => {
        const items = List.of(financialTable.hashes())
        return checkTable.using(items, expectedResult)
    }
}

const checkTable = {
    using: (items: List<any>, expectedResult: string) => {
        return Task.where(`#actor check Table cell value`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                financial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5),
                financial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future),
            ))
        )
    }
}

export const checkFinancialDetail = {
    using: (scopingInfo: DataTable) => {
        const totalRowItem = scopingInfo.hashes().pop()
        const detailRowItem = List.of(scopingInfo.hashes().reverse().slice(1))
        return Task.where(`#actor check scoping detail project cost allocation`,
            detailRowItem.forEach(({ actor, item }) => actor.attemptsTo(
                Ensure.eventually(Attribute.called('initialvalue').of(financialDetail.scopingDetailProjectCostTableFundLookupInputField(Number(item.row) - 1)), includes(item.Fund)),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 0, item.Total),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 1, item.Previous),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 2, item.FY1),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 3, item.FY2),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 4, item.FY3),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 5, item.FY4),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 6, item.FY5),
                financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 7, item.Future),
            )),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(0, totalRowItem.Total),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(1, totalRowItem.Previous),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(2, totalRowItem.FY1),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(3, totalRowItem.FY2),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(4, totalRowItem.FY3),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(5, totalRowItem.FY4),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(6, totalRowItem.FY5),
            financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(7, totalRowItem.Future),
        )
    }
}

