import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditProposalFields extends EditFromFields {
    entityMap: Map<string, string>;
    proposalName: string;
    cycle: string;
    scenario: string;
    constructor(entityMap: any);
    /**
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldUl: (fieldName: string) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /*************************** copy selected proposal 弹窗******************************** */
    copySelectedProposalPopup: () => any;
    copySelectedProposalDropdownField: (fieldName: string) => any;
    copySelectedProposalDropdownListBox: (fieldName: string) => any;
    copySelectedProposalDropdownList: (fieldName: string) => any;
    copySelectedProposalDropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
    selectCopySelectedProposalDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    copySelectedProposalScopingCheckbox: () => any;
    copySelectedProposalOKButton: () => any;
}
export declare const proposal: EditProposalFields;
