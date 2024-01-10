"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFinancialDetail = exports.checkFinancialTable = exports.saveFinancialDetail = exports.saveFinancialSummary = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const FinancialDetail_1 = require("./FinancialDetail");
const FinancialScoping_1 = require("./FinancialScoping");
exports.saveFinancialSummary = {
    using: (financialTable) => {
        const items = core_1.List.of(financialTable.hashes());
        return core_1.Task.where(`#actor Input all cell and save `, FillFinancialTable.using(items), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const FillFinancialTable = {
    using: (items) => {
        return core_1.Task.where(`#actor fill Table cell`, items.forEach(({ actor, item }) => actor.attemptsTo(FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 1, item.Previous), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 2, item.FY1), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 3, item.FY2), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 4, item.FY3), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 5, item.FY4), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 6, item.FY5), FinancialScoping_1.financial.fillScopingSummaryTableCell(Number(item.row), 7, item.Future))));
    }
};
const FillDetail = {
    using: (items) => {
        return core_1.Task.where(`#actor fill Table cell`, items.forEach(({ actor, item }) => actor.attemptsTo(FinancialDetail_1.financialDetail.searchScopingDetailProjectCostTableFundInPopup(Number(item.row) - 1, item.Fund), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 1, item.Previous), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 2, item.FY1), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 3, item.FY2), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 4, item.FY3), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 5, item.FY4), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 6, item.FY5), FinancialDetail_1.financialDetail.fillScopingDetailProjectCostTableCurrencyCell(Number(item.row) - 1, 7, item.Future), web_1.Click.on(FinancialDetail_1.financialDetail.scopingDetailProjectCostTableOptionButton(Number(item.row) - 1, 'Add a New Line Item')))));
    }
};
exports.saveFinancialDetail = {
    using: (financialTable) => {
        const items = core_1.List.of(financialTable.hashes());
        return core_1.Task.where(`#actor Input all cell and save `, FinancialScoping_1.financial.selectScopingType('Scoping Detail'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), FillDetail.using(items), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.checkFinancialTable = {
    using: (financialTable, expectedResult) => {
        const items = core_1.List.of(financialTable.hashes());
        return checkTable.using(items, expectedResult);
    }
};
const checkTable = {
    using: (items, expectedResult) => {
        return core_1.Task.where(`#actor check Table cell value`, items.forEach(({ actor, item }) => actor.attemptsTo(FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 0, item.Total), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 1, item.Previous), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 2, item.FY1), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 3, item.FY2), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 4, item.FY3), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 5, item.FY4), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 6, item.FY5), FinancialScoping_1.financial.checkScopingSummaryTableCellValue(Number(item.row), 7, item.Future))));
    }
};
exports.checkFinancialDetail = {
    using: (scopingInfo) => {
        const totalRowItem = scopingInfo.hashes().pop();
        const detailRowItem = core_1.List.of(scopingInfo.hashes().reverse().slice(1));
        return core_1.Task.where(`#actor check scoping detail project cost allocation`, detailRowItem.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(FinancialDetail_1.financialDetail.scopingDetailProjectCostTableFundLookupInputField(Number(item.row) - 1)), (0, assertions_1.includes)(item.Fund)), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 0, item.Total), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 1, item.Previous), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 2, item.FY1), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 3, item.FY2), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 4, item.FY3), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 5, item.FY4), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 6, item.FY5), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableCurrencyCellValue(Number(item.row) - 1, 7, item.Future))), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(0, totalRowItem.Total), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(1, totalRowItem.Previous), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(2, totalRowItem.FY1), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(3, totalRowItem.FY2), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(4, totalRowItem.FY3), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(5, totalRowItem.FY4), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(6, totalRowItem.FY5), FinancialDetail_1.financialDetail.checkScopingDetailProjectCostTableFootCurrencyCellValue(7, totalRowItem.Future));
    }
};
//# sourceMappingURL=FinancialForm.js.map