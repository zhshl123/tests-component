"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineItemFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
class LineItemFields {
    constructor(entityMap) {
        /**
         * 选择下拉框选项
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param columnName 列名
         * @param itemName 选项名称
         * @returns
         */
        this.selectDropdownItem = (sectionName, rowNumber, columnNumber, itemName) => core_1.Task.where(`#actor select row ${rowNumber} col ${columnNumber} dropdown item with ${itemName}`, web_1.Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)), assertions_1.Ensure.eventually(this.dropdownList().first(), (0, web_1.isVisible)()), web_1.Click.on(this.dropdownItem(itemName)));
        /**
         * 检查列表单元格离得值
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkGridCellValue = (sectionName, rowNumber, cellValue, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check section ${sectionName} row ${rowNumber} cell value ${cellValue}`, assertions_1.Ensure.eventually(this.cellValue(sectionName, rowNumber, cellValue), (0, assertions_1.isPresent)())) : core_1.Task.where(`#actor check section ${sectionName} row ${rowNumber} cell value ${cellValue}`, assertions_1.Ensure.eventually(this.cellValue(sectionName, rowNumber, cellValue), (0, assertions_1.not)((0, assertions_1.isPresent)())));
        };
        /**
         * 给文本输入框的单元格填值
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param columnNumber 列名
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextInputCell = (sectionName, rowNumber, columnNumber, itemName) => core_1.Task.where(`#actor fill row ${rowNumber} column ${columnNumber} with ${itemName}`, web_1.Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)), web_1.Clear.theValueOf(this.textInputCell(sectionName, rowNumber, columnNumber)), web_1.Enter.theValue(itemName).into(this.textInputCell(sectionName, rowNumber, columnNumber)));
        /**
         * 给多行文本输入框的单元格填值
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param columnNumber 列名
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextAreaInputCell = (sectionName, rowNumber, columnNumber, itemName) => core_1.Task.where(`#actor fill row ${rowNumber} column ${columnNumber} with ${itemName}`, web_1.Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)), web_1.Clear.theValueOf(this.textareaInputCell(sectionName, rowNumber, columnNumber)), web_1.Enter.theValue(itemName).into(this.textareaInputCell(sectionName, rowNumber, columnNumber)));
        /**
         * 勾选全选框
         * @param sectionName
         * @returns
         */
        this.clickSelectAllcheckbox = (sectionName) => core_1.Task.where(`#actor click select all checkbox in section ${sectionName}`, web_1.Click.on(this.selectAllCheckbox(sectionName)));
        /**
         * 勾选表格中的勾选框
         * @param sectionName
         * @param rowNumber
         * @returns
         */
        this.clickcheckboxInGrid = (sectionName, rowNumber) => core_1.Task.where(`#actor click checkbox in section ${sectionName} grid`, web_1.Click.on(this.checkboxInGrid(sectionName, rowNumber)));
        /**
         *
         * @param sectionName
         * @returns
         */
        this.targetSectionPanel = (sectionName) => {
            const mappedSectionName = this.entityMap.get(sectionName);
            return web_1.PageElement.located(web_1.By.css(`[cid="${mappedSectionName}"]`))
                .describedAs('section: ' + sectionName);
        };
        /**
         * section中的数据列表
         * @param sectionName
         * @returns
         */
        this.gridList = (sectionName) => web_1.PageElement.located(web_1.By.css('.dx-datagrid-rowsview'))
            .of(this.targetSectionPanel(sectionName))
            .describedAs('grid list in section ' + sectionName);
        /**
         * 数据列表的行
         * @param sectionName section名称
         * @param rowNumber 行号
         * @returns
         */
        this.gridListRow = (sectionName, rowNumber) => {
            const elementRowNumber = rowNumber - 1;
            return web_1.PageElements.located(web_1.By.css('tr'))
                .nth(elementRowNumber)
                .of(this.gridList(sectionName))
                .describedAs(`row ${rowNumber} in grid list of section ${sectionName}`);
        };
        /**
         * 列表中单元格的值
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param cellValue 期望值
         * @returns
         */
        this.cellValue = (sectionName, rowNumber, cellValue) => web_1.PageElement.located(web_1.By.css(`[title="${cellValue}"]`))
            .of(this.gridListRow(sectionName, rowNumber))
            .describedAs(`cell value ${cellValue} of row ${rowNumber} in section ${sectionName}`);
        /**
         * 单元格的文本输入框(单行)
         * @param sectionName
         * @param rowNumber
         * @param columnNumber
         * @returns
         */
        this.textInputCell = (sectionName, rowNumber, columnNumber) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.gridListCell(sectionName, rowNumber, columnNumber))
            .describedAs(`section ${sectionName} row ${rowNumber} col ${columnNumber} text input field`);
        /**
         * 单元格的多行文本输入框
         * @param sectionName
         * @param rowNumber
         * @param columnNumber
         * @returns
         */
        this.textareaInputCell = (sectionName, rowNumber, columnNumber) => web_1.PageElement.located(web_1.By.css('textarea'))
            .of(this.gridListCell(sectionName, rowNumber, columnNumber))
            .describedAs(`section ${sectionName} row ${rowNumber} col ${columnNumber} text input field`);
        /**
         * 列表中的指定行和列的单元格
         * @param sectionName section名称
         * @param rowNumber 行号
         * @param columnNumber 第几列
         * @returns
         */
        this.gridListCell = (sectionName, rowNumber, columnNumber) => {
            return web_1.PageElement.located(web_1.By.css(`td[aria-colindex="${columnNumber}"]`))
                .of(this.gridListRow(sectionName, rowNumber))
                .describedAs(`column ${columnNumber} of row ${rowNumber} in grid list of section ${sectionName}`);
        };
        // 下拉框
        this.dropdownPanel = () => web_1.PageElement.located(web_1.By.css('nz-option-container'))
            .describedAs('dropdown panel');
        //下拉框列表
        this.dropdownList = () => web_1.PageElements.located(web_1.By.css('nz-option-item'))
            .of(this.dropdownPanel())
            .describedAs('Inspection Type dropdown list');
        /**
         * 下拉框选项
         * @param itemName 选项名称
         */
        this.dropdownItem = (itemName) => web_1.PageElement.located(web_1.By.css(`nz-option-item[title="${itemName}"]`))
            .of(this.dropdownPanel())
            .describedAs('dorpdown list item: ' + itemName);
        /**
         * 表头所在的面板
         * @param sectionName
         * @returns
         */
        this.tableHeaderPanel = (sectionName) => web_1.PageElement.located(web_1.By.css('.dx-datagrid-headers'))
            .of(this.targetSectionPanel(sectionName))
            .describedAs('select all checkbox');
        /**
         * 全选勾选框
         * @param sectionName section名称
         * @returns
         */
        this.selectAllCheckbox = (sectionName) => web_1.PageElement.located(web_1.By.css(`[type="checkbox"]`))
            .of(this.tableHeaderPanel(sectionName))
            .describedAs('select all checkbox');
        /**
         * 表格中的勾选框
         * @param sectionName section 名称
         * @param rowNumber 行号
         * @returns
         */
        this.checkboxInGrid = (sectionName, rowNumber) => web_1.PageElement.located(web_1.By.css(`[type="checkbox"]`))
            .of(this.gridListRow(sectionName, rowNumber))
            .describedAs(`checkbox in section ${sectionName} grid row ${rowNumber}`);
        this.entityMap = entityMap;
    }
}
exports.LineItemFields = LineItemFields;
//# sourceMappingURL=LineItemFormFields.js.map