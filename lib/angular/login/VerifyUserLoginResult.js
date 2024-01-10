"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cipLogoIcon = exports.alertMessage = exports.verifyUserLoginResult = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
// 用户登录结果
exports.verifyUserLoginResult = {
    using: (expectLoginResult) => {
        // 成功
        return expectLoginResult == DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor login result is ${expectLoginResult}`, assertions_1.Ensure.eventually((0, exports.cipLogoIcon)(), (0, web_1.isVisible)())) : core_1.Task.where(`#actor login result is ${expectLoginResult}`, assertions_1.Ensure.eventually((0, exports.alertMessage)(), (0, web_1.isVisible)()));
    }
};
// 登录失败后的提示信息
const alertMessage = () => web_1.PageElement.located(web_1.By.css('.c-msgerror__info')).describedAs('alert message');
exports.alertMessage = alertMessage;
// 首页的logo
const cipLogoIcon = () => web_1.PageElement.located(web_1.By.css('.c-page__header')).describedAs('cipplaner header');
exports.cipLogoIcon = cipLogoIcon;
//# sourceMappingURL=VerifyUserLoginResult.js.map