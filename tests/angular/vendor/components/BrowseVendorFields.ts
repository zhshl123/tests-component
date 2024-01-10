import { By, PageElements } from '@serenity-js/web';

import { BrowseFormFields } from '../../common/abstract';

export class BrowseVendorFields extends BrowseFormFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    editButtonInGrid = () => {
        return PageElements.located(By.css(`[cid="iconbutton5"]`)).first()
            .describedAs('edit button in grid')
    }

    deleteButtonInGrid = () => {
        return PageElements.located(By.css(`[cid="iconbutton6"]`)).first()
            .describedAs('delete button in grid')
    }
}

export const vendorBrowse = new BrowseVendorFields(new Map())