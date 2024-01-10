"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
// 用户输入用户名和密码登录
exports.userLogin = {
    using: (username, password) => core_1.Task.where(`#actor logs in with ${username} and ${password}`, web_1.Enter.theValue(username).into(usernameField()), web_1.Enter.theValue(password).into(passwordField()), web_1.Click.on(loginButton())),
};
// 登录的form表单
const usernameField = () => web_1.PageElement.located(web_1.By.id('loginUsername')).describedAs('username field');
const passwordField = () => web_1.PageElement.located(web_1.By.id('loginPassword')).describedAs('password field');
const loginButton = () => web_1.PageElement.located(web_1.By.cssContainingText('.c-button', 'Login')).describedAs('login button');
//# sourceMappingURL=UserLogin.js.map