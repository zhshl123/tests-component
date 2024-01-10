
import { Ensure, includes, not } from '@serenity-js/assertions';
import { Question, Task } from '@serenity-js/core';
import { By, PageElement, Text } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';
import { EditFromFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class EditSolicitationFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    checkReadOnlyLabelValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), includes(itemName))
        ) : Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), not(includes(itemName)))
        );
    }

    lookupInputFieldClearIcon = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs(fieldName + ' looukup input field clear icon')

    departmentLookupInputFieldValue = (fieldName: string, itemName) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('department lookup input field value')

}
export const solicitation = new EditSolicitationFields(solicitationAttributesMap)
