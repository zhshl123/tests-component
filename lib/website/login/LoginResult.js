"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cipMenus = exports.cipLogoIcon = exports.alertMessage = exports.validCodeInputField = exports.verifyUserLoginResult = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
// 用户登录结果
exports.verifyUserLoginResult = {
    using: (expectLoginResult) => {
        // 成功
        // eslint-disable-next-line unicorn/prefer-ternary
        if (expectLoginResult == DefaultStaticParams_1.SUCCEEDED) {
            return core_1.Task.where(`#actor login result is ${expectLoginResult}`, assertions_1.Ensure.eventually((0, exports.cipLogoIcon)(), (0, web_1.isVisible)()), assertions_1.Ensure.eventually((0, exports.cipMenus)(), (0, web_1.isVisible)()));
        }
        else {
            // 失败
            return core_1.Task.where(`#actor login result is ${expectLoginResult}`, core_1.Check.whether((0, exports.alertMessage)(), (0, web_1.isVisible)())
                .andIfSo(core_1.Log.the('user login Failed'))
                .otherwise(assertions_1.Ensure.eventually((0, exports.validCodeInputField)(), (0, web_1.isVisible)())));
        }
    }
};
// 多次登录失败后验证码输入框
const validCodeInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_txtCode')).describedAs('valid input field');
exports.validCodeInputField = validCodeInputField;
// 登录失败后的提示信息
const alertMessage = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_lblMessage')).describedAs('alert message');
exports.alertMessage = alertMessage;
// 登录成功后首页的logo
const cipLogoIcon = () => web_1.PageElement.located(web_1.By.id('citylogo')).describedAs('cipplaner logo');
exports.cipLogoIcon = cipLogoIcon;
// 登录成功后首页menu
const cipMenus = () => web_1.PageElement.located(web_1.By.id('CIPMenu')).describedAs('ciplanner menus');
exports.cipMenus = cipMenus;
//# sourceMappingURL=LoginResult.js.map