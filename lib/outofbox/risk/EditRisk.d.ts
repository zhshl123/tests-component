import { Question } from '@serenity-js/core';
import { EditFromFields, Workflow } from '../common/abstract';
export declare class EditRisk extends EditFromFields {
    entityMap: Map<string, string>;
    riskId: string;
    constructor(entityMap: any);
    dropdownListBox: (fieldName: string) => any;
    lookupInputField: (fieldName: string) => any;
    lookupDropdownListBox: (fieldName: string) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    checkLooukupInputfieldIsEmpty: (fieldName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
    /**
     * check message popup is visible
     * @returns
     */
    waitMessagePopupBoxVisible: () => any;
    /************************** Comment List ************************************** */
    commentSectionFrame: () => any;
    addCommentIcon: () => any;
    addCommentPanel: () => any;
    addCommentPanelSaveButton: () => any;
    addCommentPanelCommentInputField: () => any;
    commentListTable: () => any;
    commentListTableCell: (comment: string) => any;
    /**
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldUl: (fieldName: string) => any;
}
export declare const risk: EditRisk;
export declare const riskWorkflow: Workflow;
