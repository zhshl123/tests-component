import { Question } from '@serenity-js/core';
export declare class BrowseFormFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 给text类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns
     */
    fillTextInputField: (nthColumn: number, itemName: string | Question<any>) => any;
    /**
     * 条件查询并检查结果
     * @param nthColumn 第几列， 第一列为0， 以此类推
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkSearchResult: (nthColumn: number, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 条件查询并检查结果(列表有父子层级)
     * @param nthColumn 第几列， 第一列为0， 以此类推
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkSearchTreeResult: (nthColumn: number, itemName: string | Question<any>, expectedResult: string) => any;
    /**
     * 点击列表中的按钮（首行）
     * @param 按钮名称
     * @returns
     */
    clickButtonInGrid: (buttonName: any) => any;
    /******************************* html 元素组件******************************** */
    /**
     * 条件搜索的输入框
     * @param nthColumn 第几列 第一列为0，以此类推
     * @returns
     */
    advancedSearchInputField: (nthColumn: number) => any;
    buttonInGrid: (buttonName: string) => any;
    noDataGrid: () => any;
    noTreeDataGrid: () => any;
    /**
     * 列表中的指定值
     * @param itemName
     * @returns
     */
    textInGrid: (itemName: string | Question<any>) => any;
}
