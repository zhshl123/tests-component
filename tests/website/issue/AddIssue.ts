import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'

import { SAVE } from '../../DefaultStaticParams'
import { clickButton, formatted_now, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_ISSUE_ID, COOKIE_ISSUE_TITLE } from '../common/statics'
import { issue } from './components'

export const addIssue = {
    using: (issueInfo: DataTable) => {
        return Task.where(`#actor add issue information`,
            fillIssueRequiredFields.using(issueInfo),
    
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const fillIssueRequiredFields = {
    using: (issueInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill issue required fields`,
            issue.selectDropdownItem('Category', issueInfo.rowsHash().Category),
            issue.fillTextInputField('Issue ID', issueInfo.rowsHash().IssueID + timestamp),
            issue.setCookie(COOKIE_ISSUE_ID, issueInfo.rowsHash().IssueID + timestamp),
            issue.fillTextInputField('Issue Title', issueInfo.rowsHash().IssueTitle+ timestamp),
            issue.setCookie(COOKIE_ISSUE_TITLE, issueInfo.rowsHash().IssueID + timestamp),
            issue.fillDateInputField('Date Reported', issueInfo.rowsHash().DateReported),
        )
    }
}
