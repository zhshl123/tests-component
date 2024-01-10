import { Ensure } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core'
import { By, isVisible, PageElement } from '@serenity-js/web';

import { SUCCEEDED } from '../../DefaultStaticParams'

// 用户登录结果
export const verifyUserLoginResult = {
    using: (expectLoginResult: string) => {
        // 成功
        return expectLoginResult == SUCCEEDED ? Task.where(`#actor login result is ${expectLoginResult}`,
            Ensure.eventually(cipLogoIcon(), isVisible())
        ) : Task.where(`#actor login result is ${expectLoginResult}`,
            Ensure.eventually(alertMessage(), isVisible())
        )
    }
}



// 登录失败后的提示信息
export const alertMessage = () => PageElement.located(By.css('.c-msgerror__info')).describedAs('alert message');

// 首页的logo
export const cipLogoIcon = () => PageElement.located(By.css('.c-page__header')).describedAs('cipplaner header');