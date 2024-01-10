/**
 * check message popup is show or not
 * @returns
 */
export declare const checkMessagePopupBox: () => any;
/**
 * check message popup is visible
 * @returns
 */
export declare const waitMessagePopupBoxVisible: () => any;
/**
 * wait message popup invisible
 * @returns
 */
export declare const waitMessagePopupBoxInvisible: () => any;
/**
 * click message popup button
 * @returns
 */
export declare const clickMessagePopupButton: {
    using: (buttonName: string) => any;
};
/**
 * click solicitation message popup button
 * @returns
 */
export declare const clickSolicitationMessagePopupButton: {
    using: (buttonName: string) => any;
};
/**
 * click message popup content link
 * @returns
 */
export declare const clickMessagePopupContentLink: () => any;
/**
 * 检查信息提示框内容
 * @Param 预期的文字
 * @param 期望结果 SUCCEEDED与预期一致， FAILED 与预期不一致
 * @returns
 */
export declare const checkMessagePopupContent: {
    using: (content: string, expectedResult: string) => any;
};
export declare const checkGridLoadingLayer: () => any;
export declare const waitPageSaveLodingLayerInvisible: () => any;
export declare const messagePopupBox: () => any;
export declare const solicitationMessagePopupBox: () => any;
export declare const messagePopupContent: () => any;
export declare const messagePopupButton: (buttonName: string) => any;
export declare const solicitationMessagePopupButton: (buttonName: string) => any;
export declare const messagePopupContentLink: () => any;
export declare const pageLoadingLayer: () => any;
export declare const gridLoadingLayer: () => any;
export declare const pageSaveLodingLayer: () => any;
