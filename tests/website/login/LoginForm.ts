import { Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

/**
 * 用户输入用户名和密码登录
 * 
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Task} 
 */
export const submitUserLoginForm = {
    using: (username: string, password: string) =>
        Task.where(`#actor logs in with ${username} and ${password}`,
            Enter.theValue(username).into(usernameField()),
            Enter.theValue(password).into(passwordField()),
            Click.on(loginButton()),
        ),
}

// 登录的form表单
export const usernameField = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_txtUserID')).describedAs('username field');

export const passwordField = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_txtPassword')).describedAs('password field');

export const loginButton = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_btnSigninBtn')).describedAs('OK button');