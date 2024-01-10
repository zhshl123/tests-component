import { Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

// 用户输入用户名和密码登录
export const userLogin = {
    using: (username: string, password: string) =>
        Task.where(`#actor logs in with ${username} and ${password}`,
            Enter.theValue(username).into(usernameField()),
            Enter.theValue(password).into(passwordField()),
            Click.on(loginButton()),
        ),
}

// 登录的form表单
const usernameField = () =>
    PageElement.located(By.id('loginUsername')).describedAs('username field')

const passwordField = () =>
    PageElement.located(By.id('loginPassword')).describedAs('password field')

const loginButton = () =>
    PageElement.located(By.cssContainingText('.c-button', 'Login')).describedAs('login button')
