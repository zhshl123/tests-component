import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract';
export declare class EditProjectFields extends EditFromFields {
    entityMap: Map<string, string>;
    timestamp: string;
    cycle: string;
    scenario: string;
    pprojectName: string;
    constructor(entityMap: any);
    addMasterProjectButton: () => any;
    /**
     * check message popup is visible
     * @returns
     */
    waitMessagePopupBoxVisible: () => any;
    firstExpandIconInGrid: () => any;
    /**
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns
     */
    lookupInputFieldUl: (fieldName: string) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /**
     * 下拉列表的值
     * @param fieldName 字段名称
     * @param itemName 具体的选项名称
     * @returns
     */
    dropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
    projectStructureTree: () => any;
    projectStructureTreeBranch: (projectName: string | Question<any>) => any;
    /*************************** copy selected project 弹窗******************************** */
    copySelectedProjectPopup: () => any;
    copySelectedProjectDropdownField: (fieldName: string) => any;
    copySelectedProjectDropdownListBox: (fieldName: string) => any;
    copySelectedProjectDropdownList: (fieldName: string) => any;
    copySelectedProjectDropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
    selectCopySelectedProjectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    copySelectedProjectScopingCheckbox: () => any;
    copySelectedProjectOKButton: () => any;
}
export declare const project: EditProjectFields;
