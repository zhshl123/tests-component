import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { addVendorAttributeMap } from './AddVendorAttributes';

export class AddVendorFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
 * 字段的输入框组合（包含字段名和输入框）
 * @param fieldName 字段名称
 * @returns 
 */
    attributeFieldGroup = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`.c-lygrid__cell_rowspan1[cid="${mappedFieldName}"]`))
            .describedAs('attribute field: ' + fieldName)
    }
}

export const vendorAdd = new AddVendorFields(addVendorAttributeMap)