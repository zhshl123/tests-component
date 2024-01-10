import { SearchFromFields } from '../common/abstract';
export declare class SearchScopingTemplateFIelds extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns
     */
    textInputField: (fieldName: string) => any;
    /**
     * 列表首行的edit图标
     * @returns
     */
    editIconInGrid: () => any;
}
export declare const browseScopingTemplate: SearchScopingTemplateFIelds;
