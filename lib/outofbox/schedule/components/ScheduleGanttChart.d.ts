/**
 * 点击schedule gantt chart页面顶部图形按钮
 * @param 按钮名称 （图标下方的文字）
 */
export declare const clickGanttChartIconButton: {
    using: (buttonName: string) => any;
};
/**
 * 点击schedule gantt chart页面点击图形按钮的下拉图标后出现的选项或鼠标右键点击task后出现的选项
 * @param 按钮名称
 */
export declare const clickGanttChartTextButton: {
    using: (buttonName: string) => any;
};
/**
 * 在task information popup中填值
 * @param fieldName 字段名称
 * @param itemName 要改成的值
 */
export declare const fillTextInputFieldInTaskPopup: {
    using: (fieldName: string, itemName: string) => any;
};
/**
 * 选择resource
 * @param itemName resource名称
 *
 */
export declare const selectResourceInTaskInfoPopup: {
    using: (itemName: string) => any;
};
/**
 * 点击提示信息框Ok按钮
 * @returns
 */
export declare const clickOkButtonInMessageBox: () => any;
/************************************ html 元素组件 ******************************** */
/**
 * 图形按钮
 * @param buttonName 按钮名称（图形下方显示的名称）
 * @returns
 */
export declare const ganttChartIconButton: (buttonName: string) => any;
/**
 * 文字按钮（带有下拉图标的按钮点击后出现的选项按钮）
 * @param buttonName 选项名称
 * @returns
 */
export declare const ganttChartTextButton: (buttonName: string) => any;
export declare const ganttChartTextButtonBox: () => any;
/**
 * task 列表面板
 * @returns
 */
export declare const taskPanel: () => any;
/**
 * task所在的行集合
 * @param rowNumber
 * @returns
 */
export declare const taskTableTrList: () => any;
/**
 * task所在的行
 * @param rowNumber
 * @returns
 */
export declare const taskTableTr: (rowNumber: string) => any;
/**
 * task各列的单元格
 * @param rowNumber
 * @returns
 */
export declare const taskTableCell: (rowNumber: string, columnName: string) => any;
/**
 * task各列的单元格的值
 * @param rowNumber
 * @returns
 */
export declare const taskTableCellValue: (rowNumber: string, columnName: string) => any;
/**
 * task information 弹窗
 * @returns
 */
export declare const taskInformationPopup: () => any;
/**
 * task information 弹窗顶部的tab
 * @param tabName tab名称
 * @returns
 */
export declare const taskInformationPopupTab: (tabName: string) => any;
/**
 * task information 弹窗中的文本输入框
 * @param fieldName 字段名称
 * @returns
 */
export declare const taskInformationPopupTextInputField: (fieldName: string) => any;
/**
 * task information 弹窗中 general tab的save按钮
 * @returns
 */
export declare const saveTaskButtonInTaskInfoPopup: () => any;
/**
 * task information 弹窗中Predecessors\Resources\Advenced tab的save按钮
 */
export declare const saveInterimResultButtonInTaskInfoPopup: () => any;
/**
 * task information 弹窗的关闭按钮
 * @returns
 */
export declare const closeButtonInTaskInfoPopup: () => any;
/**
 * 信息提示弹出框窗口
 * @returns
 */
export declare const ganttChartMessagePopupBox: () => any;
/**
 * 信息提示弹出框窗口的ok按钮
 * @returns
 */
export declare const OkButtonInMessagePopupBox: () => any;
/**
 * task information 弹窗中resources tab的add new按钮
 * @returns
 */
export declare const addResourceButtonInTaskInfoPopup: () => any;
/**
 * task information 弹窗中resource 列表
 * @returns
 */
export declare const resourceListInTaskInfoPopup: () => any;
/**
 * task information 弹窗中resource列表中的列
 * @param rowNumber 行号
 * @param columnName 列名
 * @returns
 */
export declare const resourceColumnInTaskInfoPopup: (rowNumber: string, columnName: string) => any;
/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉图标
 * @returns
 */
export declare const resourceNameDropdownIcon: () => any;
/**
 * task information 弹窗中resource 列表中的resource name输入框的下拉选项
 * @param itemName 选项名
 * @returns
 */
export declare const resourceNameDropdownItem: (itemName: string) => any;
