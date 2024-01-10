import { Question } from '@serenity-js/core';
import { SearchFromFields } from '../../common/abstract';
export declare class BrowseProjectFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 列表首行ID Link
     * @param rowNumber 第几行数据（第一行为0，以此类推）
     */
    IDLink: (rowNumber: number) => any;
    /**
     * 点击列表首行ID Link
     */
    clickIDLink: (rowNumber: number) => any;
    searchAndEditImplementationProject: (projectName: string | Question<any>) => any;
    /**
     * 在browse draft planning页面搜索目标值(单条件查询，仅限查询字段为text类型)
     * @param pageName 页面名称
     * @param cycleName cycle名
     * @param fieldName 填入关键词的字段名
     * @param itemName 搜索的关键词
     * @returns
     */
    searchItemInBrowsePlanningProjectPage: (pageName: string, cycleName: string, fieldName: string, itemName: string | Question<any>) => any;
    searchAtTopLavelCheckbox: () => any;
    openPlanningProjectInBrowseImplementationPage: (projectName: string | Question<any>) => any;
    /**
     * 选择scenario lookup下拉框中的具体选项
     * @param itemName 选项的值
     * @returns
     */
    selectScenarioLookupDropdownItem: (itemName: string) => any;
    scenarioInputFieldClearIcon: () => any;
    scenarioLookupDropdownItem: (itemName: string) => any;
    scenarioLookupDropdownInputField: () => any;
    scenarioLookupDropdownList: () => any;
    scenarioLookupDropdownListBox: () => any;
    scenarioFieldLabel: () => any;
    firstCheckboxInGrid: () => any;
    /**
    * lookup输入框的下拉框列表
    * @param fieldName 字段名称
    * @returns
    */
    lookupDropdownList: (fieldName: string) => any;
}
export declare const browseProject: BrowseProjectFields;
