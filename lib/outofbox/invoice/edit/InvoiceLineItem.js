"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiInvoiceLineItems = exports.updateMultiInvoiceLineItem = exports.checkInvoiceLineItems = exports.addMultiInvoiceLineItems = exports.addInvoiceLineItem = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
const InvoiceLineitemFields_1 = require("../components/InvoiceLineitemFields");
/**
 * 添加line item, line item从关联的contract或PO全选导入
 * @returns
 */
exports.addInvoiceLineItem = {
    using: (invoiceLineItemInfo) => {
        const items = core_1.List.of(invoiceLineItemInfo);
        return core_1.Task.where(`#actor add invoice Line item by load from associated contract or purchase`, components_1.invoiceTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Wait.until(InvoiceLineitemFields_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), common_1.clickBulkEditSetionButton.using(DefaultStaticParams_1.LOAD_FROM), 
        // 遍历数组，循环更新数据
        items.forEach(({ actor, item }) => actor.attemptsTo(InvoiceLineitemFields_1.invoiceLineitem.selectContractLineItemInPopup(item.SOVItem), 
        // 给单元格填值
        fillFields.using(item))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), (0, common_1.waitPageSaveLodingLayerInvisible)());
    }
};
/**
 * 添加line item(针对invoice only)
 *
 */
exports.addMultiInvoiceLineItems = {
    using: (invoiceLineitemInfo) => {
        const items = core_1.List.of(invoiceLineitemInfo);
        return core_1.Task.where(`#actor add invoice Line items`, components_1.invoiceTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(InvoiceLineitemFields_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickBulkEditSetionButton.using(DefaultStaticParams_1.INSERT), assertions_1.Ensure.eventually(InvoiceLineitemFields_1.invoiceLineitem.buttonGroupCell(item.rowNumber), (0, web_1.isVisible)()), core_1.Check.whether(InvoiceLineitemFields_1.invoiceLineitem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
            .andIfSo(
        // 点击删除按钮
        InvoiceLineitemFields_1.invoiceLineitem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        fillFields.using(item))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const fillFields = {
    using: (item) => core_1.Task.where(`#actor fill invoice line item fileds`, InvoiceLineitemFields_1.invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), InvoiceLineitemFields_1.invoiceLineitem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor), InvoiceLineitemFields_1.invoiceLineitem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), InvoiceLineitemFields_1.invoiceLineitem.fillNumberInputField(item.rowNumber, 'Unit Price', item.UnitPrice), InvoiceLineitemFields_1.invoiceLineitem.fillNumberInputField(item.rowNumber, 'Quantity', item.Quantity), InvoiceLineitemFields_1.invoiceLineitem.fillNumberInputField(item.rowNumber, 'Retainage Rate', item.RetainageRate))
};
exports.checkInvoiceLineItems = {
    using: (lineItemsInfo, expectedResult) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor check invoice line item`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(InvoiceLineitemFields_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult), InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult), InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Unit Price', item.UnitPrice, expectedResult), InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Quantity', item.Quantity, expectedResult), InvoiceLineitemFields_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Retainage Rate', item.RetainageRate, expectedResult))));
    }
};
exports.updateMultiInvoiceLineItem = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor update multi invoice line items`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(InvoiceLineitemFields_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环更新数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 给单元格填值
        fillFields.using(item))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.deleteMultiInvoiceLineItems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor delete multi line items`, components_1.invoiceTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(InvoiceLineitemFields_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环删除数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 点击删除按钮
        InvoiceLineitemFields_1.invoiceLineitem.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
//# sourceMappingURL=InvoiceLineItem.js.map