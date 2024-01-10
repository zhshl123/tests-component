import { Duration, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

export class PageTabs {

    /**
     * 点击tab
     * @param tabName tab名称
     * @returns 
     */
    clickTab = (tabName: string) =>
        Task.where(`#actor click tab ${tabName}`,
            Click.on(this.targetTab(tabName)),
            Wait.for(Duration.ofSeconds(3))
        )

    tabListBox = () =>
        PageElement.located(By.css('.ng-star-inserted.c-tab'))
            .describedAs('tab list box')

    targetTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('.c-tab__item span', tabName))
            .of(this.tabListBox())
            .describedAs('tab:' + tabName)

}

export const pageTabs = new PageTabs()