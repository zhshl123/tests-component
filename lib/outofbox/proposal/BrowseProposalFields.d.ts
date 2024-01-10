import { Question } from '@serenity-js/core';
import { SearchFromFields } from '../common/abstract';
export declare class BrowseProposalFields extends SearchFromFields {
    entityMap: Map<string, string>;
    proposalName: string;
    constructor(entityMap: any);
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
}
export declare const browseProposal: BrowseProposalFields;
