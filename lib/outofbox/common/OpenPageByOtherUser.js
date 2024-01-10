"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginButton = exports.passwordField = exports.usernameField = exports.submitUserLoginFormByOtherUser = exports.UserType = exports.checkCurrentPageTitle = exports.loginForm = exports.logout = exports.openLoginPageConditional = exports.openLoginPage = exports.openPageByOtherUser = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const WebsitePageMap_1 = require("../WebsitePageMap");
const statics_1 = require("./statics");
/**
 * 打开目标页面， 传入页面名称
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
exports.openPageByOtherUser = {
    using: (targetPageName, userType) => {
        core_1.Wait.for(core_1.Duration.ofSeconds(3));
        // 如果目标页面是登录页
        return WebsitePageMap_1.pageMap.get(targetPageName) === WebsitePageMap_1.pageMap.get(DefaultStaticParams_1.LOGIN) ? (0, exports.openLoginPage)() : (0, exports.openLoginPageConditional)(targetPageName, userType);
    }
};
/**
 * 打开登录页
 * @param targetPageName 页面名称
 * @returns
 */
const openLoginPage = () => core_1.Task.where(`#actor open login page`, web_1.Navigate.to(WebsitePageMap_1.pageMap.get(DefaultStaticParams_1.LOGIN)), core_1.Wait.until((0, exports.loginForm)(), (0, web_1.isVisible)()));
exports.openLoginPage = openLoginPage;
/**
 * 先判断是否需要登录后再打开目标页面
 * @param targetPageName 页面名称
 * @returns
 */
const openLoginPageConditional = (targetPageName, userType) => core_1.Task.where(`#actor login to page ${targetPageName}`, 
// 如果目标页面不是登录页，并且还没有登录过，这里需要先登录，然后再打开目标页面
core_1.Check.whether(web_1.Cookie.called(statics_1.X_TOKEN).value(), (0, assertions_1.isPresent)())
    .andIfSo(core_1.Log.the('user logged in outofbox')).otherwise((0, exports.openLoginPage)(), exports.submitUserLoginFormByOtherUser.using(userType), core_1.Wait.for(core_1.Duration.ofSeconds(3))), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Navigate.to(WebsitePageMap_1.pageMap.get(targetPageName)), core_1.Log.the(web_1.Navigate.to(WebsitePageMap_1.pageMap.get(targetPageName))));
exports.openLoginPageConditional = openLoginPageConditional;
// 添加退出登录的操作
const logout = () => core_1.Task.where('Logout', web_1.Navigate.to(WebsitePageMap_1.pageMap.get(DefaultStaticParams_1.LOGOUT)), core_1.Wait.until((0, exports.loginForm)(), (0, web_1.isVisible)()));
exports.logout = logout;
// 登录form表单的面单
const loginForm = () => web_1.PageElement.located(web_1.By.css('.clogin__form'))
    .describedAs('login form');
exports.loginForm = loginForm;
/**
 * 检查当前页面title(浏览器tab上显示名称)
 * @param pageTitleName 页面标题
 */
exports.checkCurrentPageTitle = {
    using: (pageTitleName) => core_1.Task.where(`#actor check current page title with:${pageTitleName}}]`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.includes)(pageTitleName)))
};
exports.UserType = {
    VENDOR: 'Vendor',
    CONTRACT_MANAGER: 'Contract Manager',
    PROJECT_MANAGER: 'Project Manager',
    INTERNAL_STAFF: 'Internal Staff',
    // 添加其他用户类型
    CUSTOM_WORKSPACE: 'Custom Workspace'
};
exports.submitUserLoginFormByOtherUser = {
    using: (userType) => {
        let username = '';
        let password = '';
        // 根据用户类型填充不同的用户名和密码
        if (userType === exports.UserType.VENDOR) {
            username = 'Vendor';
            password = 'Vendor123';
        }
        if (userType === exports.UserType.PROJECT_MANAGER) {
            username = 'beattya';
            password = 'Digi0115';
        }
        if (userType === exports.UserType.CUSTOM_WORKSPACE) {
            username = 'Workspace_user';
            password = 'Workspace_user11';
        }
        else if (userType === exports.UserType.CONTRACT_MANAGER) {
            username = 'becknera';
            password = 'Digi12345';
        }
        // 添加其他用户类型的用户名和密码
        return core_1.Task.where(`#actor logs in with ${username} and ${password}`, web_1.Enter.theValue(username).into((0, exports.usernameField)()), web_1.Enter.theValue(password).into((0, exports.passwordField)()), web_1.Click.on((0, exports.loginButton)()));
    },
};
// 登录的form表单
const usernameField = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_txtUserID')).describedAs('username field');
exports.usernameField = usernameField;
const passwordField = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_txtPassword')).describedAs('password field');
exports.passwordField = passwordField;
const loginButton = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_btnSigninBtn')).describedAs('OK button');
exports.loginButton = loginButton;
//# sourceMappingURL=OpenPageByOtherUser.js.map