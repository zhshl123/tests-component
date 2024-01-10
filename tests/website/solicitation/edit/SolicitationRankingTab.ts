import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions';
import { Duration,List,Task,Wait} from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { checkMessagePopupBox, clickActionButton, clickGridButton, clickPopupButton} from '../../common';
import { solicitation } from '../components/EditSolicitationFields';
import { rankingphaseFields } from '../components/RankingPhaseField';
import { solicitationTab } from '../components/SolicitationTab';

export const addRankingPhase = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)
    }

}

export const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('RankingPhases'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(rankingphaseFields.unEditableTableBox('RankingPhases'), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickGridButton.using('RankingPhases','GridView_lnkNew'),
                Wait.for(Duration.ofSeconds(2)),
                // Ensure.eventually(rankingphaseFields.editLineItemAddPage(), isVisible()),
                // 给Field填值
                solicitation.selectDropdownItem('Ranking Type', item.RankingTypeID),
                solicitation.fillTextInputField('Ranking Phase Name', item.RankingPhaseName),
            )),

            // 提交保存
            clickActionButton.using('Save'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
            solicitationTab.clickRankingPhaseTab('General')
        )
    }

}

/**
 * 检查多行line item
 */
export const checkRankingPhase = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return checkRankingPhasesTask.using(items, expectedResult)
    }
}

export const checkRankingPhasesTask = {
    using: (items: List<any>, expectedResult:string) => {

        return Task.where(`#actor check ranking phase information`),
        items.forEach(({ actor, item }) => actor.attemptsTo(
            solicitation.checkDropdownInputFieldValue('Ranking Type', item.RankingTypeID, expectedResult),
            solicitation.checkTextInputFieldValue('Ranking Phase Name', item.RankingPhaseName, expectedResult),
        ))
    }
}

export const deleteRankingPhase = {
    using: () =>
        Task.where(`#actor delete ranking phase`,
            clickActionButton.using('Delete'),
            Wait.for(Duration.ofSeconds(5)),
            clickPopupButton.using('OK'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
};

