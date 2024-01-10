"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRankingPhase = exports.checkRankingPhasesTask = exports.checkRankingPhase = exports.addLineAndfillFields = exports.addRankingPhase = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const common_1 = require("../../common");
const EditSolicitationFields_1 = require("../components/EditSolicitationFields");
const RankingPhaseField_1 = require("../components/RankingPhaseField");
const SolicitationTab_1 = require("../components/SolicitationTab");
exports.addRankingPhase = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return exports.addLineAndfillFields.using(items);
    }
};
exports.addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('RankingPhases'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(RankingPhaseField_1.rankingphaseFields.unEditableTableBox('RankingPhases'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickGridButton.using('RankingPhases', 'GridView_lnkNew'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), 
        // Ensure.eventually(rankingphaseFields.editLineItemAddPage(), isVisible()),
        // 给Field填值
        EditSolicitationFields_1.solicitation.selectDropdownItem('Ranking Type', item.RankingTypeID), EditSolicitationFields_1.solicitation.fillTextInputField('Ranking Phase Name', item.RankingPhaseName))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)), SolicitationTab_1.solicitationTab.clickRankingPhaseTab('General'));
    }
};
/**
 * 检查多行line item
 */
exports.checkRankingPhase = {
    using: (lineItemsInfo, expectedResult) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return exports.checkRankingPhasesTask.using(items, expectedResult);
    }
};
exports.checkRankingPhasesTask = {
    using: (items, expectedResult) => {
        return core_1.Task.where(`#actor check ranking phase information`),
            items.forEach(({ actor, item }) => actor.attemptsTo(EditSolicitationFields_1.solicitation.checkDropdownInputFieldValue('Ranking Type', item.RankingTypeID, expectedResult), EditSolicitationFields_1.solicitation.checkTextInputFieldValue('Ranking Phase Name', item.RankingPhaseName, expectedResult)));
    }
};
exports.deleteRankingPhase = {
    using: () => core_1.Task.where(`#actor delete ranking phase`, common_1.clickActionButton.using('Delete'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickPopupButton.using('OK'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=SolicitationRankingTab.js.map