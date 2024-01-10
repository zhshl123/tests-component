import { By, PageElement } from '@serenity-js/web';

import { PageTabs } from '../common/abstract';

export class FilteringTab extends PageTabs {
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
        PageElement.located(By.id('ctl00_cipTabs_UcFilteringTabs_divTab'))
            .describedAs('tab panel')
}

const filterPhaseTabMap = new Map()
filterPhaseTabMap.set('Step 2: Select and Adjust Projects', 2)
filterPhaseTabMap.set('Step 3: Filtering Result', 3)

export const filteringPhaseTab = new FilteringTab(filterPhaseTabMap)