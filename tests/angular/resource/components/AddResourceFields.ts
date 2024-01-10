
import { Check, Log, Question, Task } from '@serenity-js/core';
import { By, Clear, Click, Enter, isVisible,PageElement } from '@serenity-js/web';

import { BrowseFormFields } from '../../common/abstract/BrowseFormFields';
import { EditFromFields } from '../../common/abstract/EditFormFields';
import { addResourceAttributeMap } from './AddResourceAttribute';
import { editResourceAttributeMap } from './EditResourceAttribute';

export class EditResourceFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @param rowNumber 
     * @returns 
     */
    resourceFieldGroup = (fieldName: string, rowNumber: number) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`.c-lygrid__cell_rowspan${rowNumber}[cid="${mappedFieldName}"]`))
            .describedAs('attribute field: ' + fieldName)}

    /**
     * resourcename输入框
     * @param fieldName 字段名称
     * @returns 
     */
    resourceTextInputField = (fieldName: string, rowNumber: number) =>
        PageElement.located(By.css('input'))
        .of(this.resourceFieldGroup(fieldName, rowNumber))
        .describedAs(`attribute ${fieldName} input filed`)

    /**
     * 给ResourceName的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillResourceTextInputField = (fieldName: string, rowNumber: number, itemName: string | Question<any>) => {
        return  Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.resourceTextInputField(fieldName, rowNumber)),
            Clear.theValueOf(this.resourceTextInputField(fieldName, rowNumber)),
            Enter.theValue(itemName).into(this.resourceTextInputField(fieldName, rowNumber))
        )
    }
    
    /**
    * 点击单选框按钮
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    clickRadioButton = (fieldName: string, itemName: string) => {
        return  Task.where(`#actor click radio button: ${itemName}`,
            Check.whether(this.selectedRadioButton(fieldName, itemName), isVisible()
            ).andIfSo(
                Log.the(itemName + 'radio button already selected')
            ).otherwise(
                Click.on(this.radioButton(fieldName, itemName)),
            )
        )
    }

}

export const resourceAdd = new EditResourceFields(addResourceAttributeMap)
export const resourceEdit = new EditResourceFields(editResourceAttributeMap)
export const browseResources = new BrowseFormFields(new Map())