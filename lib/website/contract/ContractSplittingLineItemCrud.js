"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractSplittingLineItemCrud = exports.ContractSplittingLineItemCrud = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ContractLineItemFields_1 = require("./components/ContractLineItemFields");
class ContractSplittingLineItemCrud {
    constructor() {
        this.addMultiLines = (splittingLineItemInfo) => {
            const items = core_1.List.of(splittingLineItemInfo);
            return core_1.Task.where(`#actor add multi contract splitting line items`, this.openEditLineItemDetailPopup(), web_1.Switch.to(ContractLineItemFields_1.contractLineItem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.lineItemsSectionTitle('Contract Line Item Splits'), (0, web_1.isVisible)()), 
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickBulkEditSetionButton.using(DefaultStaticParams_1.INSERT), core_1.Check.whether(ContractLineItemFields_1.contractLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count())).andIfSo(
            // 点击删除按钮
            ContractLineItemFields_1.contractLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
            // 给单元格填值
            this.fillFields(item))), ContractLineItemFields_1.contractLineItem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
        };
        this.openEditLineItemDetailPopup = () => core_1.Task.where(`#actor open edit line item detail popup`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), ContractLineItemFields_1.contractLineItem.clickButtonInButtonGroup('1', DefaultStaticParams_1.POPUP), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editLineItemDetailPopupPanel(), (0, web_1.isVisible)()));
        this.fillFields = (item) => {
            return core_1.Task.where(`#actor fill contract splitting line item fileds`, ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund), core_1.Check.whether(item.Percentage, (0, assertions_1.equals)('')).andIfSo(core_1.Log.the('Percentage value is empty, skip the field')).otherwise(ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage)), core_1.Check.whether(item.Amount, (0, assertions_1.equals)('')).andIfSo(core_1.Log.the('Amount value is empty, skip the field')).otherwise(ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount)));
        };
        this.checkMultiLines = (splittingLineItemInfo, expectedResult) => {
            const items = core_1.List.of(splittingLineItemInfo);
            return core_1.Task.where(`#actor check multi contract splitting line items`, this.openEditLineItemDetailPopup(), web_1.Switch.to(ContractLineItemFields_1.contractLineItem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.lineItemsSectionTitle('Contract Line Item Splits'), (0, web_1.isVisible)()), 
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(assertions_1.Ensure.eventually(web_1.Text.of(ContractLineItemFields_1.contractLineItem.tableCell(item.rowNumber, 'Project')), (0, assertions_1.includes)(item.Project)), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Fund', item.Fund, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Percentage', item.Percentage, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Amount', item.Amount, expectedResult))), ContractLineItemFields_1.contractLineItem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)));
        };
        this.updateMultiLines = (splittingLineItemInfo) => {
            const items = core_1.List.of(splittingLineItemInfo);
            return core_1.Task.where(`#actor update multi contract splitting line items`, this.openEditLineItemDetailPopup(), web_1.Switch.to(ContractLineItemFields_1.contractLineItem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
            // 遍历数组，循环修改数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
            // 给单元格填值
            this.fillFields(item))), ContractLineItemFields_1.contractLineItem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
        };
        this.deleteMultiLines = (splittingLineItemInfo) => {
            const items = core_1.List.of(splittingLineItemInfo);
            return core_1.Task.where(`#actor delete multi contract splitting line items`, this.openEditLineItemDetailPopup(), web_1.Switch.to(ContractLineItemFields_1.contractLineItem.editLineItemDetailPopupFrame()).and(core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
            // 遍历数组，循环修改数据
            items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), ContractLineItemFields_1.contractLineItem.clickButtonInEditLineItemDetailPopup(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
        };
    }
}
exports.ContractSplittingLineItemCrud = ContractSplittingLineItemCrud;
exports.contractSplittingLineItemCrud = new ContractSplittingLineItemCrud();
//# sourceMappingURL=ContractSplittingLineItemCrud.js.map