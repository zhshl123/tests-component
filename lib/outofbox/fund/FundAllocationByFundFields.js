"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundAllocationByFund = exports.FundAllocationByFundFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FundAttributes_1 = require("./FundAttributes");
class FundAllocationByFundFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 检查project fund数据表的单元格的值
         * @param rowNumber 表体第一行为0， 以此类推
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @param value 预期值
         * @returns
         */
        this.checkProjectFundAllocationTableCellValue = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor check project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.projectFundAllocationTableCell(rowNumber, colNumber)), (0, assertions_1.equals)(value)));
        };
        /**
         * 给project fund数据表的单元格填值
         * @param rowNumber 表体第一行为0， 以此类推
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @param value 预期值
         * @returns
         */
        this.fillProjectFundAllocationTableCell = (rowNumber, colNumber, value) => {
            return core_1.Task.where(`#actor fill project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`, web_1.Click.on(this.projectFundAllocationTableCell(rowNumber, colNumber)), web_1.Enter.theValue(value).into(this.projectFundAllocationTableCell(rowNumber, colNumber)));
        };
        this.projectFundAllocationTable = () => web_1.PageElement.located(web_1.By.id('AFund'))
            .describedAs('project fund allocation table');
        /**
         * project fund数据表的行
         * @param rowNumber 表体第一行为0， 以此类推
         * @returns
         */
        this.projectFundAllocationTableRow = (rowNumber) => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow')).nth(rowNumber)
            .of(this.projectFundAllocationTable())
            .describedAs(`project fund allocation table row: ${rowNumber}`);
        /**
         * project fund数据表的行首列
         * @param rowNumber 表体第一行为0， 以此类推
         * @returns
         */
        this.projectFundAllocationTableHeadColumn = (rowNumber) => web_1.PageElement.located(web_1.By.css('.headcolumn span'))
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table head clomun of row: ${rowNumber}`);
        /**
         * project fund数据表的单元格
         * @param rowNumber 表体第一行为0， 以此类推
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @returns
         */
        this.projectFundAllocationTableCell = (rowNumber, colNumber) => web_1.PageElements.located(web_1.By.css(`[type="textbox"]`)).nth(colNumber)
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table cell row: ${rowNumber} column: ${colNumber}`);
        this.saveButton = () => web_1.PageElement.located(web_1.By.id('ctl00_cipActionBar_btnSaveInfo'))
            .describedAs('project fund allocation Save button');
        /************************鼠标悬停到project上的弹窗****************************** */
        /**
         * 检查additional Fund Needed数据表的单元格的值
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @param value 预期值
         * @returns
         */
        this.checkAdditionalFundNeededTableCellValue = (colNumber, value) => {
            return core_1.Task.where(`#actor checkadditional fund needed table body clolumn:${colNumber} with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.projectFundAllocationTableBodyCell(colNumber)), (0, assertions_1.equals)(value)));
        };
        this.additionalFundNeededTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl00_PNFunds'))
            .describedAs('additional fund needed table');
        /**
         * additional Fund Needed数据表的行
         * @returns
         */
        this.additionalFundNeededTableBodyRow = () => web_1.PageElement.located(web_1.By.css('.cstdgrid__bodyrow'))
            .of(this.additionalFundNeededTable())
            .describedAs(`project fund allocation table body row`);
        /**
         * additional Fund Needed数据表的单元格
         * @param colNumber 不含首列， 第一列为0，以此类推
         * @returns
         */
        this.projectFundAllocationTableBodyCell = (colNumber) => web_1.PageElements.located(web_1.By.css('input')).nth(colNumber)
            .of(this.additionalFundNeededTableBodyRow())
            .describedAs(`project fund allocation table body row column: ${colNumber}`);
    }
}
exports.FundAllocationByFundFields = FundAllocationByFundFields;
exports.fundAllocationByFund = new FundAllocationByFundFields(FundAttributes_1.fundAttributesMap);
//# sourceMappingURL=FundAllocationByFundFields.js.map