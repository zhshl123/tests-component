"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutdentResult = exports.checkIndentResult = exports.moveRankingCriteria = exports.updateRankingCriteria = exports.replicateRankingCriteria = exports.checkRankingLineItemAlertMessage = exports.addRankingCriteriaLineItem = exports.checkRankingCriteriaInfo = exports.addRankingCriteria = exports.checkRankingTemplateInfo = exports.addRankingTemplate = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditRankingTemplateFields_1 = require("./EditRankingTemplateFields");
const RankingCriteriaLineItemFields_1 = require("./RankingCriteriaLineItemFields");
exports.addRankingTemplate = {
    using: (templateInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor add ranking template with ${templateInfo}`, EditRankingTemplateFields_1.rankingTempalte.fillTextInputField('Template Name', templateInfo.rowsHash().TemplateName + timestamp), EditRankingTemplateFields_1.rankingTempalte.setCookie(statics_1.COOKIE_RANKING_TEMPLATE_NAME, templateInfo.rowsHash().TemplateName + timestamp), EditRankingTemplateFields_1.rankingTempalte.fillTextInputField('Description', templateInfo.rowsHash().Description), EditRankingTemplateFields_1.rankingTempalte.clickSingleCheckBox('Is Default Template', templateInfo.rowsHash().IsDefaultTemplate), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkRankingTemplateInfo = {
    using: (templateInfo) => {
        return core_1.Task.where(`#actor check ranking template information with ${templateInfo}`, EditRankingTemplateFields_1.rankingTempalte.checkTextInputFieldValue('Template Name', web_1.Cookie.called(statics_1.COOKIE_RANKING_TEMPLATE_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditRankingTemplateFields_1.rankingTempalte.checkTextInputFieldValue('Description', templateInfo.rowsHash().Description, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(EditRankingTemplateFields_1.rankingTempalte.radioButtonInput('Is Default Template', templateInfo.rowsHash().IsDefaultTemplate)), (0, assertions_1.equals)('true')));
    }
};
exports.addRankingCriteria = {
    using: (criteriaInfo) => {
        const items = core_1.List.of(criteriaInfo.hashes());
        return core_1.Task.where(`#actor add ranking criteria with ${criteriaInfo}`, items.forEach(({ actor, item }) => actor.attemptsTo(core_1.Check.whether(EditRankingTemplateFields_1.rankingTempalte.criteriaTableBodyRows().nth(Number(item.row)), (0, web_1.isVisible)()).andIfSo(web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.criteriaTableBodyRows().nth(Number(item.row))), web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.iconButton(DefaultStaticParams_1.DELETE))).otherwise(web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.iconButton(DefaultStaticParams_1.ADD))), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Min Score', item.MinScore), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Max Score', item.MaxScore), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Weight', item.Weight))), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Check.whether(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)('Save failed')).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)));
    }
};
exports.checkRankingCriteriaInfo = {
    using: (criteriaInfo) => {
        const items = core_1.List.of(criteriaInfo.hashes());
        return core_1.Task.where(`#actor check ranking criteria with ${criteriaInfo}`, items.forEach(({ actor, item }) => actor.attemptsTo(EditRankingTemplateFields_1.rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria), EditRankingTemplateFields_1.rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation), EditRankingTemplateFields_1.rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Min Score', item.MinScore), EditRankingTemplateFields_1.rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Max Score', item.MaxScore), EditRankingTemplateFields_1.rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Weight', item.Weight))));
    }
};
exports.addRankingCriteriaLineItem = {
    using: (criteriaInfo) => {
        return core_1.Task.where(`#actor add ranking criteria line item with ${criteriaInfo}`, web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.criteriaTableBodyRows().nth(Number(criteriaInfo.rowsHash().row) - 1)), web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.iconButton('UpdateItem')), core_1.Wait.until(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.popupWindow(), (0, assertions_1.isPresent)()), web_1.Switch.to(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.popupWindow()).and(web_1.Click.on(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.addBelowIcon()), RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.fillTableCell(0, 0, criteriaInfo.rowsHash().Score), RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.fillTableCell(0, 1, criteriaInfo.rowsHash().ListItem), web_1.Click.on(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.OKButton())));
    }
};
exports.checkRankingLineItemAlertMessage = {
    using: (message) => {
        return core_1.Task.where(`#actor check ranking criteria line item alert message with ${message}`, (0, common_1.checkMessagePopupBox)(), assertions_1.Ensure.eventually(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)(message)), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), web_1.Switch.to(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.popupWindow()).and(web_1.Click.on(RankingCriteriaLineItemFields_1.rankingCriteriaLineItem.cancelButton())));
    }
};
exports.replicateRankingCriteria = {
    using: (rowNumber) => {
        return core_1.Task.where(`#actor replicate ranking criteria of row: ${rowNumber}`, web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.criteriaTableBodyRows().nth(Number(rowNumber) - 1)), web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.iconButton('Replicate')), common_1.clickButton.using(DefaultStaticParams_1.SAVE));
    }
};
exports.updateRankingCriteria = {
    using: (criteriaInfo) => {
        const items = core_1.List.of(criteriaInfo.hashes());
        return core_1.Task.where(`#actor update ranking criteria information with ${criteriaInfo}`, items.forEach(({ actor, item }) => actor.attemptsTo(EditRankingTemplateFields_1.rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Min Score', item.MinScore), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Max Score', item.MaxScore), EditRankingTemplateFields_1.rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Weight', item.Weight))), common_1.clickButton.using(DefaultStaticParams_1.SAVE));
    }
};
exports.moveRankingCriteria = {
    using: (rowNumber, buttonName) => {
        return core_1.Task.where(`#actor move row:${rowNumber} ranking criteria information by button ${buttonName}`, web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.criteriaTableBodyRows().nth(Number(rowNumber) - 1)), web_1.Click.on(EditRankingTemplateFields_1.rankingTempalte.iconButton(buttonName)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
exports.checkIndentResult = {
    using: (rowNumber1, rowNumber2) => {
        return core_1.Task.where(`#actor check indent result`, assertions_1.Ensure.eventually(web_1.Attribute.called('style').of(EditRankingTemplateFields_1.rankingTempalte.criteriaTableCell(Number(rowNumber1) - 1, 'Ranking Evaluation Criteria')), (0, assertions_1.includes)('padding-left: 2em')), assertions_1.Ensure.eventually(EditRankingTemplateFields_1.rankingTempalte.arrowIconRow(Number(rowNumber2) - 1, 'Ranking Evaluation Criteria'), (0, web_1.isVisible)()));
    }
};
exports.checkOutdentResult = {
    using: (rowNumber1, rowNumber2) => {
        return core_1.Task.where(`#actor check indent result`, assertions_1.Ensure.eventually(web_1.Attribute.called('style').of(EditRankingTemplateFields_1.rankingTempalte.criteriaTableCell(Number(rowNumber1) - 1, 'Ranking Evaluation Criteria')), (0, assertions_1.includes)('padding-left: 0.6em')), assertions_1.Ensure.eventually(EditRankingTemplateFields_1.rankingTempalte.arrowIconRow(Number(rowNumber2) - 1, 'Ranking Evaluation Criteria'), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
//# sourceMappingURL=RankingTemplateCurd.js.map