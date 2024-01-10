import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { Page } from '@serenity-js/web';

// 检查page title（浏览器tab上显示的名字）
export const checkPageTitle = {
    using: (expectedPageTitle: string) =>
        Task.where(`#actor check the page title is ${expectedPageTitle} or not`,
            Ensure.eventually(
                Page.current().title(),
                equals(expectedPageTitle),
            )

        )
}