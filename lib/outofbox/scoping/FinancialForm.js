"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitScopingDetailBudget = exports.checkScopingDataAsBudgetPage = exports.checkScopingSummaryProjectCostCellReadOnly = exports.fillScopingDetailProjectCostInflation = exports.deleteScopingDetailProjectCostRow = exports.duplicateScopingDetailProjectCostRow = exports.checkScopingDetailProjectCostAllCell = exports.fillScopingDetailProjectCostAllCell = exports.saveScopingDetailProjectCost = exports.saveScopingAllocation = exports.checkFinancialScopingSummaryData = exports.checkScopingDetailTab = exports.checkFinancialScopingMode = exports.selectScopingMode = exports.saveFinancialScopingSummary = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditFund_1 = require("../fund/EditFund");
const ProjectTab_1 = require("../project/components/ProjectTab");
const ScopingFinancialTabFields_1 = require("./ScopingFinancialTabFields");
exports.saveFinancialScopingSummary = {
    using: (scopingInfo) => {
        const items = core_1.List.of(scopingInfo.hashes());
        return core_1.Task.where(`#actor Input all financial scoping summary cell and save `, items.forEach(({ actor, item }) => actor.attemptsTo(ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 1, item.Previous), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 2, item.FY1), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 3, item.FY2), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 4, item.FY3), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 5, item.FY4), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 6, item.FY5), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(Number(item.row), 7, item.Future))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.selectScopingMode = {
    using: (scopingMode) => {
        return core_1.Task.where(`#actor select financial scoping mode:${scopingMode}`, ScopingFinancialTabFields_1.scopingFinancial.selectScopingType(scopingMode), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkFinancialScopingMode = {
    using: (scopingMode) => {
        return core_1.Task.where(`#actor check financial scoping mode with ${scopingMode}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(ScopingFinancialTabFields_1.scopingFinancial.scopingTypeDropdownInputfield()), (0, assertions_1.equals)(scopingMode)));
    }
};
exports.checkScopingDetailTab = {
    using: (projectCostTab, operatingCost, maintenanceCost) => {
        return core_1.Task.where(`#actor check financial scoping detail tab`, assertions_1.Ensure.eventually(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailTab(projectCostTab), (0, web_1.isVisible)()), assertions_1.Ensure.eventually(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailTab(operatingCost), (0, web_1.isVisible)()), assertions_1.Ensure.eventually(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailTab(maintenanceCost), (0, web_1.isVisible)()));
    }
};
exports.checkFinancialScopingSummaryData = {
    using: (scopingInfo) => {
        const items = core_1.List.of(scopingInfo.hashes());
        return core_1.Task.where(`#actor check financial scoping summary Table cell value`, items.forEach(({ actor, item }) => actor.attemptsTo(ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future))));
    }
};
exports.saveScopingAllocation = {
    using: (scopingInfo) => {
        return core_1.Task.where(`#actor save scoping allocation`, ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(1, 1, scopingInfo.rowsHash().Previous), ScopingFinancialTabFields_1.scopingFinancial.fillScopingSummaryTableCell(1, 2, scopingInfo.rowsHash().FY1), ScopingFinancialTabFields_1.scopingFinancial.selectScopingStatus('Evaluation Approved'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.saveScopingDetailProjectCost = {
    using: (scopingInfo) => {
        return core_1.Task.where(`#actor save scoping detail project cost allocation`, ProjectTab_1.projectTab.clickTab('Scoping'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ScopingFinancialTabFields_1.scopingFinancial.selectScopingType('Scoping Detail'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ScopingFinancialTabFields_1.scopingFinancial.searchScopingDetailProjectCostTableFundInPopup(0, web_1.Cookie.called(statics_1.COOKIE_FUND_ID).value()), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(0, 1, scopingInfo.rowsHash().Previous), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(0, 2, scopingInfo.rowsHash().FY1), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillScopingDetailProjectCostAllCell = {
    using: (scopingInfo) => {
        const items = core_1.List.of(scopingInfo.hashes());
        return core_1.Task.where(`#actor save scoping detail project cost allocation`, items.forEach(({ actor, item }) => actor.attemptsTo(ScopingFinancialTabFields_1.scopingFinancial.fillPhaseDropdownInputField(Number(item.row) - 1, 0, item.Phase), ScopingFinancialTabFields_1.scopingFinancial.searchScopingDetailProjectCostTableFundInPopup(Number(item.row) - 1, web_1.Cookie.called(statics_1.COOKIE_FUND_ID).value()), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 1, item.Previous), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 2, item.FY1), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 3, item.FY2), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 4, item.FY3), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 5, item.FY4), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 6, item.FY5), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 7, item.Future), web_1.Click.on(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(item.row) - 1, 'Add a New Line Item')))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingDetailProjectCostAllCell = {
    using: (scopingInfo) => {
        const totalRowItem = scopingInfo.hashes().pop();
        const detailRowItem = core_1.List.of(scopingInfo.hashes().reverse().slice(1));
        return core_1.Task.where(`#actor check scoping detail project cost allocation`, detailRowItem.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableAttributeCell(Number(item.row) - 1, 0)), (0, assertions_1.equals)(item.Phase)), assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableAttributeCell(Number(item.row) - 1, 1)), (0, assertions_1.includes)(EditFund_1.fund.fundId)), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 0, item.Total), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 1, item.Previous), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 2, item.FY1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 3, item.FY2), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 4, item.FY3), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 5, item.FY4), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 6, item.FY5), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 7, item.Future))), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(0, totalRowItem.Total), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(1, totalRowItem.Previous), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(2, totalRowItem.FY1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(3, totalRowItem.FY2), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(4, totalRowItem.FY3), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(5, totalRowItem.FY4), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(6, totalRowItem.FY5), ScopingFinancialTabFields_1.scopingFinancial.checkScopingDetailProjectCostTableFootCurrencyCellValue(7, totalRowItem.Future));
    }
};
exports.duplicateScopingDetailProjectCostRow = {
    using: (scopingDetailInfo) => {
        return core_1.Task.where(`#actor duplicate scoping detail project cost row`, web_1.Click.on(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(scopingDetailInfo.rowsHash().row) - 1, 'Duplicate This Line Item')), ScopingFinancialTabFields_1.scopingFinancial.fillPhaseDropdownInputField(Number(scopingDetailInfo.rowsHash().row) + 1, 0, scopingDetailInfo.rowsHash().Phase), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.deleteScopingDetailProjectCostRow = {
    using: (rowNumber) => {
        return core_1.Task.where(`#actor delete scoping detail project cost row`, web_1.Click.on(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableOptionButton(Number(rowNumber) - 1, 'Remove This Line Item')), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillScopingDetailProjectCostInflation = {
    using: (inflationInfo) => {
        return core_1.Task.where(`#actor fill scoping detail project cost inflation`, web_1.Click.on(ScopingFinancialTabFields_1.scopingFinancial.scopingDetailProjectCostTableAdjustButton(Number(inflationInfo.rowsHash().row) - 1)), ScopingFinancialTabFields_1.scopingFinancial.fillScopingDetailProjectCostTableCurrencyCell(Number(inflationInfo.rowsHash().row), 0, inflationInfo.rowsHash().Total), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingSummaryProjectCostCellReadOnly = {
    using: (inflationInfo) => {
        const items = core_1.List.of(inflationInfo.hashes());
        const readOnlyRowItem = inflationInfo.hashes().shift();
        return core_1.Task.where(`#actor check scoping detail project cost cell read only`, items.forEach(({ actor, item }) => actor.attemptsTo(ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future))), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 0), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 1), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 2), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 3), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 4), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 5), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 6), ScopingFinancialTabFields_1.scopingFinancial.checkScopingSummaryTableCellIsReadOnly(Number(readOnlyRowItem.row), 7));
    }
};
exports.checkScopingDataAsBudgetPage = {
    using: (pageName) => {
        return core_1.Task.where(`#actor check scoping data as budget page`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.includes)(pageName)));
    }
};
exports.submitScopingDetailBudget = {
    using: () => {
        return core_1.Task.where(`#actor submit scoping detail budget information`, common_1.clickButton.using('Submit'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=FinancialForm.js.map