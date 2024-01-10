"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBidders = exports.checkBidderLineItems = exports.addLineAndfillFields = exports.addBidder = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const BidderField_1 = require("../components/BidderField");
const EditSolicitationFields_1 = require("../components/EditSolicitationFields");
const SolicitationTab_1 = require("../components/SolicitationTab");
exports.addBidder = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return exports.addLineAndfillFields.using(items);
    }
};
exports.addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Bidders'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(BidderField_1.bidderFields.unEditableTableBox('Bidders'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickGridButton.using('Bidders', 'GridView_lnkNew'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(BidderField_1.bidderFields.editLineItemAddPage(), (0, web_1.isVisible)()), 
        // 给Field填值
        EditSolicitationFields_1.solicitation.fillAutoIdInputField('Bidder ID', item.BidderID), EditSolicitationFields_1.solicitation.fillTextInputField('Bidder Name', item.BidderName))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)), common_1.clickActionButton.using(DefaultStaticParams_1.CANCEL));
    }
};
/**
 * 检查多行line item
 */
exports.checkBidderLineItems = {
    using: (biddersInfo) => {
        return core_1.Task.where(`#actor check bidders information`, BidderField_1.bidderFields.checkBidderTableCellValue(1, 1, biddersInfo.rowsHash().BidderID), BidderField_1.bidderFields.checkBidderTableCellValue(1, 2, biddersInfo.rowsHash().BidderName));
    }
};
exports.deleteBidders = {
    using: () => core_1.Task.where(`#actor delete question line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Bidders'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(BidderField_1.bidderFields.unEditableTableBox('Bidders'), (0, web_1.isVisible)()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickSelectAllCheckBox.using('Bidders', 'GridView_HearderCheckBox'), common_1.clickGridButton.using('Bidders', 'ccBatchDelete'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=SolicitationBiddersTab.js.map