"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseRankingTempalte = exports.rankingTempalte = exports.EditRankingTemplateFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const RankingAttributes_1 = require("./RankingAttributes");
class EditRankingTemplateFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 给表单元格填值
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @param value 要填的值
         * @returns
         */
        this.fillCriteriaTextField = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor fill ranking criteria row:${rowNumber} text field ${fieldName} with ${value}`, web_1.Click.on(exports.rankingTempalte.criteriaTableCell(rowNumber, fieldName)), web_1.Enter.theValue(value).into(exports.rankingTempalte.criteriaTableTextInputField(rowNumber, fieldName)));
        };
        this.checkCriteriaFieldCell = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor check ranking criteria row:${rowNumber} text field value ${fieldName} with ${value}`, assertions_1.Ensure.eventually(web_1.Text.of(exports.rankingTempalte.criteriaTableCell(rowNumber, fieldName)), (0, assertions_1.equals)(value)));
        };
        /**
         * 给表数字格式单元格填值
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @param value 要填的值
         * @returns
         */
        this.fillCriteriaNumberField = (rowNumber, fieldName, value) => {
            return core_1.Task.where(`#actor fill ranking criteria row:${rowNumber} number field ${fieldName} with ${value}`, web_1.Click.on(exports.rankingTempalte.criteriaTableCell(rowNumber, fieldName)), web_1.Enter.theValue(value).into(exports.rankingTempalte.criteriaTableNumberInputField(rowNumber, fieldName)));
        };
        this.criteriaTable = () => web_1.PageElement.located(web_1.By.id('ctl00_body_divTreeView'))
            .describedAs('criteria table');
        this.criteriaTableBodyRows = () => web_1.PageElements.located(web_1.By.css('.cip-grid-body__rownumber'))
            .describedAs('criteria table body rows');
        /**
         * 表的行
         * @param rowNumber 行号，不含表头，第一行为0，以此类推
         * @param fieldName 字段名称
         * @returns
         */
        this.criteriaTableCell = (rowNumber, fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElements.located(web_1.By.css(`[data-field="${mappedFieldName}"]`))
                .nth(rowNumber)
                .describedAs(`criteria table row:${rowNumber} ${fieldName}`);
        };
        this.criteriaTableCellValue = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css(`span`))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} value`);
        };
        this.criteriaTableTextInputField = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css('input'))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} ${fieldName} text input field`);
        };
        this.criteriaTableNumberInputField = (rowNumber, fieldName) => {
            return web_1.PageElement.located(web_1.By.css(`[data-role="numerictextbox"]`))
                .of(this.criteriaTableCell(rowNumber, fieldName))
                .describedAs(`criteria table row:${rowNumber} ${fieldName} number input field`);
        };
        this.iconButton = (buttonName) => web_1.PageElement.located(web_1.By.css(`[data-name="img${buttonName}"]`))
            .describedAs(`criteria table icon button:${buttonName}`);
        this.arrowIconRow = (rowNumber, fieldName) => web_1.PageElement.located(web_1.By.css('.cip-arrow.cip-arrow-expand'))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`row:${rowNumber} criteria table arrow row`);
    }
}
exports.EditRankingTemplateFields = EditRankingTemplateFields;
exports.rankingTempalte = new EditRankingTemplateFields(RankingAttributes_1.rankingMap);
exports.browseRankingTempalte = new abstract_1.SearchFromFields(RankingAttributes_1.rankingMap);
//# sourceMappingURL=EditRankingTemplateFields.js.map