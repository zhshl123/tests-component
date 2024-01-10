"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFields = exports.checkMultiCOLineItems = exports.fillFields = exports.itemsForEach = exports.addMultiCOLineItem = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const COLineItemFields_1 = require("./components/COLineItemFields");
exports.addMultiCOLineItem = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo);
        return core_1.Task.where(`#actor add CO line item information`, core_1.Check.whether(COLineItemFields_1.COLineItem.contractSummaryPanel(), (0, assertions_1.isPresent)()).andIfSo(common_1.clickSectionButton.using(DefaultStaticParams_1.ADD), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.contractSummaryPopup(), (0, web_1.isVisible)()), web_1.Switch.to(COLineItemFields_1.COLineItem.contractSummaryPopup()).and((0, common_1.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)), web_1.Click.on(COLineItemFields_1.COLineItem.viewIconInContractSummaryPanel()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.viewCOLineItemPanel(), (0, web_1.isVisible)()), web_1.Switch.to(COLineItemFields_1.COLineItem.viewCOLineItemPanel()).and(exports.itemsForEach.using(items))).otherwise(web_1.Switch.to(COLineItemFields_1.COLineItem.changeItemsPanel()).and(exports.itemsForEach.using(items))), 
        // 提交保存
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.itemsForEach = {
    using: (items) => {
        return core_1.Task.where(`#actor for each items information`, items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickSectionButton.using(DefaultStaticParams_1.INSERT), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.editableTableBox(), (0, web_1.isVisible)()), core_1.Check.whether(COLineItemFields_1.COLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
            .andIfSo(
        // 点击删除按钮
        COLineItemFields_1.COLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        exports.fillFields.using(item))));
    }
};
exports.fillFields = {
    using: (item) => {
        return core_1.Task.where(`#actor fill change order required fields`, COLineItemFields_1.COLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), COLineItemFields_1.COLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), COLineItemFields_1.COLineItem.fillNumberInputField(item.rowNumber, 'Unit Price Adjustment', item.AdjustedUnitPrice), COLineItemFields_1.COLineItem.fillNumberInputField(item.rowNumber, 'Quantity Adjustment', item.AdjustedQty), COLineItemFields_1.COLineItem.fillNumberInputField(item.rowNumber, 'Cost Adjustment', item.AdjustedAmt));
    }
};
exports.checkMultiCOLineItems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo);
        return core_1.Task.where(`#actor check CO line item information`, core_1.Check.whether(COLineItemFields_1.COLineItem.contractSummaryPanel(), (0, assertions_1.isPresent)()).andIfSo(web_1.Switch.to(COLineItemFields_1.COLineItem.viewCOLineItemPanel()).and(items.forEach(({ actor, item }) => actor.attemptsTo(exports.checkFields.using(item))))).otherwise(web_1.Switch.to(COLineItemFields_1.COLineItem.changeItemsPanel()).and(items.forEach(({ actor, item }) => actor.attemptsTo(exports.checkFields.using(item))))));
    }
};
exports.checkFields = {
    using: (item) => {
        return core_1.Task.where(`#actor check change order required fields`, COLineItemFields_1.COLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, DefaultStaticParams_1.SUCCEEDED), COLineItemFields_1.COLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, DefaultStaticParams_1.SUCCEEDED), COLineItemFields_1.COLineItem.checkCellValue(item.rowNumber, 'Unit Price Adjustment', item.AdjustedUnitPrice, DefaultStaticParams_1.SUCCEEDED), COLineItemFields_1.COLineItem.checkCellValue(item.rowNumber, 'Quantity Adjustment', item.AdjustedQty, DefaultStaticParams_1.SUCCEEDED), COLineItemFields_1.COLineItem.checkCellValue(item.rowNumber, 'Cost Adjustment', item.AdjustedAmt, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=CoLineitem.js.map