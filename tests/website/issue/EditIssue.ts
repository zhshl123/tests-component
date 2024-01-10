import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'

import { DELETE, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, waitMessagePopupBoxVisible } from '../common'
import { COOKIE_ISSUE_ID, COOKIE_ISSUE_TITLE,   } from '../common/statics'
import { issue } from './components'

export const checkIssueInfo = {
    using: (issueInfo: DataTable) => {
        return Task.where(`#actor checks issue information`,
            issue.checkTextInputFieldValue('Issue ID', Cookie.called(COOKIE_ISSUE_ID).value(), SUCCEEDED),
            issue.checkTextInputFieldValue('Issue Title', Cookie.called(COOKIE_ISSUE_TITLE).value(), SUCCEEDED),
            issue.checkDateInputFieldValue('Date Reported', issueInfo.rowsHash().DateReported, SUCCEEDED),
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
