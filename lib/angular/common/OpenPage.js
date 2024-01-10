"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPanel = exports.openLoginPageConditional = exports.openLoginPage = exports.openPage = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const DefaultUser_1 = require("../../DefaultUser");
const StaticCookie_1 = require("../../website/common/statics/StaticCookie");
const UserLogin_1 = require("../login/UserLogin");
const PageMap_1 = require("../PageMap");
/**
 * 打开目标页面， 传入页面名称
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
exports.openPage = {
    using: (targetPageName) => {
        // 如果目标页面不是登录页，这里需要先登录，然后再打开目标页面
        return PageMap_1.pageMap.get(targetPageName) == PageMap_1.pageMap.get(DefaultStaticParams_1.LOGIN) ? (0, exports.openLoginPage)() : core_1.Task.where(`#actor set cookies to page ${targetPageName}`, (0, exports.openLoginPageConditional)(targetPageName));
    }
};
// 打开登录页
const openLoginPage = () => core_1.Task.where(`#actor open login page`, web_1.Navigate.to(PageMap_1.pageMap.get(DefaultStaticParams_1.LOGIN)), core_1.Wait.until((0, exports.loginPanel)(), (0, web_1.isVisible)()));
exports.openLoginPage = openLoginPage;
/**
 * 先判断是否需要登录后再打开目标页面
 * @param targetPageName 页面名称
 * @returns
 */
const openLoginPageConditional = (targetPageName) => core_1.Task.where(`#actor login to page ${targetPageName}`, 
// 如果目标页面不是登录页，并且还没有登录过，这里需要先登录，然后再打开目标页面
core_1.Check.whether(web_1.Cookie.called(StaticCookie_1.X_TOKEN).value(), (0, assertions_1.isPresent)())
    .andIfSo(core_1.Log.the('user logged in website')).otherwise((0, exports.openLoginPage)(), UserLogin_1.userLogin.using(DefaultUser_1.DefaultUser.username, DefaultUser_1.DefaultUser.password), core_1.Wait.for(core_1.Duration.ofSeconds(5))), web_1.Navigate.to(PageMap_1.pageMap.get(targetPageName)), core_1.Log.the(web_1.Navigate.to(PageMap_1.pageMap.get(targetPageName))), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.openLoginPageConditional = openLoginPageConditional;
// 登录form表单的面单
const loginPanel = () => web_1.PageElement.located(web_1.By.css('.c-login__contain'))
    .describedAs('login panel');
exports.loginPanel = loginPanel;
//# sourceMappingURL=OpenPage.js.map