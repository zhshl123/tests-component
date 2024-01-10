import { Task } from '@serenity-js/core';
import { Enter } from '@serenity-js/web';

import { openPage } from '../common';
import { BrowseUserAdvencedSearchPanel } from './AddSuperAdmin';

export const searchUser = {
    using: (fieldName: string, searchWord: string) =>
        Task.where(`#actor put search word into ${fieldName} with ${searchWord}`,
            openPage.using('Browse Users'),
            putSearchWord.using(fieldName, searchWord),
            checkUserInUserList.using(fieldName, searchWord)
        )

}

export const putSearchWord = {
    using: (fieldName: string, searchWord: string) =>
        Task.where(`#actor put search word into ${fieldName} with ${searchWord}`,
            Enter.theValue(searchWord).into(BrowseUserAdvencedSearchPanel.usernameField())),

}

export const checkUserInUserList = {
    using: (fieldName: string, searchWord: string) =>
        Task.where(`#actor check wheather ${searchWord} in the user list`,
        
            // Ensure.eventually( ,constants(searchWord) )
        ),

}