import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Check, Log, Question, Task } from '@serenity-js/core';
import { Attribute, By, PageElement, PageElements } from '@serenity-js/web'

import { SUCCEEDED } from '../../DefaultStaticParams';
import { EditFromFields } from '../common/abstract';
import { rankingMap } from './RankingAttributes';

export class EditRanking extends EditFromFields {
    entityMap: Map<string, string>
    rankingPhaseName: string
    rankingStandard: string
    rankingTemplate: string
    constructor(entityMap) {
        super(entityMap);
    }

    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName)

    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_${mappedFieldName}_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    dropdownList = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName)

    dateInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName)))
            .describedAs('date input field: ' + fieldName)

    dateCalendarIcon = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-controls="ctl00_body_${mappedFieldName}_dateview"]`))
            .describedAs('date calendar icon: ' + fieldName)
    }

    checkTextInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('value').of(this.textInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('value').of(this.textInputField(fieldName)), not(equals(itemName)))
        );
    }

    checkDropdownInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.dropdownField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.dropdownField(fieldName)), not(equals(itemName)))
        );
    }

    checkDateInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('value').of(this.dateInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('value').of(this.dateInputField(fieldName)), not(equals(itemName)))
        );
    }
}

export const ranking = new EditRanking(rankingMap)