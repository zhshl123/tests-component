import { isPresent } from '@serenity-js/assertions';
import { Task, Wait } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { PageTabs } from '../../common/abstract';

export class COPageTabs extends PageTabs {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 点击tab
     * @param entityName entity名称
     * @param tabName tab名称
     * @returns 
     */
    clickTabById = (tabName: string) => {
        return Task.where(`#actor click  tab: ${tabName}`,
            Wait.until(this.tabPanel(), isPresent()),
            Click.on(this.tabByTabId(tabName))
        );
    }
}

const COPageTabMap = new Map()
COPageTabMap.set('Financial Impact', '2')

export const COTab = new COPageTabs(COPageTabMap)