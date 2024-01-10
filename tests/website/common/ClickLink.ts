import { Question, Task } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

export const clickLink = {
    using: (linkText: string|Question<any>) =>
        Task.where(`#actor click the link ${linkText}`,
            Click.on(link(linkText))

        )
}

export const link = (linkText: string|Question<any>) =>
    PageElement.located(By.cssContainingText('a', linkText))
        .describedAs('grid link')