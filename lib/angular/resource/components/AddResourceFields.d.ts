import { Question } from '@serenity-js/core';
import { BrowseFormFields } from '../../common/abstract/BrowseFormFields';
import { EditFromFields } from '../../common/abstract/EditFormFields';
export declare class EditResourceFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @param rowNumber
     * @returns
     */
    resourceFieldGroup: (fieldName: string, rowNumber: number) => any;
    /**
     * resourcename输入框
     * @param fieldName 字段名称
     * @returns
     */
    resourceTextInputField: (fieldName: string, rowNumber: number) => any;
    /**
     * 给ResourceName的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillResourceTextInputField: (fieldName: string, rowNumber: number, itemName: string | Question<any>) => any;
    /**
    * 点击单选框按钮
    * @param fieldName
    * @param itemName
    * @returns
    */
    clickRadioButton: (fieldName: string, itemName: string) => any;
}
export declare const resourceAdd: EditResourceFields;
export declare const resourceEdit: EditResourceFields;
export declare const browseResources: BrowseFormFields;
