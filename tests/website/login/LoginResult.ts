
import { Ensure} from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core'
import { By, isVisible,PageElement } from '@serenity-js/web';

import { SUCCEEDED } from '../../DefaultStaticParams'

// 用户登录结果
export const verifyUserLoginResult = {
    using: (expectLoginResult: string) => {
        // 成功
        // eslint-disable-next-line unicorn/prefer-ternary
        if (expectLoginResult == SUCCEEDED) {
            return Task.where(`#actor login result is ${expectLoginResult}`,
                Ensure.eventually(cipLogoIcon(), isVisible()),
                Ensure.eventually(cipMenus(), isVisible())
            )
        } else {
            // 失败
            return Task.where(`#actor login result is ${expectLoginResult}`,
                Check.whether(alertMessage(), isVisible())
                .andIfSo(Log.the('user login Failed'))
                .otherwise(Ensure.eventually(validCodeInputField(), isVisible()))
                
            )
        }
    }

}

// 多次登录失败后验证码输入框
export const validCodeInputField = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_txtCode')).describedAs('valid input field');

// 登录失败后的提示信息
export const alertMessage = () =>
    PageElement.located(By.id('ctl00_LoginZone_Login1_lblMessage')).describedAs('alert message');

// 登录成功后首页的logo
export const cipLogoIcon = () =>
    PageElement.located(By.id('citylogo')).describedAs('cipplaner logo');

// 登录成功后首页menu
export const cipMenus = () =>
    PageElement.located(By.id('CIPMenu')).describedAs('ciplanner menus')