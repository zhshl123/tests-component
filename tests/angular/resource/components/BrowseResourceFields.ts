import { By, PageElements } from '@serenity-js/web';

import { BrowseFormFields } from '../../common/abstract';

export class BrowseResourceFields extends BrowseFormFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    editButtonInGrid = () => {
        return PageElements.located(By.css(`[cid="iconbutton1"]`)).first()
            .describedAs('edit button in grid')
    }

}


export const browseResource = new BrowseResourceFields(new Map())