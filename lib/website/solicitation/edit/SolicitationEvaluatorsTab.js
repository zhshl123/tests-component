"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvaluator = exports.checkEvaluatorInfo = exports.addLineAndfillFields = exports.addEvaluatorforBidder = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const EditSolicitationFields_1 = require("../components/EditSolicitationFields");
const EvaluatorsField_1 = require("../components/EvaluatorsField");
const ResponsesField_1 = require("../components/ResponsesField");
const SolicitationTab_1 = require("../components/SolicitationTab");
exports.addEvaluatorforBidder = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return exports.addLineAndfillFields.using(items);
    }
};
exports.addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Evaluators'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(EvaluatorsField_1.evaluatorsFields.unEditableTableBox('Evaluators'), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(common_1.clickGridButton.using('Evaluators', 'GridView_lnkNew'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(EvaluatorsField_1.evaluatorsFields.editLineItemAddPage(), (0, web_1.isVisible)()), 
        // 给Field填值
        EditSolicitationFields_1.solicitation.fillTextInputField('Evaluator Name', item.EvaluatorName), EditSolicitationFields_1.solicitation.setCookie(statics_1.COOKIE_EVALUATOR_ID, item.EvaluatorID))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkEvaluatorInfo = {
    using: (lineItemsInfo, expectedResult) => {
        return core_1.Task.where(`#actor check Evaluator line item information`, common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.until(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.EDIT_EVALUATOR)), assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(EditSolicitationFields_1.solicitation.autoIdInputField('Evaluator ID')), (0, assertions_1.equals)(lineItemsInfo.rowsHash().EvaluatorID)), EditSolicitationFields_1.solicitation.checkTextInputFieldValue('Evaluator Name', lineItemsInfo.rowsHash().EvaluatorName, DefaultStaticParams_1.SUCCEEDED), common_1.clickActionButton.using('Cancel'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.deleteEvaluator = {
    using: () => core_1.Task.where(`#actor delete responses line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Evaluators'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(ResponsesField_1.responsesFields.unEditableTableBox('Evaluators'), (0, web_1.isVisible)()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickSelectAllCheckBox.using('Evaluators', 'GridView_HearderCheckBox'), common_1.clickGridButton.using('Evaluators', 'ccBatchDelete'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=SolicitationEvaluatorsTab.js.map