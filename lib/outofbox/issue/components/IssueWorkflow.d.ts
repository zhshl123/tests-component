import { Question } from '@serenity-js/core';
import { Workflow } from '../../common/abstract';
export declare class IssueWorkflow extends Workflow {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    selectWorkflowInput: () => any;
    /**
     * 在下拉框的输入框中直接填入选项值
     * @param fieldName 字段名
     * @param itemName 选项值
     * @returns
     */
    fillDropdownInputField: (itemName: string | Question<any>) => any;
}
export declare const issueWorkflow: IssueWorkflow;
