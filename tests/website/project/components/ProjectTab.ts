import { By, PageElement } from '@serenity-js/web';

import { PageTabs } from '../../common/abstract';

export class ProjectTabs extends PageTabs {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /**
     * 左侧tab的面板
     * @param entityName entity name
     * @returns 
     */
    tabPanel = () =>
        PageElement.located(By.id('ctl00_cipTabs_LocationTab_tabWrapper'))
            .describedAs('tab panel')

}

export const projectTab = new ProjectTabs(new Map())
