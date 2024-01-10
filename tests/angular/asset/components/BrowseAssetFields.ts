import { By, PageElements } from '@serenity-js/web';

import { BrowseFormFields } from '../../common/abstract';

export class BrowseAssetFields extends BrowseFormFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    editButtonInGrid = () => {
        return PageElements.located(By.css(`[cid="iconbutton1"]`)).first()
            .describedAs('edit button in grid')
    }

    printBarCodeButtonInGrid = () => {
        return PageElements.located(By.css(`[cid="iconbutton2"]`)).first()
            .describedAs('print bar code button in grid')
    }
}


export const assetBrowse = new BrowseAssetFields(new Map())