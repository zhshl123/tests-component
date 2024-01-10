import { By, PageElement } from '@serenity-js/web';

import { PageTabs } from '../common/abstract';

export class ScopingTab extends PageTabs {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 左侧tab的面板(子类可重写此方法)
     * @param entityName entity name
     * @returns 
     */
    tabPanel = () =>
        PageElement.located(By.id('ctl00_cipTabs_divTab'))
            .describedAs('tab panel')

}

export const scopingTemplateTab = new ScopingTab(new Map())