import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class ProjectFundFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 选择列表中第一个fund到selected fund list中
     * @param fundName 资金名称
     * @returns
     */
    addFundToSelectedList: (fundName: string | Question<any>) => any;
    /**
     * 搜索目标fund
     * @param fundName 资金名称
     * @returns
     */
    searchFund: (fundName: string | Question<any>) => any;
    searchFundInputField: () => any;
    searchFundIcon: () => any;
    unselectedFundList: (fundName: string | Question<any>) => any;
    selectedFundList: (fundName: string | Question<any>) => any;
    addFundIcon: () => any;
}
export declare const projectFund: ProjectFundFields;
