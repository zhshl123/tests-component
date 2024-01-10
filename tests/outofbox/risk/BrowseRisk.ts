import { By, PageElement } from '@serenity-js/web';

import { SearchFromFields } from '../common/abstract';
import { riskMap } from './RiskAttributes';

export class BrowseRisk extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
    
    riskTabFrame = () =>
        PageElement.located(By.id('ctl00_body_iFrame'))
            .describedAs('contract Risks tab frame')

    addNewIcon = () =>
        PageElement.located(By.id('lnkNew'))
            .describedAs('contract risk page Add New icon')
}

export const browseRiskInfo = new BrowseRisk(riskMap)