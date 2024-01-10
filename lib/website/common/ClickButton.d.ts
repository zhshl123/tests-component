/**
 * 点击目标按钮（主要为page顶部的按钮）
 * @param targetButtonName 目标按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export declare const clickButton: {
    using: (targetButtonName: string) => any;
};
/**
 * 点击列表中首行的的按钮
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export declare const clickButtonInList: {
    using: (buttonName: string) => any;
};
/**
 * 点击Section的按钮（页面中只有一个bulk edit section时可用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export declare const clickSectionButton: {
    using: (buttonName: string) => any;
};
/**
 * 点击指定Section的按钮（页面中有多个bulk edit section时使用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 * @param parentElement section的元素名称
 */
export declare const clickSectionButtonOfTargetElement: {
    using: (buttonName: string, parentElement: Question<any>) => any;
};
/**
 * 点击Tab页面中Grid Section顶部的按钮
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
export declare const clickGridButton: {
    using: (tabPage: string, GridButton: string) => any;
};
/**
 * 点击Tab页面中Grid Section全选CheckBox
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
export declare const clickSelectAllCheckBox: {
    using: (tabPage: string, GridButton: string) => any;
};
/**
 * click action button (一般为页面顶部的操作按钮)
 * @returns
 */
export declare const clickActionButton: {
    using: (buttonName: string) => any;
};
/**
 * click grid内部的button (一般为Grid行内的操作按钮)
 * @returns
 */
export declare const clickGridCellButton: {
    using: (buttonName: string) => any;
};
/**
 * click Popup Window的button
 * @returns
 */
export declare const clickPopupButton: {
    using: (buttonName: string) => any;
};
/**
 * 检查按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export declare const checkButtonVisible: {
    using: (buttonName: string, expectedResult: string) => any;
};
/**
 * 检查Section 按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export declare const checkSectionButtonVisible: {
    using: (buttonName: string, expectedResult: string) => any;
};
/**
 * 检查bulk edit section 按钮是否可点击（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可点击 FAILED 按钮不可点击
 */
export declare const checkButtonEnable: {
    using: (buttonName: string, expectedResult: string) => any;
};
/**
 * 根据按钮名称获取列表首行的按钮
 * @param buttonName 按钮名称
 * @returns
 */
export declare const buttonInList: (buttonName: string) => any;
/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、OK）
 * @param targetButton
 * @returns
 */
export declare const targetButton: (targetButtonName: string) => any;
export declare const commonButton: (targetButtonName: string) => any;
export declare const sectionButton: (buttonName: string) => any;
export declare const sectionButtonOfTargetElement: (buttonName: string, parentElement: Question<any>) => any;
export declare const actionButton: (buttonName: string) => any;
/**
 * Grid通用的按钮组件 （Add、Export、Load From、Batch Delete）
 * @param targetButton
 * @param tabName
 * @returns
 */
export declare const targetGridButton: (tabName: string, targetGridButton: string) => any;
/**
 * Grid全选CheckBox（例Solicitation Bidders Tab Grid）
 * @param targetButton
 * @param tabName
 * @returns
 */
export declare const selectAllCheckBox: (tabName: string, targetGridButton: string) => any;
/**
 * Grid内button（例Edit、Delete Button）
 * @param targetButton
 * @returns
 */
export declare const gridButton: (targetGridButton: string) => any;
/**
 * Popup button（例OK、Cancel Button）
 * @param targetButton
 * @returns
 */
export declare const popupButton: (targetPopupButton: string) => any;
