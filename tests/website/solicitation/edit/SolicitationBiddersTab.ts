import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions';
import { Duration, List, Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { CANCEL } from '../../../DefaultStaticParams';
import { checkMessagePopupBox, clickActionButton, clickGridButton, clickSelectAllCheckBox, waitMessagePopupBoxVisible } from '../../common';
import { bidderFields } from '../components/BidderField';
import { solicitation } from '../components/EditSolicitationFields';
import { solicitationTab } from '../components/SolicitationTab';

export const addBidder = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)
    }

}

export const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('Bidders'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(bidderFields.unEditableTableBox('Bidders'), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickGridButton.using('Bidders', 'GridView_lnkNew'),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(bidderFields.editLineItemAddPage(), isVisible()),
                // 给Field填值
                solicitation.fillAutoIdInputField('Bidder ID', item.BidderID),
                solicitation.fillTextInputField('Bidder Name', item.BidderName),
            )),

            // 提交保存
            clickActionButton.using('Save'),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2)),
            clickActionButton.using(CANCEL)
        )
    }

}

/**
 * 检查多行line item
 */
export const checkBidderLineItems = {
    using: (biddersInfo: DataTable) => {
        return Task.where(`#actor check bidders information`,
            bidderFields.checkBidderTableCellValue(1, 1, biddersInfo.rowsHash().BidderID),
            bidderFields.checkBidderTableCellValue(1, 2, biddersInfo.rowsHash().BidderName),
        )
    }
}


export const deleteBidders = {
    using: () =>
        Task.where(`#actor delete question line items`,
            solicitationTab.clickSolicitationTab('Bidders'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(bidderFields.unEditableTableBox('Bidders'), isVisible()),
            Wait.for(Duration.ofSeconds(5)),
            clickSelectAllCheckBox.using('Bidders', 'GridView_HearderCheckBox'),
            clickGridButton.using('Bidders', 'ccBatchDelete'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
};

