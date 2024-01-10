
import { Task } from '@serenity-js/core';
import { By, Enter,PageElement } from '@serenity-js/web';

import { clickButton, openPage } from '../common';
import { searchUser } from './SearcchUser';

export const addSuperadmin = {
    using: (userInfo: CIPUserInfo) => {
        openPage.using('Create User');
        submitUserForm.using(userInfo);
        searchUser.using('User Name', userInfo.username)
    }

}

export const submitUserForm = {
    using: (userInfo: CIPUserInfo) =>
        Task.where(`#actor add user in with ${userInfo.username} and ${userInfo.password}`,
            Enter.theValue(userInfo.username).into(UserForm.usernameField()),
            Enter.theValue(userInfo.password).into(UserForm.passwordField()),
            clickButton.using('Save')
        ),

}

export class CIPUserInfo {
    username: string
    password: string
}

export class UserForm {
    static usernameField = () =>
        PageElement.located(By.css('')).describedAs('username field')

    static passwordField = () =>
        PageElement.located(By.css('')).describedAs('password')

}

export class BrowseUserAdvencedSearchPanel {
    static usernameField = () => PageElement.located(By.css('')).describedAs('username searh field ')
}