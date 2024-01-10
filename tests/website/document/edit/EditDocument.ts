import { DataTable } from '@cucumber/cucumber'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Cookie } from '@serenity-js/web'

import { DELETE, OK, SAVE } from '../../../DefaultStaticParams'
import { clickButton, clickMessagePopupButton, formatted_now } from '../../common'
import { COOKIE_DOCUMENT_NAME } from '../../common/statics'
import { editDocument } from '../components/EditDocumentFields'

export const updateDocumentInfo = {
    using: (documentInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor update document information`,
            editDocument.fillTextInputField('Document Name', documentInfo.rowsHash().DocumentName + timestamp),
            editDocument.setCookie(COOKIE_DOCUMENT_NAME, documentInfo.rowsHash().DocumentName + timestamp),
            editDocument.fillTextInputField('Version', documentInfo.rowsHash().Version),
            editDocument.selectDropdownItem('Status', documentInfo.rowsHash().Status),
            editDocument.fillTextInputField('Key Words', documentInfo.rowsHash().KeyWords),
            editDocument.fillTextInputField('Description', documentInfo.rowsHash().Description),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkDocumentInfo = {
    using: (documentInfo: DataTable, expectedResult: string) => {
        return Task.where(`#actor check document information ${expectedResult}`,
            editDocument.checkTextInputFieldValue('Document Name', Cookie.called(COOKIE_DOCUMENT_NAME).value(), expectedResult),
            editDocument.checkTextInputFieldValue('Version', documentInfo.rowsHash().Version, expectedResult),
            editDocument.checkDropdownInputFieldValue('Status', documentInfo.rowsHash().Status, expectedResult),
            editDocument.checkTextInputFieldValue('Key Words', documentInfo.rowsHash().KeyWords, expectedResult),
            editDocument.checkTextInputFieldValue('Description', documentInfo.rowsHash().Description, expectedResult),

        )
    }
}

export const deleteDodument = () => {
    return Task.where(`#actor delete document`,
        clickButton.using(DELETE),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))

    )
}
