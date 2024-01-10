import { Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Clear, Click, Enter, isVisible, PageElement, PageElements, Text } from '@serenity-js/web'

import { OK, SUCCEEDED } from '../../DefaultStaticParams';
import { clickMessagePopupButton, messagePopupBox, messagePopupContent } from '../common';
import { EditFromFields } from '../common/abstract';
import { userMap } from './UserAttributes';

export class EditUser extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    ConfirmPasswordInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtConfirmPassword'))
            .describedAs('text input input field: ' + fieldName)

    fillConfirmPasswordInputField = (fieldName: string, itemName: string | Question<any>) => {

        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.ConfirmPasswordInputField(fieldName)),
            Clear.theValueOf(this.ConfirmPasswordInputField(fieldName)),
            Enter.theValue(itemName).into(this.ConfirmPasswordInputField(fieldName))
        )
    }

    selectLookupDropdownItem = (fieldName: string, itemName: string) => {
        return Task.where(`#actor selects dropdown item '${itemName}' in lookup field '${fieldName}'`,
            // 有值的情况
            Check.whether(
                this.lookupInputFieldSingleValue(fieldName), isPresent()
            ).andIfSo(
                Click.on(this.lookupClearButton(fieldName)),
                Click.on(this.lookupInputField(fieldName)),
                // 确保下拉框有值之后再点击lookup图标
                Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
                // 点击下拉框的值
                Click.on(this.lookupDropdownItem(fieldName, itemName)),
                Wait.for(Duration.ofSeconds(5)),
            ).otherwise(
                Click.on(this.lookupInputField(fieldName)),
                // 确保下拉框有值之后再点击lookup图标
                Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
                // 点击下拉框的值
                Click.on(this.lookupDropdownItem(fieldName, itemName)),
                Wait.for(Duration.ofSeconds(5)),
            )
        );
    }

    lookupClearButton = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs('click clear button')

    lookupInputFieldSingleValue = (fieldName: string) =>
        PageElement.located(By.css(`[data-temp-type="mtpSelectTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field single value: ' + fieldName)

    lookupDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select_listbox'))
            .describedAs('lookup dropdown list box: ' + fieldName)

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    dropdownItemTitle = (fieldName, itemName: string | Question<any>) =>
        PageElements.located(By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,

            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
            Click.on(this.dropdownItemTitle(fieldName, itemName).last()),

        )
    }

    targetButton = (targetButtonName: string) =>
        PageElements.located(By.css(`[value="${targetButtonName}"]`))
            .describedAs(targetButtonName + 'button')

    clickAddSaveButton = (targetButtonName: string) => {
        return Task.where(`#actor clicks button '${targetButtonName}' '`,
            Click.on(this.targetButton(targetButtonName).first())
        )
    }

    clickEditSaveButton = (targetButtonName: string) => {
        return Task.where(`#actor clicks button '${targetButtonName}' '`,
            Click.on(this.targetButton(targetButtonName).last())
        )
    }

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }

    checkTextInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('Value').of(this.textInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.textInputField(fieldName)), not(equals(itemName)))
        );
    }

    cencelButton = () =>
        PageElement.located(By.id('ctl00_cipActionBar_btnCancel2'))
            .describedAs('cencel action button')

    /**
     * check message popup is visible
     * @returns 
     */
    waitMessagePopupBoxVisible = () =>
        Task.where(`#actor check message popup box`,
            Wait.until(messagePopupBox(), isVisible()),

            Check.whether(
                Text.of(messagePopupContent()), includes('already')
            ).andIfSo(
                clickMessagePopupButton.using(OK),
                Click.on(this.cencelButton())
            )

        )


    /**
     * radio的label标签
     * @param itemNumber 第几个选项 第一个为0
     * @returns 
     */
    userRoleRadioButtonLebel = (itemNth: string) => {
        return PageElement.located(By.css(`[for="ctl00_body_UserRole_rdoRoles_${itemNth}"]`))
            .describedAs(itemNth + ' user role radio button')
    }

    /**
     * radio的input标签
     * @param itemNumber 第几个选项 第一个为0
     * @returns 
     */
    userRoleRadioButtonInput = (itemNth: string) => {
        return PageElement.located(By.id(`ctl00_body_UserRole_rdoRoles_${itemNth}`))
            .describedAs(itemNth + ' user role radio input')
    }

}

export const user = new EditUser(userMap)