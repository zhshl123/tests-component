import { Ensure, equals, not } from '@serenity-js/assertions';
import { Question, Task } from '@serenity-js/core';
import { Attribute, By, Click, isVisible, PageElement } from '@serenity-js/web'

import { SUCCEEDED } from '../../DefaultStaticParams';
import { EditFromFields } from '../common/abstract';
import { scopingMap } from './ScopingAttributes';

export class ScopingGeneralTabFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ctl06_' + this.entityMap.get(fieldName)))
            .describedAs('text input field: ' + fieldName)

    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_ctl06_${mappedFieldName}_ddlPicklist_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_ctl06_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
            .describedAs('dropdown list box: ' + fieldName)

    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isVisible()),
            Click.on(this.dropdownItem(fieldName, itemName)),
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

    scopingAreaTabBar = () =>
        PageElement.located(By.id('ctl00_body_trAreaButton'))
            .describedAs('scoping area tab bar')


    scopingAreaTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('a', tabName))
            .of(this.scopingAreaTabBar())
            .describedAs('scoping area tab:' + tabName)
}

export const scopingGeneral = new ScopingGeneralTabFields(scopingMap)