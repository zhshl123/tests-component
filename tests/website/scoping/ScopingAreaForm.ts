import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Check, Log, Question, Task } from '@serenity-js/core';
import { Attribute, By, Clear, Click, Enter, isVisible, PageElement, PageElements } from '@serenity-js/web'

import { SUCCEEDED } from '../../DefaultStaticParams';
import { EditFromFields } from '../common/abstract';
import { scopingMap } from './ScopingAttributes';

export class EditScopingArea extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ucScopingArea_' + this.entityMap.get(fieldName)))
            .describedAs('text input field: ' + fieldName)

    fillTextInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.textInputField(fieldName)),
            Clear.theValueOf(this.textInputField(fieldName)),
            Enter.theValue(itemName).into(this.textInputField(fieldName))
        )
    }

    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ucScopingArea_ddl${mappedFieldName}_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ucScopingArea_ddl' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    dropdownList = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName)

    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isVisible()),
            Click.on(this.dropdownItem(fieldName, itemName)),
        )
    }

    Checkbox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ucScopingArea_' + this.entityMap.get(fieldName)))
            .describedAs('radio button group:' + fieldName)

    clickSingleCheckBox = (fieldName: string, itemName: string) => {
        return Task.where(`#actor click ${fieldName} single check box: ${itemName}`,
            Click.on(this.Checkbox(fieldName))
        )
    }

    checkTextInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.textInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.textInputField(fieldName)), not(equals(itemName)))
        );
    }

    checkDropdownInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dropdownField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dropdownField(fieldName)), not(equals(itemName)))
        );
    }

    Panel = () =>
        PageElement.located(By.id('ctl00_body_tdEditScopingArea'))
            .describedAs('panel : Edit Scoping Area')

    NewScopingAreaDeleteIcon = () =>
        PageElements.located(By.css(`[title="Delete"]`)).last()
            .describedAs('Delete icon of New Scoping Area')

    clickNewDelteIcon = () => {
        return Task.where(`#actor click New Delete Icon`,
            Click.on(this.NewScopingAreaDeleteIcon())
        )
    }

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of New Scoping Area')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }
}

export const ScopingAreaForm = new EditScopingArea(scopingMap)