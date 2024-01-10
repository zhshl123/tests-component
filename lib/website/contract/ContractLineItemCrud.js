"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractLineItemCrud = exports.ContractLineitemCrud = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ContractLineItemFields_1 = require("./components/ContractLineItemFields");
const ContractTab_1 = require("./components/ContractTab");
const ContractCrud_1 = require("./ContractCrud");
class ContractLineitemCrud {
    constructor() {
        /**
         * 添加单条line item数据
         * @param lineItemsInfo line数据
         */
        this.addSingleLine = (lineItemsInfo) => {
            const array = [lineItemsInfo.rowsHash()];
            const items = core_1.List.of(array);
            return this.addLineAndFillFields(items, ContractCrud_1.contractCrud.contractType);
        };
        this.addMultiLines = (lineItemsInfo) => {
            const items = core_1.List.of(lineItemsInfo.hashes());
            return this.addLineAndFillFields(items, ContractCrud_1.contractCrud.contractType);
        };
        this.checkPaidExpense = () => core_1.Task.where(`#actor check contract paid expoenses`, ContractTab_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.paidExpenseSectionPanel(), (0, assertions_1.isPresent)()), (0, common_1.checkGridList)());
        this.addLineAndFillFields = (items, contractType) => {
            return core_1.Task.where(`#actor add multi line items`, ContractTab_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickSectionButton.using(DefaultStaticParams_1.INSERT), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), core_1.Check.whether(ContractLineItemFields_1.contractLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
                .andIfSo(
            // 点击删除按钮
            ContractLineItemFields_1.contractLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
            // 给单元格填值
            this.fillAllFields(item, contractType))), 
            // 提交保存
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.fillAllFields = (item, contractType) => {
            if (contractType == 'Unit Price') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.fillTextInputField(item.rowNumber, 'Bid Specs No.', item.BidSpecsNo), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor), ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity));
            }
            if (contractType == 'GMP') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor), ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity));
            }
            if (contractType == 'Professional Service' || contractType == 'T & M') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount));
            }
            if (contractType == 'NTE') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Contract Cost Type', item.ContractCostType), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount));
            }
            if (contractType == 'Job Costing Master') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Category', item.Category), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount));
            }
            if (contractType == 'Job Order') {
                return core_1.Task.where(`#actor fill line fileds`, ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Category', item.Category), ContractLineItemFields_1.contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem), ContractLineItemFields_1.contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice), ContractLineItemFields_1.contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity));
            }
        };
        /**
         * 检查多行line item
         */
        this.checkMultiLines = (lineItemsInfo, expectedResult) => {
            const items = core_1.List.of(lineItemsInfo.hashes());
            return this.checkAllFieldsValue(items, ContractCrud_1.contractCrud.contractType, expectedResult);
        };
        /**
         * 检查单条line item
         */
        this.checkSingleLine = (lineItemsInfo, expectedResult) => {
            const array = [lineItemsInfo.rowsHash()];
            const items = core_1.List.of(array);
            return this.checkAllFieldsValue(items, ContractCrud_1.contractCrud.contractType, expectedResult);
        };
        this.checkAllFieldsValue = (items, contractType, expectedResult) => {
            if (contractType == 'Unit Price') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Bid Specs No.', item.BidSpecsNo, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult))));
            }
            if (contractType == 'GMP') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult))));
            }
            if (contractType == 'Professional Service' || contractType == 'T & M') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult))));
            }
            if (contractType == 'NTE') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Contract Cost Type', item.ContractCostType, expectedResult))));
            }
            if (contractType == 'Job Costing Master') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Category', item.Category, expectedResult))));
            }
            if (contractType == 'Job Order') {
                return core_1.Task.where(`#actor check line items value`, 
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult), ContractLineItemFields_1.contractLineItem.checkCellValue(item.rowNumber, 'Category', item.Category, expectedResult))));
            }
        };
        this.updateMultiContractLineItems = (lineItemsInfo) => {
            const items = core_1.List.of(lineItemsInfo.hashes());
            return core_1.Task.where(`#actor update multi line items`, core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
            // 遍历数组，循环更新数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
            // 给单元格填值
            this.fillAllFields(item, ContractCrud_1.contractCrud.contractType))), 
            // 提交保存
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.deleteMultLines = (lineItemsInfo) => {
            const items = core_1.List.of(lineItemsInfo.hashes());
            return core_1.Task.where(`#actor delete multi line items`, ContractTab_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ContractLineItemFields_1.contractLineItem.editableTableBox(), (0, web_1.isVisible)()), 
            // 遍历数组，循环删除数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
            // 点击删除按钮
            ContractLineItemFields_1.contractLineItem.clickButtonInButtonGroup(item.rowNumber, DefaultStaticParams_1.DELETE))), 
            // 提交保存
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
    }
}
exports.ContractLineitemCrud = ContractLineitemCrud;
exports.contractLineItemCrud = new ContractLineitemCrud();
//# sourceMappingURL=ContractLineItemCrud.js.map