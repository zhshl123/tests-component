"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestionLineItems = exports.checkMultiQuestionLineItems = exports.addMultiQuestionLineitems = exports.addQuestionLineItem = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const QuestionsLineItemField_1 = require("../components/QuestionsLineItemField");
const SolicitationTab_1 = require("../components/SolicitationTab");
/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
exports.addQuestionLineItem = {
    using: (lineItemsInfo) => {
        const array = [lineItemsInfo.rowsHash()];
        const items = core_1.List.of(array);
        return addLineAndfillFields.using(items);
    }
};
exports.addMultiQuestionLineitems = {
    using: (lineItemsInfo) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return addLineAndfillFields.using(items);
    }
};
const addLineAndfillFields = {
    using: (items) => {
        return core_1.Task.where(`#actor add multi line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Questions'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(QuestionsLineItemField_1.questionLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(clickSectionButton.using('imgAdd'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(QuestionsLineItemField_1.questionLineItem.editableTableBox(), (0, web_1.isVisible)()), core_1.Check.whether(QuestionsLineItemField_1.questionLineItem.lineItemsTr().count(), (0, assertions_1.isGreaterThan)(items.count()))
            .andIfSo(
        // 点击删除按钮
        QuestionsLineItemField_1.questionLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DefaultStaticParams_1.DELETE)), 
        // 给单元格填值
        fillFields.using(item))), 
        // 提交保存
        common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const clickSectionButton = {
    using: (buttonName) => core_1.Task.where(`#actor click the section button ${buttonName}`, web_1.Click.on(web_1.PageElement.located(web_1.By.css(`[data-name="${buttonName}"]`))
        .describedAs(buttonName + 'button')))
};
const fillFields = {
    using: (item) => core_1.Task.where(`#actor fill line fileds`, QuestionsLineItemField_1.questionLineItem.fillTextInputField(item.rowNumber, 'Item No.', item.ItemNo), QuestionsLineItemField_1.questionLineItem.fillEditLineItemDetailPopup(item.rowNumber, 'Question Description', item.ItemName))
};
/**
 * 检查多行line item
 */
exports.checkMultiQuestionLineItems = {
    using: (lineItemsInfo, expectedResult) => {
        const items = core_1.List.of(lineItemsInfo.hashes());
        return expectedResult == DefaultStaticParams_1.SUCCEEDED ? checkQuestionLineItemsTask.using(items, expectedResult) : checkEmptyLineItemsTask();
    }
};
const checkQuestionLineItemsTask = {
    using: (items, expectedResult) => {
        return core_1.Task.where(`#actor check line items value`, assertions_1.Ensure.eventually(QuestionsLineItemField_1.questionLineItem.editableTableBox(), (0, web_1.isVisible)()), 
        // 遍历数组，循环添加数据
        items.forEach(({ actor, item }) => actor.attemptsTo(QuestionsLineItemField_1.questionLineItem.checkCellValue(item.rowNumber, 'Item No.', item.ItemNo, expectedResult), QuestionsLineItemField_1.questionLineItem.checkCellValue(item.rowNumber, 'Question Description', item.ItemName, expectedResult))));
    }
};
const checkEmptyLineItemsTask = () => {
    return core_1.Task.where(`#actor check line items value`, assertions_1.Ensure.eventually(QuestionsLineItemField_1.questionLineItem.emtpyDataTable(), (0, web_1.isVisible)()));
};
exports.deleteQuestionLineItems = {
    using: () => core_1.Task.where(`#actor delete question line items`, SolicitationTab_1.solicitationTab.clickSolicitationTab('Questions'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(QuestionsLineItemField_1.questionLineItem.editableTableBox(), (0, web_1.isVisible)()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), (0, common_1.clickAllCheckBox)(), clickSectionButton.using('imgDelete'), 
    // 提交保存
    common_1.clickActionButton.using('Save'), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)))
};
//# sourceMappingURL=SolicitationQuestionsTab.js.map