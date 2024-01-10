import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals, includes } from '@serenity-js/assertions';
import { Duration, List, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie, isVisible, Page } from '@serenity-js/web';

import { OK, SAVE } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_FUND_ID } from '../common/statics';
import { fund } from '../fund/EditFund';
import { projectTab } from '../project/components/ProjectTab';
import { scopingFinancial } from './ScopingFinancialTabFields';

export const saveFinancialScopingSummary = {
    using: (scopingInfo: DataTable) => {
        const items = List.of(scopingInfo.hashes())
        return Task.where(`#actor Input all financial scoping summary cell and save `,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 1, item.Previous),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 2, item.FY1),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 3, item.FY2),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 4, item.FY3),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 5, item.FY4),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 6, item.FY5),
                scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 7, item.Future),
            )),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const selectScopingMode = {
    using: (scopingMode: string) => {

        return Task.where(`#actor select financial scoping mode:${scopingMode}`,

            scopingFinancial.selectScopingType(scopingMode),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkFinancialScopingMode = {
    using: (scopingMode: string) => {

        return Task.where(`#actor check financial scoping mode with ${scopingMode}`,
            Ensure.eventually(Attribute.called('initialvalue').of(scopingFinancial.scopingTypeDropdownInputfield()), equals(scopingMode))
        )
    }
}

export const checkScopingDetailTab = {
    using: (projectCostTab: string, operatingCost: string, maintenanceCost: string) => {
        return Task.where(`#actor check financial scoping detail tab`,
            Ensure.eventually(scopingFinancial.scopingDetailTab(projectCostTab), isVisible()),
            Ensure.eventually(scopingFinancial.scopingDetailTab(operatingCost), isVisible()),
            Ensure.eventually(scopingFinancial.scopingDetailTab(maintenanceCost), isVisible()),
        )
    }
}

export const checkFinancialScopingSummaryData = {
    using: (scopingInfo: DataTable) => {
        const items = List.of(scopingInfo.hashes())
        return Task.where(`#actor check financial scoping summary Table cell value`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future),
            ))
        )
    }
}

export const saveScopingAllocation = {
    using: (scopingInfo: DataTable) => {
        return Task.where(`#actor save scoping allocation`,
            scopingFinancial.fillScopingSummaryTableCell(1, 1, scopingInfo.rowsHash().Previous),
            scopingFinancial.fillScopingSummaryTableCell(1, 2, scopingInfo.rowsHash().FY1),
            scopingFinancial.selectScopingStatus('Evaluation Approved'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const saveScopingDetailProjectCost = {
    using: (scopingInfo: DataTable) => {
        return Task.where(`#actor save scoping detail project cost allocation`,
            projectTab.clickTab('Scoping'),
            Wait.for(Duration.ofSeconds(5)),
            scopingFinancial.selectScopingType('Scoping Detail'),
            Wait.for(Duration.ofSeconds(5)),
            scopingFinancial.searchScopingDetailProjectCostTableFundInPopup(0, Cookie.called(COOKIE_FUND_ID).value()),
            scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(0, 1, scopingInfo.rowsHash().Previous),
            scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(0, 2, scopingInfo.rowsHash().FY1),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const fillScopingDetailProjectCostAllCell = {
    using: (scopingInfo: DataTable) => {
        const items = List.of(scopingInfo.hashes())
        return Task.where(`#actor save scoping detail project cost allocation`,
            items.forEach(({ actor, item }) => actor.attemptsTo(

                scopingFinancial.fillPhaseDropdownInputField(Number(item.row) - 1, 0, item.Phase),
                scopingFinancial.searchScopingDetailProjectCostTableFundInPopup(Number(item.row) - 1, Cookie.called(COOKIE_FUND_ID).value()),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 1, item.Previous),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 2, item.FY1),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 3, item.FY2),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 4, item.FY3),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 5, item.FY4),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 6, item.FY5),
                scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 7, item.Future),
                Click.on(scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(item.row) - 1, 'Add a New Line Item')),
            )),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkScopingDetailProjectCostAllCell = {
    using: (scopingInfo: DataTable) => {
        const totalRowItem = scopingInfo.hashes().pop()
        const detailRowItem = List.of(scopingInfo.hashes().reverse().slice(1))
        return Task.where(`#actor check scoping detail project cost allocation`,
            detailRowItem.forEach(({ actor, item }) => actor.attemptsTo(
                Ensure.eventually(Attribute.called('initialvalue').of(scopingFinancial.scopingDetailProjectCostTableAttributeCell(Number(item.row) - 1, 0)), equals(item.Phase)),
                Ensure.eventually(Attribute.called('initialvalue').of(scopingFinancial.scopingDetailProjectCostTableAttributeCell(Number(item.row) - 1, 1)), includes(fund.fundId)),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 0, item.Total),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 1, item.Previous),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 2, item.FY1),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 3, item.FY2),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 4, item.FY3),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 5, item.FY4),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 6, item.FY5),
                scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 7, item.Future),
            )),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(0, totalRowItem.Total),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(1, totalRowItem.Previous),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(2, totalRowItem.FY1),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(3, totalRowItem.FY2),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(4, totalRowItem.FY3),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(5, totalRowItem.FY4),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(6, totalRowItem.FY5),
            scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(7, totalRowItem.Future),
        )
    }
}

export const duplicateScopingDetailProjectCostRow = {
    using: (scopingDetailInfo: DataTable) => {
        return Task.where(`#actor duplicate scoping detail project cost row`,
            Click.on(scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(scopingDetailInfo.rowsHash().row) - 1, 'Duplicate This Line Item')),
            scopingFinancial.fillPhaseDropdownInputField(Number(scopingDetailInfo.rowsHash().row) + 1, 0, scopingDetailInfo.rowsHash().Phase),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const deleteScopingDetailProjectCostRow = {
    using: (rowNumber: string) => {
        return Task.where(`#actor delete scoping detail project cost row`,
            Click.on(scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(rowNumber) - 1, 'Remove This Line Item')),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const fillScopingDetailProjectCostInflation = {
    using: (inflationInfo: DataTable) => {
        return Task.where(`#actor fill scoping detail project cost inflation`,
            Click.on(scopingFinancial.scopingDetailProjectCostTableAdjustButton(Number(inflationInfo.rowsHash().row) - 1)),
            scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(inflationInfo.rowsHash().row), 0, inflationInfo.rowsHash().Total),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkScopingSummaryProjectCostCellReadOnly = {
    using: (inflationInfo: DataTable) => {
        const items = List.of(inflationInfo.hashes())
        const readOnlyRowItem = inflationInfo.hashes().shift()
        return Task.where(`#actor check scoping detail project cost cell read only`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5),
                scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future),
            )),

            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 0),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 1),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 1),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 2),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 3),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 4),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 5),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 6),
            scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 7),
        )
    }
}

export const checkScopingDataAsBudgetPage = {
    using: (pageName: string) => {
        return Task.where(`#actor check scoping data as budget page`,
            Ensure.eventually(Page.current().title(), includes(pageName)),
        )
    }
}

export const submitScopingDetailBudget = {
    using: () => {
        return Task.where(`#actor submit scoping detail budget information`,
            clickButton.using('Submit'),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}