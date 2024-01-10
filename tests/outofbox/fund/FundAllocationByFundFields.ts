import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Attribute, By, Click, Enter, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { fundAttributesMap } from './FundAttributes';

export class FundAllocationByFundFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 检查project fund数据表的单元格的值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns 
     */
    checkProjectFundAllocationTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`,
            Ensure.eventually(Attribute.called('value').of(this.projectFundAllocationTableCell(rowNumber, colNumber)), equals(value)),
        )
    }

    /**
     * 给project fund数据表的单元格填值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns 
     */
    fillProjectFundAllocationTableCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`,
            Click.on(this.projectFundAllocationTableCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.projectFundAllocationTableCell(rowNumber, colNumber))
        )
    }

    projectFundAllocationTable = () =>
        PageElement.located(By.id('AFund'))
            .describedAs('project fund allocation table')

    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns 
     */
    projectFundAllocationTableRow = (rowNumber: number) =>
        PageElements.located(By.css('.cstdgrid__bodyrow')).nth(rowNumber)
            .of(this.projectFundAllocationTable())
            .describedAs(`project fund allocation table row: ${rowNumber}`)

    /**
     * project fund数据表的行首列
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns 
     */
    projectFundAllocationTableHeadColumn = (rowNumber: number) =>
        PageElement.located(By.css('.headcolumn span'))
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table head clomun of row: ${rowNumber}`)

    /**
     * project fund数据表的单元格
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns 
     */
    projectFundAllocationTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css(`[type="textbox"]`)).nth(colNumber)
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table cell row: ${rowNumber} column: ${colNumber}`)

    saveButton = () =>
        PageElement.located(By.id('ctl00_cipActionBar_btnSaveInfo'))
            .describedAs('project fund allocation Save button')

    /************************鼠标悬停到project上的弹窗****************************** */
    /**
     * 检查additional Fund Needed数据表的单元格的值
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns 
     */
    checkAdditionalFundNeededTableCellValue = (colNumber: number, value: string) => {
        return Task.where(`#actor checkadditional fund needed table body clolumn:${colNumber} with ${value}`,
            Ensure.eventually(Attribute.called('value').of(this.projectFundAllocationTableBodyCell(colNumber)), equals(value))
        )
    }

    additionalFundNeededTable = () =>
        PageElement.located(By.id('ctl00_body_ctl00_PNFunds'))
            .describedAs('additional fund needed table')

    /**
     * additional Fund Needed数据表的行
     * @returns 
     */
    additionalFundNeededTableBodyRow = () =>
        PageElement.located(By.css('.cstdgrid__bodyrow'))
            .of(this.additionalFundNeededTable())
            .describedAs(`project fund allocation table body row`)

    /**
     * additional Fund Needed数据表的单元格
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns 
     */
    projectFundAllocationTableBodyCell = (colNumber: number) =>
        PageElements.located(By.css('input')).nth(colNumber)
            .of(this.additionalFundNeededTableBodyRow())
            .describedAs(`project fund allocation table body row column: ${colNumber}`)
}

export const fundAllocationByFund = new FundAllocationByFundFields(fundAttributesMap)