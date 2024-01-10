import { isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { FilteringMap } from './FilteringAttributes';

export class EditFiltering extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }
}

export const Filtering = new EditFiltering(FilteringMap)