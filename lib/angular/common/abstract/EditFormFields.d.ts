import { Question } from '@serenity-js/core';
export declare class EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /*************************************** interactions ***************************************** */
    /**
     * 给text类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillTextInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkReadOnlyFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
    * 检查数字输入框的值
    * @param fieldName 字段名
    * @param itemName 字段的期望值
    * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
    * @returns
    */
    checkNumberInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
    * 选择下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 检查下拉框已选择的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkDropdownFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
    * 在lookup弹窗中选择选项，勾选第一个勾选框（多选时为全选）
    * @param fieldName 字段名称
    * @param itemName 要选的值
    * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
    * @param nthColumn 第几列， 第一列为0， 以此类推
    * @returns
    */
    selectItemInPopup: (fieldName: string, itemName: string | Question<any>, nthWindow: number, nthColumn: number) => any;
    /**
    * 选择下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    fillDateInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
    * 点击单选框按钮
    * @param fieldName
    * @param itemName
    * @returns
    */
    clickRadioButton: (fieldName: string, itemName: string) => any;
    /**
     * 检查单选框是否已选中
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkSelectedRadioButton: (fieldName: string, itemName: string, expectedResult: string) => any;
    /**
     * 检查弹窗是否存在
     * @param nthWindow  第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
     */
    checkPopupWindow: (nthWindow: number) => any;
    /**
     * 清除下拉框输入框中的已选的值
     * @param fieldName 字段名称
     * @returns
     */
    clearDropdownSelectedItem: (fieldName: string) => any;
    /**
     * 设置cookie
     * @param cookieName cookie的字段名称
     * @param cookieValue cookie的值
     * @returns
     */
    setCookie: (cookieName: string, cookieValue: any) => any;
    deleteOldCookieAndSetNewCookie: (cookieName: string, cookieValue: any) => any;
    setNewCookie: (cookieName: string, cookieValue: any) => any;
    /**
     * check valid notes
     * @returns
     */
    checkValidNotes: () => any;
    /**************************************************** html 元素组件************************************************* */
    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @returns
     */
    attributeFieldGroup: (fieldName: string) => any;
    /**
     * 字段的名称
     * @param fieldName 字段名称
     * @returns
     */
    attributeNameLabel: (fieldName: string) => any;
    /**
     * 文本输入框
     * @param fieldName 字段名称
     * @returns
     */
    attributeInputField: (fieldName: string) => any;
    /**
     * 下啦框图标
     * @param fieldName 字段名称
     * @returns
     */
    dropdownIcon: (fieldName: string) => any;
    dropdownPanel: () => any;
    dropdownList: () => any;
    /**
     * 下拉框已选择的值
     * @param fieldName 字段名称
     * @returns
     */
    dropdownSelectedItem: (fieldName: string) => any;
    /**
     * 下拉框的输入框
     * @param fieldName
     * @returns
     */
    dropdownInputField: (fieldName: string) => any;
    /**
     * 清除下拉框所选项图标
     * @param fieldName 字段名称
     */
    clearDropdownSelectedItemIcon: (fieldName: string) => any;
    /**
     * 下拉框选项
     * @param itemName 选项名称
     */
    dropdownItem: (itemName: string | Question<any>) => any;
    emptyDropdownPanel: () => any;
    /**
     * 只读字段的输入框
     * @param fieldName 字段名称
     * @returns
     */
    readOnlyField: (fieldName: string) => any;
    /**
     * 下拉框中的Lookup图标, 字段映射时，字段名前加前缀：lookup_
     * 例：attributeMap.set('lookup_AttributeName', 'lookupiconbutton1')
     * @returns
     */
    lookupIconInDropdownBox: (fieldName: string) => any;
    /**
     * 条件搜索的输入框
     * @param nthColumn 第几列 第一列为0，以此类推
     * @param nthWindow 第几个弹窗
     * @returns
     */
    advancedSearchInputFieldInPopup: (nthColumn: number, nthWindow: number) => any;
    /**
     * 弹窗里的的勾选框
     * @returns
     */
    checkboxInGridInPopup: (nthWindow: number) => any;
    /**
     * @returns 通用的Section 标题组件
     * @param sectionTitle section标题
     */
    targetSectionTitle: (sectionTitle: string) => any;
    /**
    * 字段底部的校验提示信息
    * @returns
    */
    validNotes: () => any;
    /**
     * 数字输入框
     * @param fieldName 字段名
     * @returns
     */
    numberInputField: (fieldName: string) => any;
    /**
     * 单选框组合
     * @param fieldName 字段名称
     * @returns
     */
    radioGroup: (fieldName: string) => any;
    /**
     * 单选框按钮
     * @param fieldName 字段名称
     * @param buttonName 第几个选项 第一个为0， 以此类推
     * @returns
     */
    radioButton: (fieldName: string, buttonName: string) => any;
    /**
     * 已选中的单选框按钮
     * @param fieldName 字段名称
     * @param buttonName 第几个选项 第一个为0， 以此类推
     * @returns
     */
    selectedRadioButton: (fieldName: string, buttonName: string) => any;
}
