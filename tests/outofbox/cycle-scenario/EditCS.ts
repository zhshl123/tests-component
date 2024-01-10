/* eslint-disable unicorn/filename-case */
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Log, Question, Task } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { CSMap } from './CSAttributes';

export class EditCS extends EditFromFields {
    entityMap: Map<string, string>
    timestamp: string
    constructor(entityMap) {
        super(entityMap);
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    selectDropdownItemB = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownFieldB(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownListB(fieldName).first(), isPresent()),
            Click.on(this.dropdownItemB(fieldName, itemName)),
        )
    }

    dropdownFieldB = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBoxB = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    dropdownListB = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.dropdownListBoxB(fieldName))
            .describedAs('dropdown list: ' + fieldName)

    dropdownItemB = (fieldName, itemName: string | Question<any>) =>
        PageElement.located(By.css(`[data-offset-index="${itemName}"]`))
            .of(this.dropdownListBoxB(fieldName))
            .describedAs('dropdown item: ' + itemName)

    clickLink = () =>
        PageElements.located(By.css(`[class="clinktext"]`)).last()

    clickLinktoEdit = () => {
        return Task.where('Click new cycle link to edit',
            Click.on(this.clickLink())
        )
    }
}

export const CS = new EditCS(CSMap)