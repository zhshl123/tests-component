import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Attribute, By, Click, Enter, isVisible, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { scopingMap } from './ScopingAttributes';

export class EditFinancialTab extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /********************************** scoping Summary table **************************************** */
    /**
     * 给scoping数据表填值
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @param value 要填的值
     * @returns 
     */
    fillScopingSummaryTableCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Click.on(this.scopingSummaryTableCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.scopingSummaryTableCell(rowNumber, colNumber))

        )
    }

    checkScopingSummaryTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingSummaryTableCell(rowNumber, colNumber)), equals(value))
        )
    }

    checkScopingSummaryTableCellIsReadOnly = (rowNumber: number, colNumber: number) => {
        return Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} is read only`,
            Ensure.eventually(Attribute.called('disabled').of(this.scopingSummaryTableCell(rowNumber, colNumber)), equals('disabled'))
        )
    }

    /**
     * 选择scoping status选项
     * @param itemName 选项的值
     * @returns 
     */
    selectScopingStatus = (itemName: string) => {
        return Task.where(`#actor select scoping status with value ${itemName}`,
            Click.on(this.scopingStatusDropdownInputField()),
            Ensure.eventually(this.scopingStatusDropdownBox(), isVisible()),
            Click.on(this.scopingStatusDropdownItem(itemName))

        )
    }

    /**
     * 检查scoping status选项
     * @param itemName 选项的值
     * @returns 
     */
    checkScopingStatus = (itemName: string) => {
        return Task.where(`#actor check scoping status with value ${itemName}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingStatusDropdownInputField()), equals(itemName)),

        )
    }

    /**
     * scoping 数据表的行
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @returns 
     */
    scopingSummaryTableRow = (rowNumber: number) =>
        PageElements.located(By.css('#ctl00_body_financialEvaluation_dgFinancial tr'))
            .nth(rowNumber)
            .describedAs('scoping allocation table row:' + rowNumber)

    /**
     * scoping 数据表的单元格
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @returns 
     */
    scopingSummaryTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('input'))
            .nth(colNumber)
            .of(this.scopingSummaryTableRow(rowNumber))

    scopingStatusDropdownInputField = () =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_financialEvaluation_ddlStatus_listbox"]`))

    scopingStatusDropdownBox = () =>
        PageElement.located(By.id('ctl00_body_financialEvaluation_ddlStatus-list'))

    scopingStatusDropdownItem = (itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.scopingStatusDropdownBox())

    scopingTypeDropdownInputfield = () =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_financialEvaluation_dgScopingPage_listbox"]`))
            .describedAs('scoping type dropdown input field')

    scopingTypeDropdownBox = () =>
        PageElement.located(By.id('ctl00_body_financialEvaluation_dgScopingPage-list'))

    scopingTypeDropdownItem = (itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.scopingTypeDropdownBox())

    /**
     * scoping 的类型
     * @param value 要选的值
     * @returns 
     */
    selectScopingType = (value: string) => {
        return Task.where(`#actor select scoping type with value ${value}`,
            Click.on(this.scopingTypeDropdownInputfield()),
            Ensure.eventually(this.scopingTypeDropdownBox(), isVisible()),
            Click.on(this.scopingTypeDropdownItem(value))

        )
    }
}

export const financial = new EditFinancialTab(scopingMap)