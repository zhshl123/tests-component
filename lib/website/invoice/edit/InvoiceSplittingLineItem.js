"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiInvoiceSplittingLineItem = exports.updateMultiInvoiceSplittingLineItem = exports.checkMultiInvoiceSplittingLineItem = exports.addMultiInvoiceSplittingLineItems = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
exports.addMultiInvoiceSplittingLineItems = {
    using: (invoiceSplittingLineItemInfo) => {
        const items = core_1.List.of(invoiceSplittingLineItemInfo);
        return core_1.Task.where(`#actor add multi invoice splitting line items`, openEditLineItemDetailPopup(), web_1.Switch.to(components_1.invoiceLineitem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.invoiceLineitem.lineItemsSectionTitle('Invoice Line Item Splits'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickBulkEditSetionButton.using(DefaultStaticParams_1.INSERT), core_1.Check.whether(components_1.invoiceLineitem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
            .andIfSo(
        // 点击删除按钮
        components_1.invoiceLineitem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        fillFields.using(item))), components_1.invoiceLineitem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const openEditLineItemDetailPopup = () => core_1.Task.where(`#actor open edit line item detail popup`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
// 这里默认首条line item
components_1.invoiceLineitem.clickButtonInButtonGroup('1', DefaultStaticParams_1.POPUP), assertions_1.Ensure.eventually(components_1.invoiceLineitem.editLineItemDetailPopupPanel(), (0, web_1.isVisible)()));
const fillFields = {
    using: (item) => core_1.Task.where(`#actor fill invoice splitting line item fileds`, components_1.invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project), components_1.invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund), core_1.Check.whether(item.Amount, (0, assertions_1.equals)('')).andIfSo(core_1.Log.the('Amount value is empty, skip this field')).otherwise(components_1.invoiceLineitem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount)), core_1.Check.whether(item.Percentage, (0, assertions_1.equals)('')).andIfSo(core_1.Log.the('Percentage value is empty, skip this field')).otherwise(components_1.invoiceLineitem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage)))
};
exports.checkMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo, expectedResult) => {
        const items = core_1.List.of(splittingLineItemInfo);
        return core_1.Task.where(`#actor check multi invoice splitting line items`, openEditLineItemDetailPopup(), web_1.Switch.to(components_1.invoiceLineitem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.invoiceLineitem.lineItemsSectionTitle('Invoice Line Item Splits'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Text.of(components_1.invoiceLineitem.tableCell(item.rowNumber, 'Project')), (0, assertions_1.includes)(item.Project)), components_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Fund', item.Fund, expectedResult), components_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Percentage', item.Percentage, expectedResult), components_1.invoiceLineitem.checkCellValue(item.rowNumber, 'Amount', item.Amount, expectedResult))), components_1.invoiceLineitem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)));
    }
};
exports.updateMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo) => {
        const items = core_1.List.of(splittingLineItemInfo);
        return core_1.Task.where(`#actor update multi invoice splitting line items`, openEditLineItemDetailPopup(), web_1.Switch.to(components_1.invoiceLineitem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环修改数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 给单元格填值
        fillFields.using(item))), components_1.invoiceLineitem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.deleteMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo) => {
        const items = core_1.List.of(splittingLineItemInfo);
        return core_1.Task.where(`#actor delete multi invoice splitting line items`, openEditLineItemDetailPopup(), web_1.Switch.to(components_1.invoiceLineitem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.invoiceLineitem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环修改数据
        items.forEach(({ actor, item }) => actor.attemptsTo(components_1.invoiceLineitem.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), components_1.invoiceLineitem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
//# sourceMappingURL=InvoiceSplittingLineItem.js.map