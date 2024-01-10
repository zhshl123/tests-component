/**
 * 打开目标页面， 传入页面名称
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
export declare const openPageByOtherUser: {
    using: (targetPageName: string, userType: string) => any;
};
/**
 * 打开登录页
 * @param targetPageName 页面名称
 * @returns
 */
export declare const openLoginPage: () => any;
/**
 * 先判断是否需要登录后再打开目标页面
 * @param targetPageName 页面名称
 * @returns
 */
export declare const openLoginPageConditional: (targetPageName: string, userType: string) => any;
export declare const logout: () => any;
export declare const loginForm: () => any;
/**
 * 检查当前页面title(浏览器tab上显示名称)
 * @param pageTitleName 页面标题
 */
export declare const checkCurrentPageTitle: {
    using: (pageTitleName: string) => any;
};
export declare const UserType: {
    VENDOR: string;
    CONTRACT_MANAGER: string;
    PROJECT_MANAGER: string;
    INTERNAL_STAFF: string;
    CUSTOM_WORKSPACE: string;
};
export declare const submitUserLoginFormByOtherUser: {
    using: (userType: string) => any;
};
export declare const usernameField: () => any;
export declare const passwordField: () => any;
export declare const loginButton: () => any;
