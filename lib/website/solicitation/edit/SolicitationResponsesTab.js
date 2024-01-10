"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResponse = exports.checkResponseInfo = exports.addLineAndfillFields = exports.addResponseforBidder = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const common_1 = require("../../common");
const EditSolicitationFields_1 = require("../components/EditSolicitationFields");
const ResponsesField_1 = require("../components/ResponsesField");
const SolicitationTab_1 = require("../components/SolicitationTab");
exports.addResponseforBidder = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return exports.addLineAndfillFields.using(items);
    }
};
exports.addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Responses'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ResponsesField_1.responsesFields.unEditableTableBox('Responses'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickGridButton.using('Responses', 'ccAddByBidder'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(ResponsesField_1.responsesFields.editLineItemAddPage(), (0, web_1.isVisible)()), 
        // 给Field填值
        EditSolicitationFields_1.solicitation.selectItemInlookupPopup('Prime Contractor', item.SolicitationVendorAutoID, 'Bidder Name'))), 
        // 提交保存
        common_1.clickActionButton.using('Add'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkResponseInfo = {
    using: (lineItemsInfo, expectedResult) => {
        return core_1.Task.where(`#actor check response line item information`, EditSolicitationFields_1.solicitation.checkReadOnlyLabelValue('Prime Contractor', lineItemsInfo.rowsHash().SolicitationVendorAutoID, expectedResult), common_1.clickActionButton.using('CancelResponse'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.deleteResponse = {
    using: () => core_1.Task.where(`#actor delete responses line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Responses'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ResponsesField_1.responsesFields.unEditableTableBox('Responses'), (0, web_1.isVisible)()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickGridCellButton.using('Delete'), common_1.clickPopupButton.using('OK'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=SolicitationResponsesTab.js.map