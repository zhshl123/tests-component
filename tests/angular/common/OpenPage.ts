import { isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { By, Cookie, isVisible, Navigate, PageElement } from '@serenity-js/web';

import { LOGIN } from '../../DefaultStaticParams';
import { DefaultUser } from '../../DefaultUser';
import { X_TOKEN } from '../../website/common/statics/StaticCookie';
import { userLogin } from '../login/UserLogin';
import { pageMap } from '../PageMap';

/**
 * 打开目标页面， 传入页面名称 
 * 页面的页面名称与对应url键值对设置在pageMap中set
 */
export const openPage = {
    using: (targetPageName: string) => {
        // 如果目标页面不是登录页，这里需要先登录，然后再打开目标页面
        return pageMap.get(targetPageName) == pageMap.get(LOGIN) ? openLoginPage() : Task.where(`#actor set cookies to page ${targetPageName}`,
            openLoginPageConditional(targetPageName)
        )
    }

}

// 打开登录页
export const openLoginPage = () =>
    Task.where(`#actor open login page`,
        Navigate.to(pageMap.get(LOGIN)),
        Wait.until(loginPanel(), isVisible())
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
                userLogin.using(DefaultUser.username, DefaultUser.password),
                Wait.for(Duration.ofSeconds(5)),

            ),
        
        Navigate.to(pageMap.get(targetPageName)),
        Log.the(Navigate.to(pageMap.get(targetPageName))),
        Wait.for(Duration.ofSeconds(5)),
    )

// 登录form表单的面单
export const loginPanel = () =>
    PageElement.located(By.css('.c-login__contain'))
        .describedAs('login panel');