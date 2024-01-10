import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals, includes } from '@serenity-js/assertions';
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie, Page } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { checkMessagePopupBox, clickButton, clickMessagePopupButton, formatted_now } from '../common';
import { BROWSE_USER, COOKIE_USER_LOGIN_NAME } from '../common/statics';
import { browseUserInfo } from './BrowseUser';
import { user } from './EditUser';

export const addUser = {
    using: (userInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp),
            user.setCookie(COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp),
            user.fillTextInputField('Password', userInfo.rowsHash().Password),
            user.fillConfirmPasswordInputField('Confirm Password', userInfo.rowsHash().ConfirmPassword),
            user.fillTextInputField('First Name', userInfo.rowsHash().FirstName),
            user.fillTextInputField('Last Name', userInfo.rowsHash().LastName),
            user.fillTextInputField('Email', userInfo.rowsHash().Email),
            user.selectDropdownItem('Department', userInfo.rowsHash().Department),
            user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus),
            Click.on(user.userRoleRadioButtonLebel(userInfo.rowsHash().Role)),
            user.clickAddSaveButton(SAVE),
            user.waitMessagePopupBoxVisible()
        )
    }
}

export const editUser = {
    using: (userInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor updates fields and save `,
            Wait.for(Duration.ofSeconds(2)),
            user.fillTextInputField('User Login Name', userInfo.rowsHash().UserLoginName + timestamp),
            user.setCookie(COOKIE_USER_LOGIN_NAME, userInfo.rowsHash().UserLoginName + timestamp),
            user.fillTextInputField('First Name', userInfo.rowsHash().FirstName),
            user.fillTextInputField('Last Name', userInfo.rowsHash().LastName),
            user.fillTextInputField('Email', userInfo.rowsHash().Email),
            user.selectDropdownItem('Department', userInfo.rowsHash().Department),
            user.clickSingleCheckBox('User Status', userInfo.rowsHash().UserStatus),
            Click.on(user.userRoleRadioButtonLebel(userInfo.rowsHash().Role)),
            user.clickEditSaveButton(SAVE),
            // 修改角色信息后的提示框
            checkMessagePopupBox(),
            clickMessagePopupButton.using(OK),
            user.waitMessagePopupBoxVisible()

        )
    }
}

export const checkUserInfo = {
    using: (userInfo: DataTable) => {
        return Task.where(`#actor updates fields and save `,
            Check.whether(
                Page.current().title(), includes('User Management')
            ).andIfSo(
                Log.the('current page is Edit user page')
            ).otherwise(
                browseUserInfo.searchItemAndEdit(BROWSE_USER, 'User Login Name',Cookie.called(COOKIE_USER_LOGIN_NAME).value()),
            ),
            Wait.for(Duration.ofSeconds(2)),
            user.checkTextInputFieldValue('User Login Name', Cookie.called(COOKIE_USER_LOGIN_NAME).value(), SUCCEEDED),
            user.checkTextInputFieldValue('First Name', userInfo.rowsHash().FirstName, SUCCEEDED),
            user.checkTextInputFieldValue('Last Name', userInfo.rowsHash().LastName, SUCCEEDED),
            user.checkTextInputFieldValue('Email', userInfo.rowsHash().Email, SUCCEEDED),
            Ensure.eventually(Attribute.called('title').of(user.dropdownField('Department')), equals(userInfo.rowsHash().Department)),
            user.checkSelectedSingleCheckbox('User Status', userInfo.rowsHash().UserStatus),
            Ensure.eventually(Attribute.called('checked').of(user.userRoleRadioButtonInput(userInfo.rowsHash().Role)), equals('checked')),

        )
    }
}

export const deleteUser = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(3)),
        )
    }
}