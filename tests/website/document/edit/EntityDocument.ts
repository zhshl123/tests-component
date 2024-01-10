import { Duration, Task, Wait } from '@serenity-js/core'
import { Click } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams'
import { clickActionButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../../common'
import { browseDocument } from '../components'
import { entityDocument } from '../components/EntityDocumentFields'

export const checkEntityDocument = {
    using: (fileName: string) => {
        return Task.where(`#actor check document information`,
            browseDocument.fillTextInputField('Document Name', fileName),
            clickActionButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            browseDocument.checkSearchResult(fileName, SUCCEEDED)
        )
    }
}

export const deleteEntityDodument = () =>
    Task.where(`#actor delete document information`,
        Click.on(entityDocument.selectAllCheckBox()),
        Click.on(entityDocument.gridButton('Batch Delete')), 
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))
    )
    
