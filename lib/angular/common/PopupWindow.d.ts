/**
 * 弹窗集合
 * @returns
 */
export declare const allPopupWindows: () => any;
/**
 * 目标弹窗
 * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
 * @returns
 */
export declare const targetPopupWindow: (nthWindow: number) => any;
/**
 * 提示信息弹窗
 * @returns
 */
export declare const alertMssageBox: () => any;
/**
 * 提示信息弹窗的按钮
 * @param buttonName
 * @returns
 */
export declare const buttonInAlertMessageBox: (buttonName: string) => any;
/**
 * 提示信息框的标题图标
 * @returns
 */
export declare const iconInAlertMessageBox: () => any;
/**
 * 检查提示信息弹窗，并关闭
 * @returns
 */
export declare const checkAndCloseAlertMessageBox: () => any;
/**
 * 检查提示信息弹窗，并关闭弹窗
 * @returns
 */
export declare const checkAndClosePopupWindow: () => any;
