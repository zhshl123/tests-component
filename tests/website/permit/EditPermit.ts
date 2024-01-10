import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { permitMap } from './PermitAttributes';

export class EditPermit extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }

    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_select_taglist"]`))
            .describedAs('dropdown field: ' + fieldName)

    }
}
export const permit = new EditPermit(permitMap)