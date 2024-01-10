import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { By, Click, Cookie, Enter, isVisible, Navigate, Page, PageElement } from '@serenity-js/web';

import { LOGIN, LOGOUT } from '../../DefaultStaticParams';
import { pageMap,PROJECT_URL } from '../WebsitePageMap';
import { X_TOKEN } from './statics';

/**
 * 打开目标页面， 传入页面名称 
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
export const openPageByOtherUser = {
    using: (targetPageName: string,userType:string) => {
        Wait.for(Duration.ofSeconds(3))
        // 如果目标页面是登录页
        return pageMap.get(targetPageName) === pageMap.get(LOGIN) ? openLoginPage() : openLoginPageConditional(targetPageName,userType);
    }

}

/**
 * 打开登录页
 * @param targetPageName 页面名称
 * @returns 
 */
export const openLoginPage = () =>
    Task.where(`#actor open login page`,
        Navigate.to(pageMap.get(LOGIN)),
        Wait.until(loginForm(), isVisible())
    );

/**
 * 先判断是否需要登录后再打开目标页面
 * @param targetPageName 页面名称
 * @returns 
 */
export const openLoginPageConditional = (targetPageName: string, userType: string) =>
    Task.where(`#actor login to page ${targetPageName}`,
        // 如果目标页面不是登录页，并且还没有登录过，这里需要先登录，然后再打开目标页面
        Check.whether(Cookie.called(X_TOKEN).value(), isPresent())
            .andIfSo(
                Log.the('user logged in outofbox')
            ).otherwise(
                openLoginPage(),
                submitUserLoginFormByOtherUser.using(userType),
                Wait.for(Duration.ofSeconds(3)),

            ),
        Wait.for(Duration.ofSeconds(2)),
        Navigate.to(pageMap.get(targetPageName)),
        Log.the(Navigate.to(pageMap.get(targetPageName))),
    )

// 添加退出登录的操作
export const logout = () =>
    Task.where('Logout',
        Navigate.to(pageMap.get(LOGOUT)),  
        Wait.until(loginForm(), isVisible())
    )

// 登录form表单的面单
export const loginForm = () =>
    PageElement.located(By.css('.clogin__form'))
        .describedAs('login form');

/**
 * 检查当前页面title(浏览器tab上显示名称)
 * @param pageTitleName 页面标题
 */
export const checkCurrentPageTitle = {
    using: (pageTitleName: string) =>
        Task.where(`#actor check current page title with:${pageTitleName}}]`,
            Ensure.eventually(Page.current().title(), includes(pageTitleName)),

        )
}

export const UserType = {
    VENDOR: 'Vendor',
    CONTRACT_MANAGER: 'Contract Manager',
    PROJECT_MANAGER: 'Project Manager',
    INTERNAL_STAFF:'Internal Staff',
    // 添加其他用户类型
    CUSTOM_WORKSPACE: 'Custom Workspace'
};

export const submitUserLoginFormByOtherUser = {
    using: (userType: string) => {
        let username = '';
        let password = '';

        // 根据用户类型填充不同的用户名和密码
        if (userType === UserType.VENDOR) {
            username = 'Vendor';
            password = 'Vendor123';
        } if (userType === UserType.PROJECT_MANAGER) {
            username = 'beattya';
            password = 'Digi0115';
        }  if (userType === UserType.CUSTOM_WORKSPACE) {
            username = 'Workspace_user';
            password = 'Workspace_user11';
        } 
        else if (userType === UserType.CONTRACT_MANAGER) {
            username = 'becknera';
            password = 'Digi12345';
        }
        // 添加其他用户类型的用户名和密码

        return Task.where(`#actor logs in with ${username} and ${password}`,
            Enter.theValue(username).into(usernameField()),
            Enter.theValue(password).into(passwordField()),
            Click.on(loginButton()),
        );
    },
};

// 登录的form表单
export const usernameField = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_txtUserID')).describedAs('username field');

export const passwordField = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_txtPassword')).describedAs('password field');

export const loginButton = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_btnSigninBtn')).describedAs('OK button');