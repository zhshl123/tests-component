import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE} from '../../DefaultStaticParams';
import { filteringPhase } from '../../outofbox/Filtering/EditFitleringFields';
import {clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_FILTERING_NAME } from '../common/statics';

export const addFiltering = {
    using: (filteringInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            filteringPhase.fillTextInputField('Filtering Phase Name',filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.setCookie(COOKIE_FILTERING_NAME,filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.selectDropdownItem('Source Filtering Phase',filteringInfo.rowsHash().SourceFilteringPhase),
            filteringPhase.clickSingleCheckBox('Is Working Filtering Phase',filteringInfo.rowsHash().IsWorkingFilteringPhase),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const editFiltering = {
    using: (filteringInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            filteringPhase.fillTextInputField('Filtering Phase Name',filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.setCookie(COOKIE_FILTERING_NAME,filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const checkFiltering = {
    using: (Result:string) => {
        return Task.where(`#actor checks value `,
            filteringPhase.checkTextInputFieldValue('Filtering Phase Name',Cookie.called(COOKIE_FILTERING_NAME).value(),Result)
        )
    }
} 

export const deleteFiltering = {
    using:() => {
        return Task.where(`#actor delete filtering `,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

