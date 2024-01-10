"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMultiContractLineItems = exports.updateMultiContractLineItems = exports.checkContractLineItem = exports.checkMultiContractLineItems = exports.addMultiContractLineitems = exports.checkContractPaidExpense = exports.addContractLineItem = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
const ContractTab_1 = require("../components/ContractTab");
/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
exports.addContractLineItem = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return addLineAndfillFields.using(items);
    }
};
const checkContractPaidExpense = () => core_1.Task.where(`#actor check contract paid expoenses`, ContractTab_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.contractLineItem.paidExpenseSectionPanel(), (0, assertions_1.isPresent)()), (0, common_1.checkGridList)());
exports.checkContractPaidExpense = checkContractPaidExpense;
exports.addMultiContractLineitems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return addLineAndfillFields.using(items);
    }
};
const addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, ContractTab_1.contractTab.clickTab('Line Items'), assertions_1.Ensure.eventually(components_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickSectionButton.using(DefaultStaticParams_1.INSERT), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(components_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), core_1.Check.whether(components_1.contractLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
            .andIfSo(
        // 点击删除按钮
        components_1.contractLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        fillFields(item))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const fillFields = (item) => {
    return core_1.Task.where(`#actor fill line fileds`, components_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), components_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), components_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice), components_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity));
};
/**
 * 检查多行line item
 */
exports.checkMultiContractLineItems = {
    using: (lineItemsInfo, expectedResult) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return checkLineItemsTask.using(items, expectedResult);
    }
};
/**
 * 检查单条line item
 */
exports.checkContractLineItem = {
    using: (lineItemsInfo, expectedResult) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return checkLineItemsTask.using(items, expectedResult);
    }
};
const checkLineItemsTask = {
    using: (items, expectedResult) => {
        return core_1.Task.where(`#actor check line items value`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(components_1.contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), components_1.contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult), components_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult), components_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult), components_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult))));
    }
};
exports.updateMultiContractLineItems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor update multi line items`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环更新数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 给单元格填值
        fillFields(item))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.deleteMultiContractLineItems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return core_1.Task.where(`#actor delete multi line items`, ContractTab_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(components_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环删除数据
        items.forEach(({ actor, item }) => actor.attemptsTo(
        // 点击删除按钮
        components_1.contractLineItem.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
//# sourceMappingURL=ContractLineItem.js.map