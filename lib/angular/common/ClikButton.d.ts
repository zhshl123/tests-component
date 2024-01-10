/**
 * 点击目标按钮
 * @param targetButtonName 按钮名称
 * @param nthButton 第几个按钮 默认0
 */
export declare const clickButton: {
    using: (targetButtonName: string, nthButton?: number) => any;
};
/**
 * 点击目标按钮
 */
export declare const clickIconButton: {
    using: (targetButtonName: string, nthButton?: number) => any;
};
/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、）
 * @param targetButton
 * @returns
 */
export declare const targetButton: {
    getButton: (targetButtonName: string, nthButton?: number) => any;
};
/**
 * 通用图形的按钮组件,主要为页面顶部的图形按钮，例如open in a tab，弹窗的关闭按钮等
 * @param buttonName
 * @returns
 */
export declare const iconButton: (buttonName: string, nthButton?: number) => any;
