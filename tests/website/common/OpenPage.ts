import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { By, Cookie, isVisible, Navigate, Page, PageElement } from '@serenity-js/web';

import { LOGIN } from '../../DefaultStaticParams';
import { DefaultUser } from '../../DefaultUser';
import { submitUserLoginForm } from '../login';
import { pageMap } from '../WebsitePageMap';
import { X_TOKEN } from './statics';

/**
 * 打开目标页面， 传入页面名称 
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
export const openPage = {
    using: (targetPageName: string) => {
        Wait.for(Duration.ofSeconds(3))
        // 如果目标页面是登录页
        return pageMap.get(targetPageName) === pageMap.get(LOGIN) ? openLoginPage() : openLoginPageConditional(targetPageName);
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
export const openLoginPageConditional = (targetPageName: string) =>
    Task.where(`#actor login to page ${targetPageName}`,
        // 如果目标页面不是登录页，并且还没有登录过，这里需要先登录，然后再打开目标页面
        Check.whether(Cookie.called(X_TOKEN).value(), isPresent())
            .andIfSo(
                Log.the('user logged in website')
            ).otherwise(
                openLoginPage(),
                submitUserLoginForm.using(DefaultUser.username, DefaultUser.password),
                Wait.for(Duration.ofSeconds(3)),

            ),
        Wait.for(Duration.ofSeconds(2)),
        Navigate.to(pageMap.get(targetPageName)),
        Log.the(Navigate.to(pageMap.get(targetPageName))),
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