"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuotesLineItems = exports.checkQuoteLineItem = exports.checkMultiQuotesLineItems = exports.addQuotesLineItems = exports.addQuotes = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const QuotesField_1 = require("../components/QuotesField");
const SolicitationTab_1 = require("../components/SolicitationTab");
exports.addQuotes = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return exports.addQuotesLineItems.using(items);
    }
};
exports.addQuotesLineItems = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Quotes'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickSectionButton.using('Insert'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(QuotesField_1.quotesFields.editableTableBox(), (0, web_1.isVisible)()), core_1.Check.whether(QuotesField_1.quotesFields.tableCell(String(Number(item.rowNumber) + 1), 'Bid Spec No.'), (0, web_1.isVisible)()).andIfSo(QuotesField_1.quotesFields.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), 'Remove')), 
        // 给Field填值
        QuotesField_1.quotesFields.fillTextInputField(item.rowNumber, 'Bid Spec No.', item.BidSpecificationNumber), QuotesField_1.quotesFields.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SovItemAutoID))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
/**
 * 检查多行line item
 */
exports.checkMultiQuotesLineItems = {
    using: (lineItemsInfo, expectedResult) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return expectedResult == DefaultStaticParams_1.SUCCEEDED ? checkLineItemsTask.using(items, expectedResult) : checkEmptyDataTable();
    }
};
/**
 * 检查单条line item
 */
exports.checkQuoteLineItem = {
    using: (lineItemsInfo, expectedResult) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return checkLineItemsTask.using(items, expectedResult);
    }
};
const checkLineItemsTask = {
    using: (items, expectedResult) => {
        return core_1.Task.where(`#actor check line items value`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(QuotesField_1.quotesFields.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(QuotesField_1.quotesFields.checkCellValue(item.rowNumber, 'Bid Spec No.', item.BidSpecificationNumber, expectedResult), QuotesField_1.quotesFields.checkCellValue(item.rowNumber, 'SOV Item', item.SovItemAutoID, expectedResult))));
    }
};
const checkEmptyDataTable = () => {
    return core_1.Task.where(`#actor check line items value`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(QuotesField_1.quotesFields.emptyDataTable(), (0, web_1.isVisible)()));
};
exports.deleteQuotesLineItems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor delete multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Quotes'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(QuotesField_1.quotesFields.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环删除数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 点击删除按钮
        QuotesField_1.quotesFields.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=SolicitationQuotesTab.js.map