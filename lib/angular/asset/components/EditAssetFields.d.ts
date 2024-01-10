import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract/EditFormFields';
export declare class EditAssetFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @param 行数 从section title为第一行起算
     * @returns
     */
    assetFieldGroup: (fieldName: string) => any;
    /**
     * assetId输入框
     * @param fieldName 字段名称
     * @returns
     */
    assetTextInputField: (fieldName: string) => any;
    /**
     * 下拉框的输入框
     * @param fieldName
     * @returns
     */
    dropdownInputField: (fieldName: string) => any;
    /**
    * 选择下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 给assetId的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillAssetTextInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkAssetTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
}
export declare const assetEdit: EditAssetFields;
