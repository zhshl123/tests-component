import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { vendorAttributeMap } from './VendorAttributes';

export class EditVendorFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
  
    countryStateloadingIcon = () =>
        PageElement.located(By.id('ajaxMask'))
            .describedAs('country states loading icon')

}

export const vendor = new EditVendorFields(vendorAttributeMap)