import { Question } from '@serenity-js/core';
export declare class LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 选择下拉框选项
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnName 列名
     * @param itemName 选项名称
     * @returns
     */
    selectDropdownItem: (sectionName: string, rowNumber: number, columnNumber: number, itemName: any) => any;
    /**
     * 检查列表单元格离得值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkGridCellValue: (sectionName: string, rowNumber: number, cellValue: string, expectedResult: string) => any;
    /**
     * 给文本输入框的单元格填值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 列名
     * @param itemName 要填的值
     * @returns
     */
    fillTextInputCell: (sectionName: string, rowNumber: number, columnNumber: number, itemName: any) => any;
    /**
     * 给多行文本输入框的单元格填值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 列名
     * @param itemName 要填的值
     * @returns
     */
    fillTextAreaInputCell: (sectionName: string, rowNumber: number, columnNumber: number, itemName: any) => any;
    /**
     * 勾选全选框
     * @param sectionName
     * @returns
     */
    clickSelectAllcheckbox: (sectionName: string) => any;
    /**
     * 勾选表格中的勾选框
     * @param sectionName
     * @param rowNumber
     * @returns
     */
    clickcheckboxInGrid: (sectionName: string, rowNumber: number) => any;
    /**
     *
     * @param sectionName
     * @returns
     */
    targetSectionPanel: (sectionName: string) => any;
    /**
     * section中的数据列表
     * @param sectionName
     * @returns
     */
    gridList: (sectionName: string) => any;
    /**
     * 数据列表的行
     * @param sectionName section名称
     * @param rowNumber 行号
     * @returns
     */
    gridListRow: (sectionName: string, rowNumber: number) => any;
    /**
     * 列表中单元格的值
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param cellValue 期望值
     * @returns
     */
    cellValue: (sectionName: string, rowNumber: number, cellValue: string) => any;
    /**
     * 单元格的文本输入框(单行)
     * @param sectionName
     * @param rowNumber
     * @param columnNumber
     * @returns
     */
    textInputCell: (sectionName: string, rowNumber: number, columnNumber: number) => any;
    /**
     * 单元格的多行文本输入框
     * @param sectionName
     * @param rowNumber
     * @param columnNumber
     * @returns
     */
    textareaInputCell: (sectionName: string, rowNumber: number, columnNumber: number) => any;
    /**
     * 列表中的指定行和列的单元格
     * @param sectionName section名称
     * @param rowNumber 行号
     * @param columnNumber 第几列
     * @returns
     */
    gridListCell: (sectionName: string, rowNumber: number, columnNumber: number) => any;
    dropdownPanel: () => any;
    dropdownList: () => any;
    /**
     * 下拉框选项
     * @param itemName 选项名称
     */
    dropdownItem: (itemName: string | Question<any>) => any;
    /**
     * 表头所在的面板
     * @param sectionName
     * @returns
     */
    tableHeaderPanel: (sectionName: string) => any;
    /**
     * 全选勾选框
     * @param sectionName section名称
     * @returns
     */
    selectAllCheckbox: (sectionName: string) => any;
    /**
     * 表格中的勾选框
     * @param sectionName section 名称
     * @param rowNumber 行号
     * @returns
     */
    checkboxInGrid: (sectionName: string, rowNumber: number) => any;
}
