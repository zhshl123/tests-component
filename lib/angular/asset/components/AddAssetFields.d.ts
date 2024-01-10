import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract/EditFormFields';
export declare class AddAssetFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @param 行数 从section title为第一行起算
     * @returns
     */
    assetFieldGroup: (fieldName: string, rowNumber: number) => any;
    /**
     * assetId输入框
     * @param fieldName 字段名称
     * @returns
     */
    assetTextInputField: (fieldName: string, rowNumber: number) => any;
    /**
     * 给assetId的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillAssetTextInputField: (fieldName: string, rowNumber: number, itemName: string | Question<any>) => any;
    /**
    * 选择下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectAssetDropdownItem: (fieldName: string, rowNumber: number, itemName: string | Question<any>) => any;
}
export declare const assetAdd: AddAssetFields;
