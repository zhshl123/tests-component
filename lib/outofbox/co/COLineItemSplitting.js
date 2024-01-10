"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillLineItemSplittingFields = exports.addMultiCOLineItemSplitting = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const COLineItemFields_1 = require("./components/COLineItemFields");
exports.addMultiCOLineItemSplitting = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo);
        return core_1.Task.where(`#actor add multi co line item information`, openEditLineItemDetailPopup(), web_1.Switch.to(COLineItemFields_1.COLineItem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.lineItemsSectionTitle('Contract Line Item Splits'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickBulkEditSetionButton.using(DefaultStaticParams_1.INSERT), core_1.Check.whether(COLineItemFields_1.COLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count())).andIfSo(
        // 点击删除按钮
        COLineItemFields_1.COLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        exports.fillLineItemSplittingFields.using(item))), COLineItemFields_1.COLineItem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const openEditLineItemDetailPopup = () => core_1.Task.where(`#actor open edit line item detail popup`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.editableTableBox(), (0, web_1.isVisible)()), COLineItemFields_1.COLineItem.clickButtonInButtonGroup('1', DefaultStaticParams_1.POPUP), assertions_1.Ensure.eventually(COLineItemFields_1.COLineItem.editLineItemDetailPopupPanel(), (0, web_1.isVisible)()));
exports.fillLineItemSplittingFields = {
    using: (item) => {
        return core_1.Task.where(`#actor fill change order line item splitting fields`, COLineItemFields_1.COLineItem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project), COLineItemFields_1.COLineItem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund), COLineItemFields_1.COLineItem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage), COLineItemFields_1.COLineItem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount));
    }
};
//# sourceMappingURL=COLineItemSplitting.js.map