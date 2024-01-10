/**
 * 检查bulk edit按钮点出的弹窗页面
 * @returns
 */
export declare const checkBulkEditControlPanel: () => any;
/**
 * 点击BUlk Edit 表格里的下拉框的按钮
 * @param 父级html元素
 * @returns
 */
export declare const clickBulkEditDropdownIcon: {
    using: (parentElement: Question<any>) => any;
};
/**
 * 点击下拉框的某个值
 * @param 要选择的值
 * @returns
 */
export declare const clickBulkEditDropdownItem: {
    using: (itemName: string) => any;
};
/**
 * 点击Bulik edit Section顶部的按钮
 * @param 按钮名称
 */
export declare const clickBulkEditSetionButton: {
    using: (buttonName: string) => any;
};
/**
 * 检查Bulik edit Section顶部的按钮是否可见
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export declare const checkBulkEditSetionButtonVisible: {
    using: (buttonName: string, expectedResult: string) => any;
};
export declare const bulkEditControlPopupPanel: () => any;
export declare const bulkEditDropdownContainer: () => any;
export declare const bulkEditDropdownIcon: (parentElement: Question<any>) => any;
export declare const bulkEditDropdownListBox: () => any;
export declare const bulkEditDropdownList: () => any;
export declare const bulkEditDropdownItem: (itemName: string) => any;
export declare const bulkEditSectionButton: (buttonName: string) => any;
