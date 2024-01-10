import { DataTable } from '@cucumber/cucumber';
import { Check,Duration, Log,Task,Wait} from '@serenity-js/core';
import { Cookie, isVisible } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton,clickMessagePopupButton ,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_RANKING_NAME } from '../common/statics';
import { ranking} from './EditRanking';

export const addRanking = {
    using: (rankingPhaseName:string, rankingStandard:string, rankingTemplate:string, startDate:string, endDate:string) => {
        const timestamp = formatted_now
        ranking.rankingPhaseName = rankingPhaseName
        ranking.rankingStandard = rankingStandard
        ranking.rankingTemplate = rankingTemplate
        return Task.where(`#actor Input all fields and save `,
            ranking.fillTextInputField('Ranking Phase Name',rankingPhaseName + timestamp),
            ranking.setCookie(COOKIE_RANKING_NAME,rankingPhaseName + timestamp),
            ranking.selectDropdownItem('Ranking Standard',rankingStandard),
            Wait.for(Duration.ofSeconds(3)),
            Check.whether(
                ranking.dropdownField('Ranking Template'),isVisible()
            ).andIfSo(
                ranking.selectDropdownItem('Ranking Template',rankingTemplate),
            ).otherwise(
                Log.the('Ranking Template is not present')
            ),
            Wait.for(Duration.ofSeconds(3)),
            ranking.selectSpecialDate('Start Date',startDate,0),
            ranking.selectSpecialDate('End Date',endDate,1),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const editRanking = {
    using: (rankingInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            ranking.selectSpecialDate('Start Date',rankingInfo.rowsHash().StartDate,0),
            ranking.selectSpecialDate('End Date',rankingInfo.rowsHash().EndDate,1),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const checkRanking = {
    using: (rankingInfo:DataTable) => {
        return Task.where(`#actor check all fields`,
            ranking.checkTextInputFieldValue('Ranking Phase Name',Cookie.called(COOKIE_RANKING_NAME).value(),SUCCEEDED),
            ranking.checkDropdownInputFieldValue('Ranking Standard',ranking.rankingStandard,SUCCEEDED),
            Check.whether(
                ranking.dropdownField('Ranking Template'),isVisible()
            ).andIfSo(
                ranking.checkDropdownInputFieldValue('Ranking Template',ranking.rankingTemplate,SUCCEEDED),
            ).otherwise(
                Log.the('Ranking Template is not present')
            ),
            ranking.checkDateInputFieldValue('Start Date',rankingInfo.rowsHash().StartDate,SUCCEEDED),
            ranking.checkDateInputFieldValue('End Date',rankingInfo.rowsHash().EndDate,SUCCEEDED),
        )
    }
}

export const deleteRanking = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}