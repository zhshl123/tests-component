import { Task } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

import { PageTabs } from '../../common/abstract';

export class SolicitationTabs extends PageTabs{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }

    clickSolicitationTab = (tabName: string) => {
        return Task.where(`#actor click tab: ${tabName}`,
            Click.on(this.tabByTabId( tabName)))
    };

    clickRankingPhaseTab =  (tabName: string) => {
        return Task.where(`#actor click tab: ${tabName}`,
            Click.on(this.tab( tabName)))
    };

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
}

const solicitationTabMap = new Map()
solicitationTabMap.set('Questions', '2')
solicitationTabMap.set('Bidders', '5')
solicitationTabMap.set('Responses', '11')
solicitationTabMap.set('Evaluators', '12')
solicitationTabMap.set('Quotes', '3')
solicitationTabMap.set('RankingPhases', '50')

export const solicitationTab= new SolicitationTabs(solicitationTabMap)