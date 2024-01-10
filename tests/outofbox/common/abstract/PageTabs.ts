import { Task } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

export class PageTabs {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    /**
     * 点击tab
     * @param entityName entity名称
     * @param tabName tab名称
     * @returns 
     */
    clickTab = (tabName: string) => {
        return tabName.includes('Line Items') ? Task.where(`#actor click tab: ${tabName}`,
            // Wait.until(this.tabPanel(), isPresent()),
            Click.on(this.tabByTabId(tabName))

        ) : Task.where(`#actor click  tab: ${tabName}`,
            Click.on(this.tab(tabName))
        );
    }

    /**
     * 左侧tab的面板(子类可重写此方法)
     * @param entityName entity name
     * @returns 
     */
    tabPanel = () =>
        PageElement.located(By.id('cipTabsWrapper'))
            .describedAs('tab panel')

    /**
     * 指定的tab
     * @param entityName entity name
     * @param tabName tab的名称
     * @returns 
     */
    tab = (tabName: string) =>
        PageElement.located(By.cssContainingText('a', tabName))
            .of(this.tabPanel())
            .describedAs('tab:' + tabName)

    /**
     * tab的id
     * @param entityName entity name
     * @param tabName tab名称 
     * @returns 
     */
    tabByTabId = (tabName: string) => {
        const tabId = this.entityMap.get(tabName)
        return PageElement.located(By.css(`[tabid="${tabId}"]`))
            // .of(this.tabPanel(entityName))
            .describedAs('tab:' + tabId)
    }

}