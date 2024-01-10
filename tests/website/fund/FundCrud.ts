import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';

import { SAVE} from '../../DefaultStaticParams';
import { clickButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_FG_ID, COOKIE_FUND_ID } from '../common/statics';
import { fund } from './EditFund';

export const addFundGroup = {
    
    using: (fundGroupInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            fund.fillTextInputField('Fund Group ID',fundGroupInfo.rowsHash().FundGroupID + timestamp),
            fund.setCookie(COOKIE_FG_ID,fundGroupInfo.rowsHash().FundGroupID + timestamp),
            fund.fillTextInputField('Fund Group Name',fundGroupInfo.rowsHash().FundGroupName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const addFund = {
    using: (FundInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            fund.fillTextInputField('Fund ID',FundInfo.rowsHash().FundID + timestamp),
            fund.setCookie(COOKIE_FUND_ID,FundInfo.rowsHash().FundID + timestamp),
            fund.fillTextInputField('Fund Name',FundInfo.rowsHash().FundName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

