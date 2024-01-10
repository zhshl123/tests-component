/**
 * 打开目标页面， 传入页面名称
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
export declare const openPage: {
    using: (targetPageName: string) => any;
};
export declare const openLoginPage: () => any;
/**
 * 先判断是否需要登录后再打开目标页面
 * @param targetPageName 页面名称
 * @returns
 */
export declare const openLoginPageConditional: (targetPageName: string) => any;
export declare const loginPanel: () => any;
