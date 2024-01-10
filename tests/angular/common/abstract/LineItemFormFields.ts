import { Ensure, isPresent, not } from '@serenity-js/assertions';
import { Question, Task } from '@serenity-js/core';
import { By, Clear, Click, Enter, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';

export class LineItemFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    /**
     * 选择下拉框选项
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnName 列名
     * @param itemName 选项名称
     * @returns 
     */
    selectDropdownItem = (sectionName: string, rowNumber: number, columnNumber: number, itemName) =>
        Task.where(`#actor select row ${rowNumber} col ${columnNumber} dropdown item with ${itemName}`,
            Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)),
            Ensure.eventually(this.dropdownList().first(), isVisible()),
            Click.on(this.dropdownItem(itemName))
        )

    /**
     * 检查列表单元格离得值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkGridCellValue = (sectionName: string, rowNumber: number, cellValue: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check section ${sectionName} row ${rowNumber} cell value ${cellValue}`,
            Ensure.eventually(this.cellValue(sectionName, rowNumber, cellValue), isPresent())
        ) : Task.where(`#actor check section ${sectionName} row ${rowNumber} cell value ${cellValue}`,
            Ensure.eventually(this.cellValue(sectionName, rowNumber, cellValue), not(isPresent()))
        );

    }

    /**
     * 给文本输入框的单元格填值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 列名
     * @param itemName 要填的值
     * @returns 
     */
    fillTextInputCell = (sectionName: string, rowNumber: number, columnNumber: number, itemName) =>
        Task.where(`#actor fill row ${rowNumber} column ${columnNumber} with ${itemName}`,
            Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)),
            Clear.theValueOf(this.textInputCell(sectionName, rowNumber, columnNumber)),
            Enter.theValue(itemName).into(this.textInputCell(sectionName, rowNumber, columnNumber))
        )

    /**
     * 给多行文本输入框的单元格填值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 列名
     * @param itemName 要填的值
     * @returns 
     */
    fillTextAreaInputCell = (sectionName: string, rowNumber: number, columnNumber: number, itemName) =>
        Task.where(`#actor fill row ${rowNumber} column ${columnNumber} with ${itemName}`,
            Click.on(this.gridListCell(sectionName, rowNumber, columnNumber)),
            Clear.theValueOf(this.textareaInputCell(sectionName, rowNumber, columnNumber)),
            Enter.theValue(itemName).into(this.textareaInputCell(sectionName, rowNumber, columnNumber))
        )

    /**
     * 勾选全选框
     * @param sectionName 
     * @returns 
     */
    clickSelectAllcheckbox = (sectionName: string) =>
        Task.where(`#actor click select all checkbox in section ${sectionName}`,
            Click.on(this.selectAllCheckbox(sectionName))
        )

    /**
     * 勾选表格中的勾选框
     * @param sectionName 
     * @param rowNumber 
     * @returns 
     */
    clickcheckboxInGrid = (sectionName: string, rowNumber: number) =>
        Task.where(`#actor click checkbox in section ${sectionName} grid`,
            Click.on(this.checkboxInGrid(sectionName, rowNumber))
        )

    /**
     * 
     * @param sectionName 
     * @returns 
     */
    targetSectionPanel = (sectionName: string) => {
        const mappedSectionName = this.entityMap.get(sectionName)
        return PageElement.located(By.css(`[cid="${mappedSectionName}"]`))
            .describedAs('section: ' + sectionName)
    }

    /**
     * section中的数据列表
     * @param sectionName 
     * @returns 
     */
    gridList = (sectionName: string) =>
        PageElement.located(By.css('.dx-datagrid-rowsview'))
            .of(this.targetSectionPanel(sectionName))
            .describedAs('grid list in section ' + sectionName)

    /**
     * 数据列表的行
     * @param sectionName section名称
     * @param rowNumber 行号
     * @returns 
     */
    gridListRow = (sectionName: string, rowNumber: number) => {
        const elementRowNumber = rowNumber - 1
        return PageElements.located(By.css('tr'))
            .nth(elementRowNumber)
            .of(this.gridList(sectionName))
            .describedAs(`row ${rowNumber} in grid list of section ${sectionName}`)
    }

    /**
     * 列表中单元格的值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param cellValue 期望值
     * @returns 
     */
    cellValue = (sectionName: string, rowNumber: number, cellValue: string) =>
        PageElement.located(By.css(`[title="${cellValue}"]`))
            .of(this.gridListRow(sectionName, rowNumber))
            .describedAs(`cell value ${cellValue} of row ${rowNumber} in section ${sectionName}`)

    /**
     * 单元格的文本输入框(单行)
     * @param sectionName 
     * @param rowNumber 
     * @param columnNumber
     * @returns 
     */
    textInputCell = (sectionName: string, rowNumber: number, columnNumber: number) =>
        PageElement.located(By.css('input'))
            .of(this.gridListCell(sectionName, rowNumber, columnNumber))
            .describedAs(`section ${sectionName} row ${rowNumber} col ${columnNumber} text input field`)

    /**
     * 单元格的多行文本输入框
     * @param sectionName 
     * @param rowNumber 
     * @param columnNumber
     * @returns 
     */
    textareaInputCell = (sectionName: string, rowNumber: number, columnNumber: number) =>
        PageElement.located(By.css('textarea'))
            .of(this.gridListCell(sectionName, rowNumber, columnNumber))
            .describedAs(`section ${sectionName} row ${rowNumber} col ${columnNumber} text input field`)
    /**
     * 列表中的指定行和列的单元格
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 第几列
     * @returns 
     */
    gridListCell = (sectionName: string, rowNumber: number, columnNumber: number) => {
        return PageElement.located(By.css(`td[aria-colindex="${columnNumber}"]`))
            .of(this.gridListRow(sectionName, rowNumber))
            .describedAs(`column ${columnNumber} of row ${rowNumber} in grid list of section ${sectionName}`)
    }

    // 下拉框
    dropdownPanel = () =>
        PageElement.located(By.css('nz-option-container'))
            .describedAs('dropdown panel')

    //下拉框列表
    dropdownList = () =>
        PageElements.located(By.css('nz-option-item'))
            .of(this.dropdownPanel())
            .describedAs('Inspection Type dropdown list')

    /**
     * 下拉框选项
     * @param itemName 选项名称
     */
    dropdownItem = (itemName: string | Question<any>) =>
        PageElement.located(By.css(`nz-option-item[title="${itemName}"]`))
            .of(this.dropdownPanel())
            .describedAs('dorpdown list item: ' + itemName)

    /**
     * 表头所在的面板
     * @param sectionName 
     * @returns 
     */
    tableHeaderPanel = (sectionName: string) =>
        PageElement.located(By.css('.dx-datagrid-headers'))
            .of(this.targetSectionPanel(sectionName))
            .describedAs('select all checkbox')

    /**
     * 全选勾选框
     * @param sectionName section名称
     * @returns 
     */
    selectAllCheckbox = (sectionName: string) =>
        PageElement.located(By.css(`[type="checkbox"]`))
            .of(this.tableHeaderPanel(sectionName))
            .describedAs('select all checkbox')

    /**
     * 表格中的勾选框
     * @param sectionName section 名称
     * @param rowNumber 行号
     * @returns 
     */
    checkboxInGrid = (sectionName: string, rowNumber: number) =>
        PageElement.located(By.css(`[type="checkbox"]`))
            .of(this.gridListRow(sectionName, rowNumber))
            .describedAs(`checkbox in section ${sectionName} grid row ${rowNumber}`)

}