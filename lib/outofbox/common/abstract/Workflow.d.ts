import { Question } from '@serenity-js/core';
export declare class Workflow {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    startWorkflow: () => any;
    terminateWorkflow: () => any;
    acceptWorkflowTaskAndsubmitReviewResult: (reviewResult: string) => any;
    completeWorkflow: () => any;
    approveWorkflow: () => any;
    acknowledgeWorkflow: () => any;
    /**
    * 选择view result下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectReviewResult: (itemName: string | Question<any>) => any;
    /**
    * 选择Select a workflow下拉框选项
    * @param fieldName
    * @param itemName
    * @returns
    */
    selectAWorkflow: (itemName: string | Question<any>) => any;
    /**************************************************** html 元素组件************************************************* */
    reviewResultInput: () => any;
    reviewResultDropdownListBox: () => any;
    reviewResultDropdownList: () => any;
    reviewResultDropdownItem: (itemName: string | Question<any>) => any;
    participantsTable: () => any;
    participantsTableCell: (username: string) => any;
    selectWorkflowDropdownInputField: () => any;
    selectWorkflowDropdownListBox: () => any;
    selectWorkflowDropdownList: () => any;
    selectWorkflowDropdownItem: (itemName: string | Question<any>) => any;
    processTypeReadOnlyField: () => any;
}
