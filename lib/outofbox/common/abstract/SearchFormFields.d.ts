import { Question } from '@serenity-js/core';
export declare class SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 普通文本输入框填值
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns
     */
    fillTextInputField: (fieldName: string, itemName: any) => any;
    /**
    * 选择下拉框选项
    * @param fieldName 字段名称
    * @param itemName 要选择的item
    * @returns
    */
    selectDropdownItem: (fieldName: string, itemName: string) => any;
    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词
    * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
    * @returns
    */
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /**
     * 选择lookup下拉框中的具体选项
     * @param fieldName 字段名称
     * @param itemName 选项的值
     * @returns
     */
    selectLookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
     * 在browse页面搜索目标值(单条件查询，仅限查询字段为text类型)
     * 多条件查询，请在子类重新定义新的方法
     * @param pageName 页面名称
     * @param fieldName 填入关键词的字段名
     * @param itemName 搜索的关键词
     * @returns
     */
    searchItemInBrowsePage: (pageName: string, fieldName: string, itemName: string | Question<any>) => any;
    /**
     *
     * @param itemName 校验的item值
     * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
     * @returns
     */
    checkSearchResult: (itemName: string | Question<any>, expectedResult: string | Question<any>) => any;
    /**
     * 在browse页面搜索目标，并点击edit跳转到edit页面
     * @param pageName
     * @param fieldName
     * @param itemName
     */
    searchItemAndEdit: (pageName: string, fieldName: string, itemName: string | Question<any>) => any;
    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词
    * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
    * @returns
    */
    selectItemInReletionshipAttributeLookupPopup: (fieldName: string, itemName: string, popupFieldName: string) => any;
    /**
     * 填入起始日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
     * @returns
     */
    fillStartDateInputField: (fieldName: string, date: string | Question<any>) => any;
    /**
     * 填入截止日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
     * @returns
     */
    fillEndDateInputField: (fieldName: string, date: string | Question<any>) => any;
    /*************************************** html 元素组件************************************** */
    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns
     */
    textInputField: (fieldName: string) => any;
    /**
    * 下拉框的输入框
    * @param fieldName 字段名称
    * @returns
    */
    dropdownField: (fieldName: string) => any;
    /**
    * 下拉框面板
    * @param fieldName 字段名称
    * @returns
    */
    dropdownListBox: (fieldName: string) => any;
    /**
    * 下拉框列表
    * @param fieldName 字段名称
    * @returns
    */
    dropdownList: (fieldName: string) => any;
    /**
    * 下拉列表的值
    * @param fieldName 字段名称
    * @param itemName 具体的选项名称
    * @returns
    */
    dropdownItem: (fieldName: any, itemName: string) => any;
    /**
    * lookup 输入框
    * @param fieldName 字段名称
    * @returns
    */
    lookupInputField: (fieldName: string) => any;
    /**
    * lookup输入框的下拉框面板
    * @param fieldName 字段名称
    * @returns
    */
    lookupDropdownListBox: (fieldName: string) => any;
    /**
    * lookup输入框的下拉框列表
    * @param fieldName 字段名称
    * @returns
    */
    lookupDropdownList: (fieldName: string) => any;
    /**
    * lookup 下拉框列表的具体选项
    * @param fieldName 字段名称
    * @param itemName 选项的值
    * @returns
    */
    lookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
    * lookup 图标
    * @param fieldName 字段名称
    * @returns
    */
    lookupIcon: (fieldName: string) => any;
    /**
    * 点击lookup图标后出现的弹窗
    * @param fieldName 字段名称
    * @returns
    */
    lookupPopupPanel: (fieldName: string) => any;
    /**
    * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns
    */
    relationshipAttributeLookupInputField: (fieldName: string) => any;
    /**
    * 关联的Attribute的lookup输入框的下拉框面板（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns
    */
    relationshipAttributeLookupDropdownListBox: (fieldName: string) => any;
    /**
    * 关联的Attribute的lookup输入框的下拉框列表（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns
    */
    relationshipAttributeLookupDropdownList: (fieldName: string) => any;
    /**
    * 关联的Attribute的lookup输入框的下拉框列表的具体选项
    * @param fieldName 字段名称
    * @param itemName 选项的值
    * @returns
    */
    relationshipAttributeLookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
    * 关联的Attribute的lookup 图标（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns
    */
    relationshipAttributeLookupIcon: (fieldName: string) => any;
    /**
    * 点击关联的Attribute的lookup图标后出现的弹窗（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns
    */
    relationshipAttributeLookupPopupPanel: (fieldName: string) => any;
    /**
    * 起始日期输入框
    * @param fieldName 字段名称
    * @returns
    */
    startDateInputField: (fieldName: string) => any;
    /**
     * 起始日期的日历图标
     * @param fieldName 字段名称
     * @returns
     */
    startDateCalendarIcon: (fieldName: string) => any;
    /**
    * 截止日期输入框
    * @param fieldName 字段名称
    * @returns
    */
    endInputField: (fieldName: string) => any;
    /**
     * 截止日期的日历图标
     * @param fieldName 字段名称
     * @returns
     */
    endDateCalendarIcon: (fieldName: string) => any;
    /**
     * 清除输入框内容的图标
     * @param fieldName 字段名称
     * @returns
     */
    inputFieldClearIcon: (fieldName: string) => any;
    fieldLabel: (fieldName: string) => any;
}
