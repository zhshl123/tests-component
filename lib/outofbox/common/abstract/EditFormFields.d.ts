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
     * 给number类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillNumberInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
    * 选择下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
    * @param popupFieldName 在弹窗中填入关键词的字段名
    * @returns
    */
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /**
     * 选择下拉框第一条数据
     * @param fieldName
     * @returns
     */
    selectFirstItemInLookup: (fieldName: string) => any;
    /**
     * 选择lookup下拉框中的具体选项
     * @param fieldName 字段名称
     * @param itemName 选项的值
     * @returns
     */
    selectLookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
     * 检查lookup输入框的值
     * @param fieldName
     * @returns
     */
    checkLooukupInputfieldIsEmpty: (fieldName: string) => any;
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
     * 选择当前日期
     * @param fieldName 字段名称
     * @param calendarOrderNo 从上往下数第几个日历
     * @returns
     */
    selectDateToday: (fieldName: string, calendarOrderNo: number) => any;
    /**
     * 选择指定日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：yyyy/mm/dd eg:2023/07/01
     * @param calendarOrderNo 从上往下数第几个日历 第一个为0，以此类推
     * @returns
     */
    selectSpecialDate: (fieldName: string, date: string | Question<any>, calendarOrderNo: number) => any;
    /**
     * 填入指定日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
     * @returns
     */
    fillDateInputField: (fieldName: string, date: string | Question<any>) => any;
    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查数字输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkNumberInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查下拉框输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkDropdownInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查日期输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkDateInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查lookup输入框的值(单选)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkLookupInputFieldSingleValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
    * 检查lookup输入框的值(多选)
    * @param fieldName 字段名
    * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
    * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
    * @returns
    */
    checkLookupInputFieldMultiValue: (fieldName: string, itemName: string, expectedResult: string) => any;
    /**
     * 检查只读字段输入框的值(add时为下拉框，edit时为只读状态的字段)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkReadOnlyLabelValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查只读lookup字段输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkReadOnlylookupValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 点击单选框选项
     * @param fieldName 字段名称
     * @param itemName 选项名称
     */
    clickSingleCheckBox: (fieldName: string, itemName: string) => any;
    /**
     * 检查被选中的单选框
     * @param fieldName 字段名称
     * @param nth 单选框序号，第一个为0
     * @returns
     */
    checkSelectedSingleCheckbox: (fieldName: string, nth: string) => any;
    /**
     * 选择时间 (搭配日历一起使用，当不选择日历直接选择时间时，会默认当天日期)
     * @param fieldName 字段名
     * @param itemName 要填的值 eg: 01:30 AM
     * @returns
     */
    selectClock: (fieldName: string, itemName: string | Question<any>) => any;
    /**
    * relationship attribute的lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项， 不会清除原输入框中已选择的内容）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词, 多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach循环
    * @param popupFieldName 在弹窗中填入关键词的字段名
    * @returns
    */
    selectItemInRelationshipAttributeInLookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /**
     * NAICS lookup Popup弹窗中搜索树形选项并选择目标选项（树形选项, 默认选中第一条）
     * @param fieldName
     * @param itemName
     * @param popupFieldName
     * @returns
     */
    selectNAICSItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => void;
    /**
     * 选择relationship attribute的下拉框选项（不会清除原输入框的已选择的内容）
     * @param fieldName
     * @param itemName
     * @returns
     */
    selectrelationshipAttributeLookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
     * 检查Tree Lookup输入框的值(多选/树形 示例字段：NAICS)
     * @param fieldName 字段名
     * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkTreeLookupInputFieldMultiValue: (fieldName: string, itemName: string, expectedResult: string) => any;
    /**
     * 检查relationship attribute Lookup输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值, 多个选项逗号隔开。注意选项的顺序
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkRelationshipAttributeLookupInputFieldMultiValue: (fieldName: string, itemName: string, expectedResult: string) => any;
    /**
     * 给Auto id的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillAutoIdInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 检查Readonly Auto id输入框的值(AutoNumber,Such As:Bidder ID)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkAutoIdInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查可编辑的Auto id输入框的值(AutoNumber,Such As:Bidder ID)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkEditAutoIdInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 给amount类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillAmountInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * 检查amount类型的field的值
     * @param fieldName 字段名
     * @param itemName 预期值
     * @param expectedResult
     * @returns
     */
    checkAmountInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 检查只读字段的链接文字内容
     * @param fieldName 字段名
     * @param itemName 预期值
     * @param expectedResult SUCCEEDED 与预期一致， FAILED 与预期不一致
     * @returns
     */
    checkReadOnlyFieldLinkValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    /**
    * 下拉框输入框填值（所填的值必须与选项一致）
    * @param fieldName
    * @param itemName
    * @returns
    */
    fillDropdownInputField: (fieldName: string, itemName: string | Question<any>) => any;
    /**************************************************** html 元素组件************************************************* */
    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns
     */
    textInputField: (fieldName: string) => any;
    /**
     * 下拉框类型的输入框
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
    dropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
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
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldUl: (fieldName: string) => any;
    /**
     * lookup输入框的值(单选)
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldSingleValue: (fieldName: string) => any;
    /**
     * lookup输入框的值(多选)
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldMultiValue: (fieldName: string) => any;
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
     * 日期输入框
     * @param fieldName 字段名称
     * @returns
     */
    dateInputField: (fieldName: string) => any;
    /**
     *
     * @param fieldName 字段名称
     * @returns
     */
    dateCalendarIcon: (fieldName: string) => any;
    /**
     * 数字输入框
     * @param fieldName 字段名称
     * @returns
     */
    numberInputField: (fieldName: string) => any;
    /**
     * 只读数字输入框
     * @param fieldName 字段名称
     * @returns
     */
    readOnlyNumberInputField: (fieldName: string) => any;
    /**
     * 只读AutoId字段输入框
     * @param fieldName 字段名称
     * @returns
     */
    autoIdInputField: (fieldName: string) => any;
    /**
     * 只读字段
     * @param fieldName 字段名称
     * @returns
     */
    readOnlyLabelField: (fieldName: string) => any;
    /**
     * 只读lookup字段
     * @param fieldName 字段名称(一般为lookup类型的字段)
     * @returns
     */
    readOnlyLookupFieldBox: (fieldName: string) => any;
    /**
    * 只读lookup字段的值
    * @param fieldName 字段名称(一般为lookup类型的字段)
    * @returns
    */
    readOnlyLookupFieldValue: (fieldName: string) => any;
    /**
     * 单选框
     * @param fieldName 字段名称
     * @returns
     */
    radioButtonUl: (fieldName: string) => any;
    /**
     * 单选框组合
     * @param fieldName 字段名称
     * @returns
     */
    radioButtonGroupUl: (fieldName: string) => any;
    /**
     * radio的选项
     * @param fieldName 字段名称
     * @param itemNumber 第几个选项 第一个为0
     * @returns
     */
    radioButtonLebel: (fieldName: string, itemNth: string) => any;
    /**
     * radio的input标签
     * @param fieldName 字段名称
     * @param itemNumber 第几个选项 第一个为0
     * @returns
     */
    radioButtonInput: (fieldName: string, itemNth: string) => any;
    /**
     * 时间（钟点）图标
     * @param fieldName
     * @returns
     */
    clockIcon: (fieldName: string) => any;
    /**
     * 时间列表面板
     * @param fieldName 字段名
     * @returns
     */
    clockListBox: (fieldName: string) => any;
    /**
     * 时间列表
     * @param fieldName 字段名
     * @returns
     */
    clockList: (fieldName: string) => any;
    /**
     * 具体时间
     * @param fieldName 字段名
     * @param itemName 时间值 eg:01:00 AM
     * @returns
     */
    clockItem: (fieldName: string, itemName: string | Question<any>) => any;
    /**
     * lookup/Tree输入框的值(多选/树形)
     * @param fieldName 字段名称
     * @returns
     */
    treeLookupInputFieldMultiValue: (fieldName: string) => any;
    /**
     * lookup/Tree输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    treeLookupInputFieldUl: (fieldName: string) => any;
    /**
     * relationship Attribute lookup输入框的值(多选/树形)
     * @param fieldName 字段名称
     * @returns
     */
    relationshipAttributeLookupInputFieldMultiValue: (fieldName: string) => any;
    /**
     * relationship Attribute lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    relationshipAttributeLookupInputFieldUl: (fieldName: string) => any;
    /**
     * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName
     * @returns
     */
    ralationshipAttributeLookupInputField: (fieldName: string) => any;
    /**
     * 关联的Attribute的lookup 下拉选项（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName
     * @returns
     */
    ralationshipAttributeLookupDropdownItem: (fieldName: string, itemName: string) => any;
    /**
     * 关联的Attribute的lookup输入框清除图标（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName
     * @returns
     */
    ralationshipAttributeLookupFieldClearIcon: (fieldName: string) => any;
    /**
     * 金额输入框
     * @param filedName
     * @returns
     */
    amountInputField: (filedName: string) => any;
    /**
     * 只读字段的链接文字
     * @param fieldName 字段名称
     * @returns
     */
    readOnlyFieldLink: (fieldName: string) => any;
    /**
     * 字段名称所属标签
     * @param fieldName 字段名称
     * @returns
     */
    attributeNameLabel: (fieldName: string) => any;
}
