import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { documentAttributeMap } from './DocumentAttributes';

// entity中的document tab页面 例：project
export class EntityDocumentFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    selectAllCheckBox = () =>
        PageElement.located(By.id('ctl00_body_gvDoc_ctl02_GridView_HearderCheckBox'))
            .describedAs('entity document select all check box')

    gridButton = (buttonName: string) =>
        PageElement.located(By.id('ctl00_body_gvDoc_ctl01_cc' + gridButtonMap.get(buttonName)))
            .describedAs('entity document grig button:' + buttonName)
}

export const entityDocument = new EntityDocumentFields(documentAttributeMap)

const gridButtonMap = new Map()
gridButtonMap.set('Add', 'AddFiles')
gridButtonMap.set('Batch Delete', 'BatchDelete')