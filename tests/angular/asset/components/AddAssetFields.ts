import { Ensure, isPresent } from '@serenity-js/assertions';
import { Question, Task } from '@serenity-js/core';
import { By, Clear, Click, Enter, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract/EditFormFields';
import { addAssetAttributeMap } from './AddAssetAttributes';

export class AddAssetFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @param 行数 从section title为第一行起算
     * @returns 
     */
    assetFieldGroup = (fieldName: string, rowNumber: number) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`.c-lygrid__cell_rowend${rowNumber}[cid="${mappedFieldName}"]`))
            .describedAs('attribute field: ' + fieldName)
    }

    /**
     * assetId输入框
     * @param fieldName 字段名称
     * @returns 
     */
    assetTextInputField = (fieldName: string, rowNumber: number) =>
        PageElement.located(By.css('input'))
            .of(this.assetFieldGroup(fieldName, rowNumber))
            .describedAs(`attribute ${fieldName} input filed`)

    /**
     * 给assetId的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillAssetTextInputField = (fieldName: string, rowNumber: number, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.assetTextInputField(fieldName, rowNumber)),
            Clear.theValueOf(this.assetTextInputField(fieldName, rowNumber)),
            Enter.theValue(itemName).into(this.assetTextInputField(fieldName, rowNumber))
        )
    }

    /**
    * 选择下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectAssetDropdownItem = (fieldName: string, rowNumber: number, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.assetTextInputField(fieldName, rowNumber)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList().first(), isPresent()),
            Click.on(this.dropdownItem(itemName)),

        )
    }
    
}

export const assetAdd = new AddAssetFields(addAssetAttributeMap)

