import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals, includes } from '@serenity-js/assertions';
import { Duration,List,Task,Wait} from '@serenity-js/core';
import { Attribute, isVisible,Page } from '@serenity-js/web';

import { EDIT, SUCCEEDED } from '../../../DefaultStaticParams';
import { checkMessagePopupBox, clickActionButton, clickButtonInList, clickGridButton, clickSelectAllCheckBox} from '../../common';
import { COOKIE_EVALUATOR_ID, EDIT_EVALUATOR } from '../../common/statics';
import { solicitation } from '../components/EditSolicitationFields';
import { evaluatorsFields } from '../components/EvaluatorsField';
import { responsesFields } from '../components/ResponsesField';
import { solicitationTab } from '../components/SolicitationTab';

export const addEvaluatorforBidder = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)
    }

}

export const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('Evaluators'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(evaluatorsFields.unEditableTableBox('Evaluators'), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickGridButton.using('Evaluators','GridView_lnkNew'),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(evaluatorsFields.editLineItemAddPage(), isVisible()),
                // 给Field填值
                solicitation.fillTextInputField('Evaluator Name', item.EvaluatorName),
                solicitation.setCookie(COOKIE_EVALUATOR_ID, item.EvaluatorID),
            )),
            // 提交保存
            clickActionButton.using('Save'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}



export const checkEvaluatorInfo = {
    using: (lineItemsInfo: DataTable,expectedResult: string) => {
        return Task.where(`#actor check Evaluator line item information`,
            clickButtonInList.using(EDIT),
            Wait.until(Page.current().title(), includes(EDIT_EVALUATOR)),
            Ensure.eventually(Attribute.called('initialvalue').of(solicitation.autoIdInputField('Evaluator ID')), equals(lineItemsInfo.rowsHash().EvaluatorID)),
            solicitation.checkTextInputFieldValue('Evaluator Name', lineItemsInfo.rowsHash().EvaluatorName, SUCCEEDED),
            clickActionButton.using('Cancel'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }};

export const deleteEvaluator = {
    using: () =>
        Task.where(`#actor delete responses line items`,
            solicitationTab.clickSolicitationTab('Evaluators'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(responsesFields.unEditableTableBox('Evaluators'), isVisible()),
            Wait.for(Duration.ofSeconds(5)),
            clickSelectAllCheckBox.using('Evaluators','GridView_HearderCheckBox'),
            clickGridButton.using('Evaluators','ccBatchDelete'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
};
