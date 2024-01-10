import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Log, Question, Task } from '@serenity-js/core';
import { By, Clear, Click, Enter, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { assetMap } from './AssetAttributes';

export class EditAsset extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    dropdownFieldA = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ddl${mappedFieldName}_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBoxA = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    dropdownListA = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.dropdownListBoxA(fieldName))
            .describedAs('dropdown list: ' + fieldName)

    dropdownItemA = (fieldName, itemName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('.combobox-span', itemName)).last()
            .of(this.dropdownListBoxA(fieldName))
            .describedAs('dropdown item: ' + itemName)

    selectDropdownItemA = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownFieldA(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownListA(fieldName).first(), isPresent()),
            Click.on(this.dropdownItemA(fieldName, itemName)),
        )
    }

    textInputFieldA = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName)

    fillTextInputFieldA = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.textInputFieldA(fieldName)),
            Clear.theValueOf(this.textInputFieldA(fieldName)),
            Enter.theValue(itemName).into(this.textInputFieldA(fieldName))
        )
    }
}

export const asset = new EditAsset(assetMap)