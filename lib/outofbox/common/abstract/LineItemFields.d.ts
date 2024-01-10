export declare class LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * section所在的panel，由于section panel的id暂时没有发现规律，所以子类需要重写此方法
     * @returns
     */
    lineItemsSectionPanel: () => any;
    /**
     * edit line item detail 弹窗所在的panel， 此方法子类需要根据实际popup的id重写
     * @returns
     */
    editLineItemDetailPopupPanel: () => any;
    /********************************* interactions ******************************************** */
    /**
     * 在普通文本单元格填值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns
     */
    fillTextInputField: (rowNumber: string, fieldName: string, itemName: string) => any;
    /**
     * 在数字单元格填值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns
     */
    fillNumberInputField: (rowNumber: string, fieldName: string, itemName: string) => any;
    /**
     * 选择下拉框的值
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @param itemName 下拉框的值
     * @returns
     */
    selectDropdownItem: (rowNumber: string, fieldName: string, itemName: string) => any;
    /**
   * 选择lookup下拉框的值
   * @param rowNumber 行号
   * @param fieldName 字段名称
   * @param itemName 下拉框的值
   * @returns
   */
    selectLookupDropdownItem: (rowNumber: string, fieldName: string, itemName: string) => any;
    /**
     * 校验单元格的值
     * @param rowNumber 行号
     * @param fieldName 字段名
     * @param itemName 要检验的值
     * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
     * @returns
     */
    checkCellValue: (rowNumber: string, fieldName: string, itemName: string, expectedResult: string) => any;
    /**
     * 点击行中的按钮
     * @param rowNumber 行号
     * @param buttonName 按钮名称
     * @returns
     */
    clickButtonInButtonGroup: (rowNumber: string, buttonName: string) => any;
    /**
     * 点击edit line item detail弹窗页面顶部的按钮
     * @param buttonName
     * @returns
     */
    clickButtonInEditLineItemDetailPopup: (buttonName: string) => any;
    /**
     * 填写edit line item popup页面
     * @param buttonName
     * @returns
     */
    fillEditLineItemDetailPopup: (rowNumber: string, fieldName: string, itemName: string) => any;
    /********************************* html 元素组件********************************************** */
    /**
     * section 名称
     * @param sectionName section 名称
     * @returns
     */
    lineItemsSectionTitle: (sectionName: string) => any;
    /**
     * section 表格的行
     * @returns
     */
    lineItemsTr: () => any;
    /**
     * 表头单元格
     * @param fieldName
     * @returns
     */
    lineItemHeadCell: (fieldName: string) => any;
    /**
     * 可编辑的表格部分
     * @returns
     */
    editableTableBox: () => any;
    /**
     * 不可编辑的表格
     * @returns
     */
    unEditableTableBox: (sectionName: string) => any;
    /**
     * 表格单元格
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns
     */
    tableCell: (rowNumber: string, fieldName: string) => any;
    /**
     * 文本输入框
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns
     */
    textInputField: (rowNumber: string, fieldName: string) => any;
    /**
     * 数字输入框
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns
     */
    numberInputField: (rowNumber: string, fieldName: string) => any;
    /**
     * 下拉框图标
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns
     */
    dropdownIcon: (rowNumber: string, fieldName: string) => any;
    /**
     * lookup图标
     * @param rowNumber 行号
     * @param fieldName 字段名称
     * @returns
     */
    lookupIcon: (rowNumber: string, fieldName: string) => any;
    /**
     * 不可编辑的表格部分
     * @returns
     */
    lookedTableBox: () => any;
    /**
     * 按钮组的表格单元格
     * @param rowNumber 行号
     * @returns
     */
    buttonGroupCell: (rowNumber: string) => any;
    /**
     * 按钮组的具体按钮
     * @param rowNumber 行号
     * @param buttonName 按钮名称
     * @returns
     */
    buttonInButtonGroup: (rowNumber: string, buttonName: string) => any;
    /**
     * 表格左侧的勾选框
     * @param rowNumber 行号
     */
    checkBox: (rowNumber: string) => any;
    /**
     * edit line item detail 弹窗Frame
     * @returns
     */
    editLineItemDetailPopupFrame: () => any;
    /**
     * edit line item detail页面顶部按钮组
     * @returns
     */
    editLineItemDetailPopupButtonBox: () => any;
    /**
     * edit line item detail页面顶部具体按钮
     * @param buttonName
     * @returns
     */
    editLineItemDetailPopupButton: (buttonName: string) => any;
    /**
     * edit line item popup页面
     * @returns
     */
    textareaPopup: (fieldName: string) => any;
    /**
     * edit line item 点击Add按钮跳转到其他实体的Add页面
     * @returns
     */
    editLineItemAddPage: () => any;
}
