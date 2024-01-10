"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginButton = exports.passwordField = exports.usernameField = exports.submitUserLoginForm = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * 用户输入用户名和密码登录
 *
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Task}
 */
exports.submitUserLoginForm = {
    using: (username, password) => core_1.Task.where(`#actor logs in with ${username} and ${password}`, web_1.Enter.theValue(username).into((0, exports.usernameField)()), web_1.Enter.theValue(password).into((0, exports.passwordField)()), web_1.Click.on((0, exports.loginButton)())),
};
// 登录的form表单
const usernameField = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_txtUserID')).describedAs('username field');
exports.usernameField = usernameField;
const passwordField = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_txtPassword')).describedAs('password field');
exports.passwordField = passwordField;
const loginButton = () => web_1.PageElement.located(web_1.By.id('ctl00_LoginZone_Login1_btnSigninBtn')).describedAs('OK button');
exports.loginButton = loginButton;
//# sourceMappingURL=LoginForm.js.map