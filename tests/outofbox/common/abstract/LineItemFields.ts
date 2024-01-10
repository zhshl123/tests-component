import { Ensure, equals, not } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { By, Clear, Click, Enter, PageElement, PageElements, Text } from '@serenity-js/web';

import { DELETE, DRAG, INSERT, POPUP, SUCCEEDED } from '../../../DefaultStaticParams';
import { bulkEditDropdownItem } from '../BulkEditControl';

export class LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        this.entityMap = entityMap;

    }
    /**
     * section所在的panel，由于section panel的id暂时没有发现规律，所以子类需要重写此方法
     * @returns 
     */
    lineItemsSectionPanel = () =>
        PageElement.located(By.id(''))
            .describedAs('line item section panel')

    /**
     * edit line item detail 弹窗所在的panel， 此方法子类需要根据实际popup的id重写
     * @returns 
     */
    editLineItemDetailPopupPanel = () =>
        PageElement.located(By.id(''))
            .describedAs('edit line item detail popup panel')

    /********************************* interactions ******************************************** */

    /**
     * 在普通文本单元格填值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns 
     */
    fillTextInputField = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`,

            Click.on(this.tableCell(rowNumber, fieldName)),
            Clear.theValueOf(this.textInputField(rowNumber, fieldName)),
            Enter.theValue(itemName).into(this.textInputField(rowNumber, fieldName)),

        )
    }
    /**
     * 在数字单元格填值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns 
     */
    fillNumberInputField = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`,

            Click.on(this.tableCell(rowNumber, fieldName)),
            Clear.theValueOf(this.numberInputField(rowNumber, fieldName)),
            Enter.theValue(itemName).into(this.numberInputField(rowNumber, fieldName)),
            Click.on(this.checkBox(rowNumber))

        )
    }
    /**
     * 选择下拉框的值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 下拉框的值
     * @returns 
     */
    selectDropdownItem = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor row ${rowNumber} select line item dropdown: ${fieldName} with ${itemName}`,

            Click.on(this.tableCell(rowNumber, fieldName)),
            Wait.for(Duration.ofSeconds(2)),
            Click.on(bulkEditDropdownItem(itemName)),
        )
    }
    /**
   * 选择lookup下拉框的值
   * @param rowNumber 行号
   * @param fieldName 字段名称
   * @param itemName 下拉框的值
   * @returns 
   */
    selectLookupDropdownItem = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor select row ${rowNumber} line item dropdown: ${fieldName} with ${itemName}`,
            Click.on(this.tableCell(rowNumber, fieldName)),
            Click.on(this.dropdownIcon(rowNumber, fieldName)),
            Wait.for(Duration.ofSeconds(2)),
            Click.on(bulkEditDropdownItem(itemName)),
        )
    }
    /**
     * 校验单元格的值
     * @param rowNumber 行号
     * @param fieldName 字段名
     * @param itemName 要检验的值
     * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
     * @returns 
     */
    checkCellValue = (rowNumber: string, fieldName: string, itemName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check line item row ${rowNumber}, ${fieldName}'s cell value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.tableCell(rowNumber, fieldName)), equals(itemName))
        ) : Task.where(`#actor check line item row ${rowNumber}, ${fieldName}'s cell value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.tableCell(rowNumber, fieldName)), not(equals(itemName)))
        );
    }
    /**
     * 点击行中的按钮
     * @param rowNumber 行号
     * @param buttonName 按钮名称
     * @returns 
     */
    clickButtonInButtonGroup = (rowNumber: string, buttonName: string) => {
        const mappedButtonName = buttonNameMap.get(buttonName)
        return Task.where(`#actor click button ${mappedButtonName} in button group at line ${rowNumber}`,
            Click.on(this.buttonInButtonGroup(rowNumber, buttonName))
        )
    }

    /**
     * 点击edit line item detail弹窗页面顶部的按钮
     * @param buttonName 
     * @returns 
     */
    clickButtonInEditLineItemDetailPopup = (buttonName: string) =>
        Task.where(`#actor click edit line item detail popup button: ${buttonName}`,
            Click.on(this.editLineItemDetailPopupButton(buttonName))
        )

    /**
     * 填写edit line item popup页面
     * @param buttonName 
     * @returns 
     */
    fillEditLineItemDetailPopup = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`,
            Click.on(this.tableCell(rowNumber, fieldName)),
            Enter.theValue(itemName).into(this.textareaPopup(fieldName)),
        )
    }

    /********************************* html 元素组件********************************************** */

    /**
     * section 名称
     * @param sectionName section 名称
     * @returns 
     */
    lineItemsSectionTitle = (sectionName: string) =>
        PageElement.located(By.cssContainingText(`[data-name="sectionName"]`, sectionName))
            .describedAs('line item section title: ' + sectionName)

    /**
     * section 表格的行
     * @returns 
     */
    lineItemsTr = () =>
        PageElements.located(By.css('tr'))
            .of(this.editableTableBox())
            .describedAs('line item tr lines')

    /**
     * 表头单元格
     * @param fieldName 
     * @returns 
     */
    lineItemHeadCell = (fieldName: string) =>
        PageElement.located(By.cssContainingText(`[role="columnheader"]`, fieldName))
            .describedAs('line item head cell: ' + fieldName)

    /**
     * 可编辑的表格部分
     * @returns 
     */
    editableTableBox = () =>
        PageElement.located(By.css('.k-virtual-scrollable-wrap'))
            .describedAs('line item editable table box')

    /**
     * 不可编辑的表格
     * @returns 
     */
    unEditableTableBox = (sectionName: string) =>
        PageElement.located(By.id('ctl00_body_gv' + sectionName))
            .describedAs('line item uneditable table box')

    /**
     * 表格单元格
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns 
     */
    tableCell = (rowNumber: string, fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElements.located(By.css(`[data-field="${mappedFieldName}"]`))
            .nth(Number(rowNumber) - 1)
            .describedAs('line item table field: ' + fieldName)
    }

    /**
     * 文本输入框
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns 
     */
    textInputField = (rowNumber: string, fieldName: string) =>
        PageElement.located(By.css('input'))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item text input field: ' + fieldName)

    /**
     * 数字输入框
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns 
     */
    numberInputField = (rowNumber: string, fieldName: string) =>
        PageElement.located(By.css(`[data-role="numerictextbox"]`))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item string input field: ' + fieldName)

    /**
     * 下拉框图标
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownIcon = (rowNumber: string, fieldName: string) =>
        PageElement.located(By.css(`[aria-label="select"]`))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item dropdown icon')

    /**
     * lookup图标
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns 
     */
    lookupIcon = (rowNumber: string, fieldName: string) =>
        PageElement.located(By.css('button'))
            .of(this.tableCell(rowNumber, fieldName))
            .describedAs('line item lookup icon')

    /**
     * 不可编辑的表格部分
     * @returns 
     */
    lookedTableBox = () =>
        PageElement.located(By.css(`[data-name="divButtons"]`))
            .describedAs('line item locked table box')

    /**
     * 按钮组的表格单元格
     * @param rowNumber 行号
     * @returns 
     */
    buttonGroupCell = (rowNumber: string) =>
        PageElements.located(By.css('.cbtnlist.cbtnlist--nobg'))
            .nth(Number(rowNumber) - 1)
            .describedAs('line item button group cell')

    /**
     * 按钮组的具体按钮
     * @param rowNumber 行号
     * @param buttonName 按钮名称 
     * @returns 
     */
    buttonInButtonGroup = (rowNumber: string, buttonName: string) => {
        const mappedButtonName = buttonNameMap.get(buttonName)
        return PageElement.located(By.css(`[title="${mappedButtonName}"]`))
            .of(this.buttonGroupCell(rowNumber))
            .describedAs('line item button:' + buttonName + 'in group button')
    }

    /**
     * 表格左侧的勾选框
     * @param rowNumber 行号
     */
    checkBox = (rowNumber: string) =>
        PageElements.located(By.css(`[sign="kendoGVCheckBox"]`))
            .nth(Number(rowNumber) - 1)
            .describedAs(`row: ${rowNumber} check box`)

    /**
     * edit line item detail 弹窗Frame
     * @returns 
     */
    editLineItemDetailPopupFrame = () =>
        PageElement.located(By.css('iframe'))
            .of(this.editLineItemDetailPopupPanel())
            .describedAs('edit line item detail popup frame')

    /**
     * edit line item detail页面顶部按钮组
     * @returns 
     */
    editLineItemDetailPopupButtonBox = () =>
        PageElement.located(By.id('ctl00_phCustomButtons_UpdatePanel1'))
            .describedAs('edit line item detail popup button box')

    /**
     * edit line item detail页面顶部具体按钮
     * @param buttonName 
     * @returns 
     */
    editLineItemDetailPopupButton = (buttonName: string) =>
        PageElement.located(By.css(`[value="${buttonName}"]`))
            .of(this.editLineItemDetailPopupButtonBox())
            .describedAs('edit line item detail popup button:' + buttonName)

    /**
     * edit line item popup页面
     * @returns 
     */
    textareaPopup = (fieldName: string) =>
        PageElement.located(By.css(`[name="${fieldName}"]`)
            .describedAs('Textarea Popup Element'))

    /**
     * edit line item 点击Add按钮跳转到其他实体的Add页面
     * @returns 
     */
    editLineItemAddPage = () =>
        PageElement.located(By.id('ctl00_body_up')
            .describedAs('Edit Line Item Jump To Add Page'))
}

const buttonNameMap = new Map()
buttonNameMap.set(INSERT, 'Insert below')
buttonNameMap.set(DELETE, 'Remove')
buttonNameMap.set(DRAG, 'Drag to move')
buttonNameMap.set(POPUP, 'Popup to Edit')