import { DataTable } from '@cucumber/cucumber';
import { Duration,Task,Wait} from '@serenity-js/core';

import { DELETE,OK,SAVE} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,formatted_now} from '../common';
import { COOKIE_USER_LOGIN_NAME } from '../common/statics';
import { user } from './EditUser';

export const addUser = {
    using: (userInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            user.fillTextInputField('User Login Name',userInfo.rowsHash().UserLoginName + timestamp),
            user.setCookie(COOKIE_USER_LOGIN_NAME,userInfo.rowsHash().UserLoginName + timestamp),
            user.fillTextInputField('Password',userInfo.rowsHash().Password),
            user.fillConfirmPasswordInputField('Confirm Password',userInfo.rowsHash().ConfirmPassword),
            user.fillTextInputField('First Name',userInfo.rowsHash().FirstName),
            user.fillTextInputField('Last Name',userInfo.rowsHash().LastName),
            user.fillTextInputField('Email',userInfo.rowsHash().Email),
            user.selectLookupDropdownItem('Department',userInfo.rowsHash().Department),
            user.clickSingleCheckBox('User Status',userInfo.rowsHash().UserStatus),
            user.selectDropdownItem('Role',userInfo.rowsHash().Role),
            user.clickAddSaveButton(SAVE),
            user.waitMessagePopupBoxVisible(),
            
        )
    }
} 

export const editUser = {
    using: (userInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor updates fields and save `,
            Wait.for(Duration.ofSeconds(2)),
            user.fillTextInputField('User Login Name',userInfo.rowsHash().UserLoginName + timestamp),
            user.setCookie(COOKIE_USER_LOGIN_NAME,userInfo.rowsHash().UserLoginName + timestamp),
            user.fillTextInputField('First Name',userInfo.rowsHash().FirstName),
            user.fillTextInputField('Last Name',userInfo.rowsHash().LastName),
            user.fillTextInputField('Email',userInfo.rowsHash().Email),
            user.selectLookupDropdownItem('Department',userInfo.rowsHash().Department),
            user.clickSingleCheckBox('User Status',userInfo.rowsHash().UserStatus),
            user.selectDropdownItem('Role',userInfo.rowsHash().Role),
            user.clickEditSaveButton(SAVE),
            user.waitMessagePopupBoxVisible(),
            
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