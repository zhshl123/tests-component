import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'
import { Text } from '@serenity-js/web'

import { DELETE, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_ISSUE_ID, COOKIE_ISSUE_TITLE } from '../common/statics'
import { issue } from './components'

export const updateIssueFields = {
    using: (issueInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor edit issue information`,
            issue.selectItemInlookupPopup('Project', issueInfo.rowsHash().cstm_AssociatedProjectId, 'Project Name'),
            Wait.for(Duration.ofSeconds(5)),
            issue.selectItemInlookupPopup('Contract', issueInfo.rowsHash().cstm_AssociatedContractId, 'Contract Name'),
            Wait.for(Duration.ofSeconds(5)),
            issue.fillTextInputField('Issue ID', issueInfo.rowsHash().IssueID + timestamp),
            issue.setCookie(COOKIE_ISSUE_ID, issueInfo.rowsHash().IssueID + timestamp),
            issue.fillTextInputField('Issue Title', issueInfo.rowsHash().IssueTitle + timestamp),
            issue.setCookie(COOKIE_ISSUE_TITLE, issueInfo.rowsHash().IssueID + timestamp),
            issue.selectSpecialDate('Date Reported', issueInfo.rowsHash().DateReported, 0),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkIssueInfo = {
    using: (issueInfo: DataTable) => {
        return Task.where(`#actor checks issue information`,
            Ensure.eventually(Text.of(issue.lookupInputFieldSingleValue('Project')), includes(issueInfo.rowsHash().cstm_AssociatedProjectId)),
            Ensure.eventually(Text.of(issue.lookupInputFieldSingleValue('Contract')), includes(issueInfo.rowsHash().cstm_AssociatedContractId)),
            issue.checkTextInputFieldValue('Issue ID', Cookie.called(COOKIE_ISSUE_ID).value(), SUCCEEDED),
            issue.checkTextInputFieldValue('Issue Title', Cookie.called(COOKIE_ISSUE_TITLE).value(), SUCCEEDED),
            issue.checkDateInputFieldValue('Date Reported', issueInfo.rowsHash().DateReported, SUCCEEDED),
        )
    }
}

export const checkIssueStatus = {
    using: (issueInfo: DataTable) => {
        return Task.where(`#actor checks issue information`,
            issue.checkDropdownInputFieldValue('Status', issueInfo.rowsHash().IssueStatusID, SUCCEEDED),

        )
    }
}

export const deleteIssue = () => {
    return Task.where(`#actor deletes issue information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5))
    )
}
