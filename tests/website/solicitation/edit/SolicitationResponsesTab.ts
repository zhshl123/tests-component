import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions';
import { Duration,List,Task,Wait} from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';
import { checkMessagePopupBox, clickActionButton, clickGridButton, clickGridCellButton, clickPopupButton} from '../../common';
import { solicitation } from '../components/EditSolicitationFields';
import { responsesFields } from '../components/ResponsesField';
import { solicitationTab } from '../components/SolicitationTab';

export const addResponseforBidder = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)
    }

}

export const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('Responses'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(responsesFields.unEditableTableBox('Responses'), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickGridButton.using('Responses','ccAddByBidder'),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(responsesFields.editLineItemAddPage(), isVisible()),
                // 给Field填值
                solicitation.selectItemInlookupPopup('Prime Contractor', item.SolicitationVendorAutoID,'Bidder Name'),
            )),
            // 提交保存
            clickActionButton.using('Add'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const checkResponseInfo = {
    using: (lineItemsInfo: DataTable,expectedResult: string) => {
        return Task.where(`#actor check response line item information`,
            solicitation.checkReadOnlyLabelValue('Prime Contractor', lineItemsInfo.rowsHash().SolicitationVendorAutoID, expectedResult),
            clickActionButton.using('CancelResponse'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const deleteResponse = {
    using: () =>
        Task.where(`#actor delete responses line items`,
            solicitationTab.clickSolicitationTab('Responses'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(responsesFields.unEditableTableBox('Responses'), isVisible()),
            Wait.for(Duration.ofSeconds(5)),
            clickGridCellButton.using('Delete'),
            clickPopupButton.using('OK'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
};
