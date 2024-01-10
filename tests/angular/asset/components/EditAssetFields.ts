import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Log, Question, Task } from '@serenity-js/core';
import { Attribute, By, Clear, Click, Enter, PageElement } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';
import { EditFromFields } from '../../common/abstract/EditFormFields';
import { editAssetAttributeMap } from './EditAssetAttributes';

export class EditAssetFields extends EditFromFields {
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
    assetFieldGroup = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`.c-lygrid__cell_rowspan1[cid="${mappedFieldName}"]`))
            .describedAs('attribute field: ' + fieldName)
    }

    /**
     * assetId输入框
     * @param fieldName 字段名称
     * @returns 
     */
    assetTextInputField = (fieldName: string) =>
        PageElement.located(By.css('input'))
            .of(this.assetFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} input filed`)

    /**
     * 下拉框的输入框
     * @param fieldName 
     * @returns 
     */
    dropdownInputField = (fieldName: string) =>
        PageElement.located(By.css('nz-select-top-control'))
            .of(this.assetFieldGroup(fieldName))
            .describedAs('dropdown input field')



    /**
    * 选择下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            // 确保下拉框有值之后再点击对应选项
            Click.on(this.dropdownInputField(fieldName)),
            Ensure.eventually(this.dropdownList().first(), isPresent()),
            Click.on(this.dropdownItem(itemName)),

        )
    }
    /**
     * 给assetId的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillAssetTextInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.assetTextInputField(fieldName)),
            Clear.theValueOf(this.assetTextInputField(fieldName)),
            Enter.theValue(itemName).into(this.assetTextInputField(fieldName))
        )
    }

    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkAssetTextInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.assetTextInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.assetTextInputField(fieldName)), not(equals(itemName)))
        );
    }

}

export const assetEdit = new EditAssetFields(editAssetAttributeMap)
