"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRankingCriteria = exports.ProjectRankingCriteriaFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const RankingAttributes_1 = require("./RankingAttributes");
class ProjectRankingCriteriaFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.selectScore = (score) => {
            return core_1.Task.where(`#actor select first criteria score table ${score}th score checkbox`, web_1.Click.on(this.scoreCheckbox(score)));
        };
        this.checkReadOnlyTextFieldValue = (fieldName, value) => {
            return core_1.Task.where(`#actor check read only ${fieldName} text field value with ${value}`, assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(exports.projectRankingCriteria.readOnlyTextField(fieldName)), (0, assertions_1.equals)(value)));
        };
        /**
     * 检查数字输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
        this.checkNumberInputFieldValue = (fieldName, itemName) => {
            return core_1.Task.where(`#actor check number field: ${fieldName}'s value with ${itemName}`, core_1.Check.whether(this.numberInputField(fieldName), (0, assertions_1.isPresent)()).andIfSo(assertions_1.Ensure.eventually(web_1.Attribute.called('value').of(this.numberInputField(fieldName)), (0, assertions_1.equals)(itemName))));
        };
        this.criteriaGuidanceIcon = () => web_1.PageElement.located(web_1.By.id('ctl00_body_tlvRankingProject_ctl02_imgTooltip'))
            .describedAs('first criteria guidance icon');
        this.scoreTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_tlvRankingProject_ctl02_rdlScore'))
            .describedAs('first criteria score table');
        /**
         *
         * @param score 分数值
         * @returns
         */
        this.scoreCheckbox = (score) => web_1.PageElement.located(web_1.By.cssContainingText('td label', score))
            .of(this.scoreTable())
            .describedAs(`first criteria score table ${score} score checkbox`);
        this.justificationTextInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_tlvRankingProject_ctl02_txtJustification'))
            .describedAs(`first criteria justification text input field`);
        this.readOnlyTextField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs(`read only ${fieldName} text field`);
    }
}
exports.ProjectRankingCriteriaFields = ProjectRankingCriteriaFields;
exports.projectRankingCriteria = new ProjectRankingCriteriaFields(RankingAttributes_1.rankingMap);
//# sourceMappingURL=ProjectRankingCriteriaFields.js.map